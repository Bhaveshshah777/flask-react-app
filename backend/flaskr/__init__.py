from flask import Flask, jsonify, request
from sqlalchemy import create_engine, text
import os 
from flask_cors import CORS  # Import CORS
from flask_bcrypt import Bcrypt

# Flask App Initialization
app = Flask(__name__)

CORS(app, methods=["GET", "POST", "PUT", "DELETE"])

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL")

# Create sqlalchemy engine
engine = create_engine(DATABASE_URL)

#create bcrypt instance
bcrypt = Bcrypt(app)

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

#Register new users
@app.route('/auth/register', methods=['POST'])
def register_users():
    data = request.json()


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
@app.route('/blog', methods=['POST'])
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
    

# Endpoint 4: Edit Blogs
@app.route('/blog/<int:id>', methods=['PUT'])
def update_blog(id):
    try:
        data = request.get_json()
        id= id
        title= data.get("title")
        content= data.get("content")
        link= data.get("link")

        if not title or not content or not link:
            return jsonify({"error": "title, content, and link are required"}), 400

        with engine.begin() as connection:
            query = text("""UPDATE blogs 
                SET title = :title, content = :content, link = :link 
                WHERE id = :id""")
            result = connection.execute(query, {"id": id, "title": title, "content": content, "link": link})
            
        return jsonify({"message": "blog updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#Delete blog endpoint
@app.route('/blog', methods=['DELETE'])
def delete_blogs():
    try:
        data = request.get_json()
        ids = data.get("ids", [])
        print(ids)
        #deleting multiple blogs
        if len(ids) > 0:
            with engine.begin() as connection:
                query = text("""DELETE FROM blogs WHERE id IN :ids""")
                result = connection.execute(query, {"ids": tuple(ids)})
                return jsonify({"message": "blogs deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)