osu-node-api
============

A node-wrapper around the osu! api

The format of the returned objects can be seen in the official [osu!api documentation](https://github.com/peppy/osu-api/wiki)

## API Documentation ##

### Enum ```osuapi.Modes``` ###

> an object containing the API values for the different osu! game modes:

> Available modes: osu, taiko, CtB, osumania

> Example use:

> ```js
  var osuapi = require('osu-api');
  var taiko = osuapi.Modes.taiko;
  ```

### Class ```osuapi.Api(apiKey)``` ###

> Constructor function for the osu! api.

> Example use:

> ```js
  var osuapi = require('osu-api');
  var osu = new osuapi.Api('<api key here>');
  ```

#### Method ```osu.setMode(mode)``` ####

> Sets the mode used by api functions like ```osu.getUser()```.

#### Method ```osu.callApi(endpoint, parameters, callback)``` ####

> Calls the specified API endpoint with parameters and calls callback with the results.

> endpoint is a string for the used API endpoint, e.g. 'get_user'

> parameters is an object containing the parameters for the API call. The API key is inserted automatically.

> Callback format: ```callback(error, output)```

> output is the parsed JSON output.

#### Method ```osu.getBeatmapsRaw(parameters, callback)``` ####

> Calls the 'get_beatmaps' API method with the specified parameters.

> Callback format: ```callback(error, output)```

> output is the parsed JSON output.

#### Method ```osu.getBeatmap(id, callback)``` ####

> Gets the beatmap with the specified beatmap id.

> Callback format: ```callback(error, output)```

> output is the beatmap object.

#### Method ```osu.getBeatmapSet(id, callback)``` ####

> Gets the beatmaps with the specified beatmap set id.

> Callback format: ```callback(error, output)```

> output is an array of beatmap objects.

#### Method ```osu.getBeatmapsByUser(id, callback)``` ####

> Gets the beatmaps by the user with the specified user id.

> Callback format: ```callback(error, output)```

> output is an array of beatmap objects.

#### Method ```osu.getUserRaw(parameters, callback)``` ####

> Calls the 'get_user' API method with the specified parameters.

> Callback format: ```callback(error, output)```

#### Method ```osu.getUser(id, callback)``` ####

> Gets the user with the specified id or name (automatic detection).

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is the user object.

#### Method ```osu.getScoresRaw(parameters, callback)``` ####

> Calls the 'get_scores' API method with the specified parameters.

> Callback format: ```callback(error, output)```

#### Method ```osu.getScores(id, [userId], callback)``` ####

> Gets the top 50 scores for the beatmap with the specified id.

> If user is specified, gets that users top score (as an array with one element).

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is an array of scores.

#### Method ```osu.getUserScore(id, userId, callback)``` ####

> Gets the top score of the user with the specified user id for the beatmap with the specified id.

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is a score object.

#### Method ```osu.getUserBestRaw(parameters, callback)``` ####

> Calls the 'get_user_best' API method with the specified parameters.

> Callback format: ```callback(error, output)```

#### Method ```osu.getUserBest(id, callback)``` ####

> Gets the top 10 scores of the user with the specified id or name (automatic detection).

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is an array of scores.

#### Method ```osu.getUserRecentRaw(parameters, callback)``` ####

> Calls the 'get_user_recent' API method with the specified parameters.

> Callback format: ```callback(error, output)```

#### Method ```osu.getUserRecent(id, callback)``` ####

> Gets the last 10 scores of the user with the specified id or name (automatic detection).

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is an array of scores.

#### Method ```osu.getMatchRaw(parameters, callback)``` ####

> Calls the 'get_match' API method with the specified parameters.

> Callback format: ```callback(error, output)```

#### Method ```osu.getMatch(id, callback)``` ####

> Gets the match with the specified id.

> Callback format: ```callback(error, output)```

> output is a multiplayer match object.