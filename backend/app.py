from flask import Flask, jsonify
from sqlalchemy import create_engine, text

# Flask App Initialization
app = Flask(__name__)

# Database configuration
DATABASE_URL = "postgresql://postgres:123@localhost:5432/wordpress"

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
    