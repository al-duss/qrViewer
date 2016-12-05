from PIL import Image
import cv2
import datetime
import hashlib
import json
import numpy as np
import os
import qrtools
import sys
import time
import urllib2

alarm = 0


def take_screenshot(counter, frame, minute, salt):
    file_name = str(counter) + "qr.jpg"
    cv2.imwrite(file_name, frame)
    decode_qr(file_name, minute, salt)
    os.remove(file_name)

def getDB():
    req = urllib2.Request("http://127.0.0.1:5000/")
    opener = urllib2.build_opener()
    f = opener.open(req)
    data = json.loads(f.read())
    with open('db.json', 'w') as outfile:
        json.dump(data,outfile)

def decode_qr(path, minute, salt):
    global alarm
    qr = qrtools.QR()
    qr.decode(path)
    print qr.data

    with open('db.json', 'r') as db:
        db = json.load(db)
    time = str(minute)
    text = db.get(time, "")
    hashed = hashText(text, salt)
    if (hashed == qr.data):
        alarm = 0
        print "VALID"
    else:
        alarm += 1
        print alarm
        if (alarm > 2):
            alarm = 0
            showAlert()
        print "INVALID"

def hashText(text, salt):
    with open('salt.json', 'r') as db:
        db = json.load(db)
        word = db.get(salt ,"")
        return hashlib.sha512(text+word).hexdigest()

def showAlert():
    alert = Image.open("alert.jpg")
    alert.show()

def main():
    d = datetime.datetime(2016, 12, 2, 00,00)
    getDB()
    newDB = datetime.datetime.now().replace(minute=0, second=0, microsecond=0)
    cap = cv2.VideoCapture(0)
    current_minute = 0

    while(True):
        # Capture frame-by-frame
        ret, frame = cap.read()
        now = datetime.datetime.now()
        # Our operations on the frame come here
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Display the resulting frame
        cv2.imshow('frame',gray)

        if(int((now - newDB).total_seconds()/60) > 59 ):
            getDB()
            newDB = now.replace(minute=0, second=0, microsecond=0)

        if current_minute != now.second and now.second % 10 == 0:
            salt = int((now-d).total_seconds()/60)%2657
            current_minute = now.second
            img_prefix = int(time.time() * 1000)
            take_screenshot(img_prefix, frame, now.minute, salt)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            print "Exiting..."
            break


    # When everything done, release the capture
    cap.release()
    cv2.destroyAllWindows()
    sys.exit(0)

if __name__ == "__main__":
    main()