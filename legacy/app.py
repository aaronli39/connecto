from flask import Flask, render_template, request
import requests
import json
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
app = Flask(__name__, static_folder='build', static_url_path='/')
CORS(app)


@app.route('/api', methods=['POST'])
@cross_origin()
def get_events():
    post_data = request.get_json()
    search_input = post_data.get('search_input').replace(" ", "+")
    #api End-Point:
    URL="https://serpapi.com/search.json?engine=google_events&q=" + search_input + "&hl=en&gl=us&api_key=5e968b2fd6cd27efee6d82224af6f45c571111b2e3850b07d2e042e84e780059"
    r = requests.get(url = URL)
    data = r.json()
    return data
    
@app.route('/')
@cross_origin()
def serve():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run()
