import datetime
import json
import generateHash.newData
from flask import Flask
app = Flask(__name__)
lastTime

@app.route('/')
def sendJSON():
    global lastTime
    t = datetime.datetime.now()
    if ((lastTime is undefined) or (int((t - lastTime).total_seconds()/60)) > 59):
        lastTime = t.replace(minute=0,second=0, microsecond=0) 
        newData()
    with open('data.json') as data_file:
        data = json.load(data_file)
    return flask.jsonify(**data)

if __name__ == '__main__':
    app.run()