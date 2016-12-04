import numpy as np
import cv2
import threading
import sys
import datetime
import qrdecode.qrdecode

def take_screenshot(counter, frame, minute):
    file_name = str(counter) + "qr.jpg"
    cv2.imwrite(file_name, frame)
    qrdecode.qrdecode.decode_qr(file_name, minute)

cap = cv2.VideoCapture(0)
current_minute = 0
i = 0
while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()
    now = datetime.datetime.now()
    # Our operations on the frame come here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Display the resulting frame
    cv2.imshow('frame',gray)

    if current_minute != now.minute:
        current_minute = now.minute
        take_screenshot(i, frame, now.minute)

    i += 1
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print "Exiting..."
        break


# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
sys.exit(0)
