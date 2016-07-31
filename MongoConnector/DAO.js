var mongo = require('mongodb').MongoClient
var db_Config = require('./Conf')

function find(col,filter,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.find(filter).toArray(function(err, docs) {
      if (err) throw err
      db.close()
      callback(docs)})
})
}


function find_sort_limit(col,filter,sortOP,limitOP,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.find(filter).sort(sortOP).limit(limitOP).toArray(function(err, docs) {
      if (err) throw err
      db.close()
      callback(docs)})
})
}

function insert(col,query,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.insert(query,function(err) {
      if (err) throw err
      db.close()
    })
})
}

function save(col,query,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.save(query,function(err) {
      if (err) throw err
      db.close()
    })
})
}

function update(col,filter,query,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var dbCol = db.collection(col)
    dbCol.update(filter,query,function(err) {
      if (err) throw err
      db.close()}
    )
})
}


exports.find = find;
exports.insert = insert;
exports.update = update;
exports.save = save;
exports.find_sort_limit = find_sort_limit;
