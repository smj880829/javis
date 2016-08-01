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
    db.find('userData',{'id':data.id},function(re){
      if(re.isempty){
        db.insert('userData',data,function(){
          console.log("insert userData");
        })
      }
      else{
        data._id = re._id;
        db.save('userData',data,function(){
          console.log("save userData");
        })
      }
    })
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
