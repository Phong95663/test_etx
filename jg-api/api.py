from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/grammar'

mongo = PyMongo(app)

@app.route('/grammars', methods=['GET'])
def get_all_grammars():
    grammars = mongo.db.grammars.find()
    return dumps({'result' : grammars}, ensure_ascii=False).encode('utf-8')

@app.route('/api/v1/grammar_check', methods=['POST'])
def grammar_check():
    data = request.data.decode('utf-8')
    print(data)
    print(type(data))
    #keys = mongo.db.grammars.find({}, {'title' : 1})
    #for key in keys:
     #   print(key['title'])
      #  if key['title'] in data:
       #     result = key
        #    break

    return dumps({'result': {"_id": {"$oid": "5c8e213952c5e87ab05d1f36"}, "title": "どこか"}}, ensure_ascii=False).encode('utf-8')

    #return dumps({'err' : "Not found!!!!"})

@app.route('/api/v1/get_grammars', methods=['GET'])
def get_grammars():
    query = request.args['input']
    print(query)
    print(type(query))
    response = mongo.db.grammars.find({'title': query})
    print(response)
    print(type(response))
    return dumps(response, ensure_ascii=False).encode('utf-8')
