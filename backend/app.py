from flask import Flask
import requests
import json
from flask_cors import CORS
app = Flask(__name__, static_url_path="", static_folder="client/build")
CORS(app)
@app.route("/events")
def events():
    #api End-Point:
    URL="https://serpapi.com/search.json?engine=google_events&q=Events+in+Austin&hl=en&gl=us&api_key=5e968b2fd6cd27efee6d82224af6f45c571111b2e3850b07d2e042e84e780059"
    r = requests.get(url = URL)
    data = r.json()
    return data