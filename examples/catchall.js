var marshmallow = require("../lib/marshmallow").marshmallow;

var config = {
  token:   process.env["CAMPFIRE_TOKEN"],
  account: process.env["CAMPFIRE_ACCOUNT"],
  ssl:     process.env["CAMPFIRE_SSL"] == "true",
  room_id: process.env["CAMPFIRE_ROOM"]
};

marshmallow(config, function(bot) {
  // Reverse everything everyone says
  bot.on('catchAll', function(rawMessage) {
    this.speak(rawMessage.body.split(" ").reverse.join(" "));
  });
});