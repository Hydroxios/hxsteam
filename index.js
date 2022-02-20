const steamAPI = require("steamapi");
const steam = new steamAPI("E988B282220A50E6277C34AF7179A79A");
const fs = require('fs');

const id = "76561199004108787";

steam.getUserOwnedGames(id).then((games) => {
    games.forEach(g =>{
        steam.getGameDetails(g.appID).then(d => {
                fs.writeFile(__dirname + "/games/" + g.name.replace(/[^a-zA-Z0-9 ]/g, "") + ".json", JSON.stringify(d), 'utf8', function (err) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                    console.log(g.appID + " file has been saved.");
                });
        }, r => {
            console.log("Game: " + g.appID + " not found !")
        })
    })
});
