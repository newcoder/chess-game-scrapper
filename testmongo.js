var mongodb = require('mongodb');
var server = new mongodb.Server("127.0.0.1", 27017, {});
new mongodb.Db('test', server, {}).open(function (error, client) {
  if (error) {
    throw error;
  }
  // test remove records
  var collection = new mongodb.Collection(client, 'game');
  collection.remove({'num': 34}, {safe: true}, function (err, count) {
    console.log(count + ' records removed.');
  });
  // test update records
  collection.update({'num': 35}, {$set: {flag: 'error'}}, {safe: true},
    function (err) {
      if (err) {
        console.warn(err.message);
      } else {
        console.log('successfully updated');
      }
    });
  // test find and modify
  collection.findAndModify({'num': 36}, [['num', 'asc']], {$set: {hi: 'there'}}, {},
    function (err, doc) {
      if (err) {
        console.warn(err.message);
      } else {
        console.dir(doc);  // undefined if no matching object exists.
      }
    });
  // test query records
  collection.find({'num': {$gte: 10, $lte: 100}}, {'url': 0, 'moves': 0}, {limit: 10, skip: 20, sort: 'num'}).toArray(function (err, docs) {
    console.dir(docs);
  });
});
