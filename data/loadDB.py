
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

collection_name = client["coursesFall23"]

professors = ["Matthew Hibbs", "Seth Fogarty", "Britton Horn", "Mark Lewis", "Sheng Tan", "Yu Zhang"]
pathways = ["DL" , "CE", "OVC", "WC" ,"HU" ," UD" ,"GA" , "HP"]
days = ["M W F" , "Tu Th", "M W"]
allTimes = [str(num) for num in range(8,14)]


with open("cleanPrerequisites.csv") as f:
    courses = [row.split(',')[0] for row in f]
    courseNumber = 5
    course22 = " ".join(random.sample(courses , courseNumber))
    people_collection = client["logs"]
    logs = {
       "title": "So and So did this to So & So" ,
        "user" : "John Doe",
        "timeStamp": "MM-dd-yyyy HH:mm:ss"  
    }
    people_collection.insert_one(logs)

# with open("cleanPrerequisites.csv") as f:
#     courses = [row.split(',')[0] for row in f]
#     courseNumber = 5
#     course22 = " ".join(random.sample(courses , courseNumber))
#     people_collection = client["usersFall23"]
#     newStudent = {
#         "firstname": "John",
#         "lastname": "Doe",
#         "username": "student",
#         "password": "123",
#         "userType": "s",
#         "id": "00001",
#         "courses": course22,
#         "year": 2,
#         "email": "jdoe@trinity.edu",
#         "gpa": 3.67    
#     }
#     people_collection.insert_one(newStudent)
#     newProf = {
#         "firstname": "Britton",
#         "lastname": "Horn",
#         "username": "professor",
#         "id": "00001",
#         "password": "123",
#         "email": "bhorn@trinity.edu",
#         "userType": "p",
#         "courses": course22 
#     }
#     people_collection.insert_one(newProf)
#     newAdmin = {
#     "firstname": "Priscilla",
#     "lastname": "Riojas",
#     "email": "priojas@trinity.edu",
#     "id": "00001",
#     "username": "admin",
#     "password": "123",
#     "userType": "a",
# }
# people_collection.insert_one(newAdmin)



# with open("cleanPrerequisites.csv") as f:
#     courses = [row.split(',')[0] for row in f]
#     courseNumber = 5
#     course22 = " ".join(random.sample(courses , courseNumber))
#     people_collection = client["usersSpring22"]
#     newStudent = {
#         "firstname": "John",
#         "lastname": "Doe",
#         "username": "student",
#         "password": "123",
#         "userType": "s",
#         "id": "00001",
#         "courses": course22,
#         "year": 2,
#         "email": "jdoe@trinity.edu",
#         "gpa": 3.67    
#     }
#     people_collection.insert_one(newStudent)
#     newProf = {
#         "firstname": "Britton",
#         "lastname": "Horn",
#         "username": "professor",
#         "id": "00001",
#         "password": "123",
#         "email": "bhorn@trinity.edu",
#         "userType": "p",
#         "courses": course22 
#     }
#     people_collection.insert_one(newProf)












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
#             "pathways": pathways[random.randint(0,len(pathways)-1)],
#             "courseDiscription" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus eget. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Sollicitudin ac orci phasellus egestas tellus." ,
#             "time" : allTimes[random.randint(0,len(allTimes)-1)],
#             "days" : days[random.randint(0,len(days)-1)]             
#         })
    
#     collection_name.insert_many(batch_load)


# people_collection = client["users"]


# student = {
#     "firstname": "John",
#     "lastname": "Doe",
#     "username": "student",
#     "password": "123",
#     "userType": "s",
#     "id": "00001",
#     "courses": "CSCI:1301 ",
#     "year": 2,
#     "email": "jdoe@trinity.edu",
#     "gpa": 3.67
# }
# professor = {
#     "firstname": "Britton",
#     "lastname": "Horn",
#     "username": "professor",
#     "id": "00001",
#     "password": "123",
#     "email": "bhorn@trinity.edu",
#     "userType": "p",
#     "courses": "CSCI:1301 "
# }
# admin = {
#     "firstname": "Priscilla",
#     "lastname": "Riojas",
#     "email": "priojas@trinity.edu",
#     "id": "00001",
#     "username": "admin",
#     "password": "123",
#     "userType": "a",
# }

# people_collection.insert_one(student)
# people_collection.insert_one(professor)
# people_collection.insert_one(admin)

