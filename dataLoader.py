
import json
import requests
URL = "http://localhost:8080/book/create"
FILE_NAME = './dataTest3.json'
def main():
    file = open(FILE_NAME)
    data = json.load(file)

    for book in data["objects"]:
        b = {"author": book["Author"],
             "title":book["Title"] ,
             "description": book["Description"],
             "subject":book["Subject"],
             "year":book["PublicationYear"]}
        
        response = requests.post(URL, b)
if __name__ == '__main__':
    main()