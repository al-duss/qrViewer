import datetime
import json
import generateHash
from flask import Flask, jsonify
app = Flask(__name__)

lastTime = datetime.datetime(2000,1,1,00,00)

@app.route('/')
def sendJSON():
    global lastTime
    t = datetime.datetime.now()
    if ((int((t - lastTime).total_seconds()/60)) > 59):
        lastTime = t.replace(minute=0, second=0, microsecond=0) 
        generateHash.newData()
    with open('data.json') as data_file:
        data = json.load(data_file)
    return jsonify(**data)

if __name__ == '__main__':
    app.run()

def getDateTimeFromString(s):
    return dateutil.parser.parse(s)
