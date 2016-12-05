from random import choice
from string import ascii_letters
import json
import os

def generateHash():
    return (''.join(choice(ascii_letters)for i in range(12)))

def newData():
    data = {}
    for i in range(60):
    data[i] = generateHash()

	with open('data.json', 'w') as outfile:
		json.dump(data,outfile)