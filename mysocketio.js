var io =  require('socket.io')();
var db = require('./MongoConnector/DAO')
var conf = require('./MongoConnector/Conf')

module.exports = function(options) {
  io.attach(options,{origins:conf.ip +':* http://' + conf.ip +':*'});
  //io.attach(options);
};

io.on('connection', function (socket) {
    console.log('socket connect');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('login', function(data){
    console.log('login');
    console.log(data.name);
    console.log(data.id);
    console.log(data.email);
    console.log(data.accessToken);
  });

  socket.on('insert_chatlog', function(data){
    data.insert_time = new Date()
    db.insert('chat_logs',data,function(re){
    })

    socket.broadcast.emit('new_chat_log', data);
  })

  socket.on('init_chat_log', function(data){
    db.find_sort_limit('chat_logs',{},{'insert_time':-1},15,function(re){
      socket.emit('chat_logs', re);
    })
  });

  socket.on('find_chatlog', function(data){
    db.find_sort_limit('chat_logs',{},{'insert_time':-1},15,function(re){
      socket.emit('chat_logs', re);
    })
  })

})
