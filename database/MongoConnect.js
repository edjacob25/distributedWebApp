/**
 * Created by Diego on 4/02/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:5203/project';

var database = {
    findUsers : function (db, callback) {
        var cursor = db.collection('users').find();
        var result = [];
        cursor.each(function (err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                result.push(doc.user);
            } else {
                callback(result);
            }
        });
    },

    insertData : function (db, data, callback){
        var res = db.collection('users').insert(data);
        callback(res);
    },

    deleteData: function(db, id, callback){
        db.collection('users').remove( { user : id } );
        callback();
    }
};


var databaseWrapper = {
    getData : function (){
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            database.findUsers(db, function (res) {
                for (var i = 0; i < res.length; i++){
                    console.log(res[i]);
                }
                db.close();
            });
        });
    },

    insert: function(object){
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            database.insertData(db, object, function (res) {
                db.close();
                if (res != null){
                    console.log('Insercion exitosa');
                }
            });
        });
    },

    delete: function(id){
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            database.deleteData(db, id, function () {
                console.log('Borrado exitoso');
                db.close();
            });
        });
    }
};

/*databaseWrapper.insert({user: 'Oscar', email: 'b@yopmail.com'});
databaseWrapper.getData();
databaseWrapper.delete('Oscar');
databaseWrapper.getData();*/

module.exports = databaseWrapper;