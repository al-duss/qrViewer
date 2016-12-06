# SOEN 321 Programming Assignment
#
#### Team
Alex Dussault (26671985)
Avinanda Chattapaday (26645593)
Jonathan Hamel (26627900)
Justin Yip (27032870)
Rakavy Ravisingam (26998569)

#### Server Dependencies
- opencv (cv2) for computer vision  
- pyqrtools for qr code reading and identification  
- urllibe2 for server poking  
- Crypto to hash the strings

#### App Dependencies
- react-native for the mobile application
- react-native-timer-mixin for the qr code timeout
- react-native-qrcode to generate the qr codes
- react-native-crypto to hash the strings

#### How the application works
`python screencapture.py` to start the desktop application
`react-native run-android` to start the mobile application

This application requires a camera. The application uses the camera to read a qr code from the mobile application. Once the qr code is identified, it matches the qr code string with a string from the database gathered from the server app. The mobile application also retrieves the strings from the server app.
A different string is matched every minute to ensure freshness of the feed. Each string is hashed using sha256 with a salt generated previously and stored statically within the app. When the limit of failed matches is reached, an error alert is displayed by the desktop application.

