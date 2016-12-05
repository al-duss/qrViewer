import datetime
import json
import generateHash
from flask import Flask, jsonify
app = Flask(__name__)

text_file = open('date.txt', 'r')
da = text_file.read().split('-')
lastTime = datetime.datetime(int(da[0]),int(da[1]),int(da[2]),int(da[3]),int(da[4]))

@app.route('/')
def sendJSON():
    global lastTime
    t = datetime.datetime.now()
    if ((int((t - lastTime).total_seconds()/60)) > 59):
        lastTime = t.replace(minute=0, second=0, microsecond=0) 
        generateHash.newData()
        with open('date.txt', 'w') as outf:
            outf.write(lastTime.strftime('%Y-%m-%d-%H-%M'))
    with open('data.json', 'r') as data_file:
        data = json.load(data_file)
        return jsonify(**data)

if __name__ == '__main__':
    app.run()

def getDateTimeFromString(s):
    return dateutil.parser.parse(s)
