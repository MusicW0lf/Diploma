
from pymongo import MongoClient

def get_mongo_client():
    client = MongoClient("mongodb+srv://thehourofcode123:GYS0MmOeF4G4HDNw@cluster0.1mmhg.mongodb.net/")
    return client

def mongo_example_view():
    client = get_mongo_client()
    db = client.sample_mflix
    collection = db.theaters
    data = collection.find_one({})

    print(data)

mongo_example_view()