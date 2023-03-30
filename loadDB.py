
from dotenv import dotenv_values
from pymongo import MongoClient
import csv
from enum import IntEnum

class Fields(IntEnum):
    COURSE = 0
    TITLE = 1
    CREDITS = 2
    PREREQS = 3


config = dotenv_values(".env")

client = MongoClient(config["MONGODB_URI"])

client = client['test']

# collection_name = client["courses"]

# with open('cleanPrerequisites.csv', 'r') as csvfile:
#     next(csvfile)
#     spamreader = csv.reader(csvfile, quotechar='"')
#     batch_load = []
#     for row in spamreader:
#         batch_load.append({
#             "course_name": row[Fields.COURSE],
#             "prereqs": str(row[Fields.PREREQS].split(" "))
#         })
    
#     collection_name.insert_many(batch_load)


people_collection = client["people"]

student = {
    "username": "student",
    "password": "123",
    "group": "s",
    "courses": "[CSCI:1301]"
}
professor = {
    "username": "professor",
    "password": "123",
    "group": "p",
    "courses": "[CSCI:1301]"
}
admin = {
    "username": "admin",
    "password": "123",
    "group": "a",
}

people_collection.insert_one(student)
people_collection.insert_one(professor)
people_collection.insert_one(admin)

