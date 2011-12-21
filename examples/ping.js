var marshmallow = require("../lib/marshmallow").marshmallow;

var config = {
  token:   process.env["CAMPFIRE_TOKEN"],
  account: process.env["CAMPFIRE_ACCOUNT"],
  ssl:     process.env["CAMPFIRE_SSL"] == "true",
  room_id: process.env["CAMPFIRE_ROOM"]
};

marshmallow(config, function(bot) {
  // Basic ping function
  bot.on("^!ping", function(ping) {
    this.speak("pong!");
  });
});