var Campfire = require('../vendor/campfire/lib/campfire').Campfire;

var marshmallow = function(config, definition) {
  var messages = {};
  var botAccountCache;
  definition({
    on: function(re, callback) {
      messages[re] = callback;
    },
    tricks: function() {
      return messages;
    }
  })
  
  var campfireInstance = new Campfire(config);
  
  campfireInstance.room(config.room_id, function(room) {
    room.join(function() {
      room.listen(function(message) {
        if (message.type != "TextMessage"){
          return;
        }
        
        var match;
        for (re in messages) {
          if (re == 'catchAll') { 
            continue; 
          } else if (match = message.body.match(re)) {
            match.shift();
            messages[re].call(room, match);
            return;
          }
        }
        if (messages['catchAll']) {
          messages['catchAll'].call(room, message);
        }
      })
    });
  });
  
}

exports.marshmallow = marshmallow;
