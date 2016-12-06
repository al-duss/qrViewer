# Desktop Application

`python screencapture.py` to start

Need a camera. Matches a qr code read from the camera with a string from a database gatherered from the server app. 
Will match to a different string every minute. Each string is hashed using sha256 and with a salt generated previously
and stored statically withihn the app.

**Dependencies:
opencv (cv2) for computer vision
pyqrtools for qr code reading and identification.
urllibe2 for server poking
Crypto to hash the strings**
