var marshmallow = require("../lib/marshmallow").marshmallow;

var GitHub = [
  "http://github.com",
  process.env["GITHUB_ACCOUNT"],
  process.env["GITHUB_REPO"]
].join("/");

var config = {
  token:   process.env["CAMPFIRE_TOKEN"],
  account: process.env["CAMPFIRE_ACCOUNT"],
  ssl:     process.env["CAMPFIRE_SSL"] == "true",
  room_id: process.env["CAMPFIRE_ROOM"]
};

marshmallow(config, function(bot) {
  bot.on("!review (.*)", function(branch) {
    this.speak([GitHub, "compare", branch].join("/"));
  });
});
