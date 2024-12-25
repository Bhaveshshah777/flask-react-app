from flask import Flask, jsonify, request
from sqlalchemy import create_engine, text
import os 
from flask_cors import CORS  # Import CORS

# Flask App Initialization
app = Flask(__name__)

CORS(app, methods=["GET", "POST", "PUT"])

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL")

# Create sqlalchemy engine
engine = create_engine(DATABASE_URL)

@app.route('/', methods=['GET'])
def home():
    return "Hello World!"

# Endpoint 1: Select only id, title
@app.route('/blog', methods=['GET'])
def get_basic_blogs():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT id, title FROM blogs"))
            blogs = [{"id": row[0], "title": row[1]} for row in result]
            return jsonify(blogs), 200
    except Exception as e: 
        return jsonify({"error": str(e)}), 500


# Endpoint 2: Select all columns including content
@app.route('/blog/<int:id>', methods=['GET'])
def get_blog(id):
    try:
        with engine.connect() as connection:
            # Use parameterized query
            query = text("SELECT id, title, content, link FROM blogs WHERE id = :id")
            result = connection.execute(query, {"id": id}).fetchone()
            
            if result:
                blogs = {
                    "id": result[0],
                    "title": result[1],
                    "content": result[2],
                    "link": result[3],
                }
                return jsonify(blogs), 200
            else:
                return jsonify({"error": "Blog not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Endpoint 3: Create New Blogs
@app.route('/blogs/create', methods=['POST'])
def create_blog():
    try:
        data = request.get_json()
        title= data.get("title")
        content= data.get("content")
        link= data.get("link")

        if not title or not content or not link:
            return jsonify({"error": "title, content, and link are required"}), 400

        with engine.begin() as connection:
            query = text("INSERT INTO blogs (title, content,link) VALUES (:title, :content, :link)")
            connection.execute(query, {"title": title, "content": content, "link": link})
            connection.commit()
            
        return jsonify({"message": "blog created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

# Endpoint 3: Edit Blogs
@app.route('/blogs/update/<int:id>', methods=['PUT'])
def update_blog(id):
    try:
        data = request.get_json()

        title= data.get("title")
        content= data.get("content")
        link= data.get("link")

        if not title or not content or not link:
            return jsonify({"error": "title, content, and link are required"}), 400

        with engine.begin() as connection:
            query = text("""UPDATE blogs 
                SET title = :title, content = :content, link = :link 
                WHERE id = :id""")
            result = connection.execute(query, {"title": title, "content": content, "link": link})
            connection.commit()
            
        return jsonify({"message": "blog created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)