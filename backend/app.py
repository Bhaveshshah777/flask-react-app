import time
from flask import Flask

app = Flask(__name__)


@app.route('/time')
def getCurrentTimme():
    return { 'time' : time.time() }