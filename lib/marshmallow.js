var Campfire = require('../vendor/campfire/lib/campfire').Campfire;

var marshmallow = function(config, definition) {
  var messages = {};

  definition({
    on: function(re, callback) {
      messages[re] = callback;
    }
  })

  Campfire.initialize(config);
  var room = Campfire.Room(config.room_id);

  room.join(function() {
    room.listen(function(message) {
      if (message.type != "TextMessage")
        return;

      var match;
      for (re in messages) {
        if (match = message.body.match(re)) {
          match.shift();
          messages[re].apply(room, match);
        }
      }
    })
  });
}

exports.marshmallow = marshmallow;
