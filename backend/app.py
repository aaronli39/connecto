from flask import Flask
import requests
import json
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
app = Flask(__name__, static_url_path="", static_folder="connecto/build")
CORS(app)

@app.route('/api', methods=['GET'])
@cross_origin()
def events():
    #api End-Point:
    URL="https://serpapi.com/search.json?engine=google_events&q=Events+in+Boston&hl=en&gl=us&api_key=5e968b2fd6cd27efee6d82224af6f45c571111b2e3850b07d2e042e84e780059"
    r = requests.get(url = URL)
    data = r.json()
    return data

@app.route('/')
@cross_origin()
def serve():
    send_from_directory(app.static_folder, "index.html")
    
if __name__ == '__main__':
    app.run()
