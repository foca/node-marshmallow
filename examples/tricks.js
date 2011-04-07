var marshmallow = require("../lib/marshmallow").marshmallow;

var config = {
  token:   process.env["CAMPFIRE_TOKEN"],
  account: process.env["CAMPFIRE_ACCOUNT"],
  ssl:     process.env["CAMPFIRE_SSL"] == "true",
  room_id: process.env["CAMPFIRE_ROOM"]
};

marshmallow(config, function(bot) {
  // Spit out what tricks this doggy knows
  bot.on("^!tricks", function(command) {
    var tricks = [];
    for(trick in bot.tricks()) {
      if (trick != 'catchAll') { tricks.push(trick.replace(/\^/, '')); }
    }
    this.speak("I know the following tricks: " + tricks.join(', '));
  });
});
