
from dotenv import dotenv_values
from pymongo import MongoClient
import csv
from enum import IntEnum
import random

class Fields(IntEnum):
    COURSE = 0
    TITLE = 1
    CREDITS = 2
    PREREQS = 3


config = dotenv_values("../.env")

client = MongoClient(config["MONGODB_URI"])

client = client['test']

# collection_name = client["courses"]

# professors = ["Matthew Hibbs", "Seth Fogarty", "Britton Horn", "Mark Lewis", "Sheng Tan", "Yu Zhang"]

# with open('cleanPrerequisites.csv', 'r') as csvfile:
#     next(csvfile)
#     spamreader = csv.reader(csvfile, quotechar='"')
#     batch_load = []
#     for row in spamreader:
#         batch_load.append({
#             "courseNumber": row[Fields.COURSE],
#             "title": row[Fields.TITLE],
#             "prereqs": " ".join(row[Fields.PREREQS].split(" ")),
#             "professor": professors[random.randint(0,len(professors)-1)],
#             "creditHours": random.randint(1,4),
#             "enrolled": random.randint(5,21),
#             "capacity": random.randint(25,30),
#         })
    
#     collection_name.insert_many(batch_load)


people_collection = client["users"]

student = {
    "firstname": "John",
    "lastname": "Doe",
    "username": "student",
    "password": "123",
    "userType": "s",
    "id": "00001",
    "courses": "CSCI:1301 ",
    "year": 2,
    "email": "jdoe@trinity.edu",
    "gpa": 3.67
}
professor = {
    "firstname": "Britton",
    "lastname": "Horn",
    "username": "professor",
    "id": "00001",
    "password": "123",
    "email": "bhorn@trinity.edu",
    "userType": "p",
    "courses": "CSCI:1301 "
}
admin = {
    "firstname": "Priscilla",
    "lastname": "Riojas",
    "email": "priojas@trinity.edu",
    "id": "00001",
    "username": "admin",
    "password": "123",
    "userType": "a",
}

people_collection.insert_one(student)
people_collection.insert_one(professor)
people_collection.insert_one(admin)

