import qrtools
import os
import json

def decode_qr(path, minute):
    dirName = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(dirName, "db.json")

    qr = qrtools.QR()
    qr.decode(path)
    print qr.data

    with open(db_path, 'r') as db:
        db = json.load(db)
        text = db.get("0", "")
        if text == qr.data:
            print "VALID"
        else:
            print "INVALID"
