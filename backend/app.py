from flask import Flask, jsonify
from sqlalchemy import create_engine, text

# Flask App Initialization
app = Flask(__name__)

# Database configuration
DATABASE_URL = "postgresql://postgres:123456@localhost:5432/wordpress"

# Create sqlalchemy engine
engine = create_engine(DATABASE_URL)


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
@app.route('/blogsall', methods=['GET'])
def get_full_blogs():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT * FROM blogs"))
            blogs = [
                {
                    "id": row[0],
                    "title": row[1],
                    "content": row[2],
                    "link": row[3],
                }
                for row in result
            ]
            return jsonify(blogs), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)