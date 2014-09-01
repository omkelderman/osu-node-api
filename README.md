osu-node-api
============

A node-wrapper around the osu! api

The format of the returned objects can be seen in the official [osu!api documentation](https://github.com/peppy/osu-api/wiki)

## API Documentation ##

### Enum ```osuapi.Modes``` ###

> an object containing the API values for the different osu! game modes:

> Available modes: `Modes.osu`, `Modes.taiko`, `Modes.CtB`, `Modes.osumania`

> Example use:

> ```js
  var osuapi = require('osu-api');
  var taiko = osuapi.Modes.taiko;
  ```

### Class ```osuapi.Api(apiKey, [mode])``` ###

> Constructor function for the osu! api.

> If mode is not provided, it defaults to `Modes.osu`.

> Example use:

> ```js
  var osuapi = require('osu-api');
  var osu = new osuapi.Api('<api key here>');
  var osu_mania = new osuapi.Api('<api key here>', osuapi.Modes.osumania);
  ```

#### Method ```osu.setMode(mode)``` ####

> Sets the mode used by api functions like ```osu.getUser()```.

#### Method ```osu.callApi(endpoint, parameters, callback)``` ####

> Calls the specified API endpoint with parameters and calls callback with the results.

> endpoint is a string for the used API endpoint, e.g. 'get_user'

> parameters is an object containing the parameters for the API call. The API key is inserted automatically.

> Callback format: ```callback(error, output)```

> output is the parsed JSON output.

> *Note that you would normally call one of the (non-raw) methods below, this is mainly for internal usage.*

#### Method ```osu.getBeatmapsRaw(parameters, callback)``` ####

> Calls the 'get_beatmaps' API method with the specified parameters.

> Callback format: ```callback(error, output)```

> output is the parsed JSON output.

> *Note that this method is mainly for internal usage.*

#### Method ```osu.getBeatmap(id, callback)``` ####

> Gets the beatmap with the specified beatmap id.

> Callback format: ```callback(error, output)```

> output is the beatmap object or `undefined` if not found.

#### Method ```osu.getBeatmapSet(id, callback)``` ####

> Gets the beatmaps with the specified beatmap set id.

> Callback format: ```callback(error, output)```

> output is an array of beatmap objects. The array will be empty if the beatmap-set was not found,.

#### Method ```osu.getBeatmapsByUser(id, callback)``` ####

> Gets the beatmaps by the user with the specified user id (**not name!**).

> Callback format: ```callback(error, output)```

> output is an array of beatmap objects. The array will be empty if that user has no beatmaps, or if the user does not exists.

#### Method ```osu.getUserRaw(parameters, callback)``` ####

> Calls the 'get_user' API method with the specified parameters.

> Callback format: ```callback(error, output)```

> *Note that this method is mainly for internal usage.*

#### Method ```osu.getUser(id, [eventDays], callback)``` ####

> Gets the user with the specified id or name (automatic detection).

> Please note that the automatic detection uses `typeof`, so `getUser(12345, ...)` gets the user with user-**Id** `12345`, while `getUser('12345', ...)` gets the user with user-**name** `12345`!

> If eventDays is provided, the event-array will contain events between now and that many days ago, defaults to 1, max. 31.

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is the user object or `undefined` if not found.

#### Method ```osu.getScoresRaw(parameters, callback)``` ####

> Calls the 'get_scores' API method with the specified parameters.

> Callback format: ```callback(error, output)```

> *Note that this method is mainly for internal usage.*

#### Method ```osu.getScores(id, [userId], callback)``` ####

> Gets the top 50 scores for the beatmap with the specified id.

> If user is specified, gets that users top score (as an array with one element). Use `osu.getUserScore(id, userId, callback)` for a more convenient way to get a user-score.

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is an array of scores.

#### Method ```osu.getUserScore(id, userId, callback)``` ####

> Gets the top score of the user with the specified user id (**not name!**) for the beatmap with the specified id.

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is a score object or `undefined` if the user was not found, or doesn't have a score on this beatmap.

#### Method ```osu.getUserBestRaw(parameters, callback)``` ####

> Calls the 'get_user_best' API method with the specified parameters.

> Callback format: ```callback(error, output)```

> *Note that this method is mainly for internal usage.*

#### Method ```osu.getUserBest(id, callback)``` ####

> Gets the top 10 scores of the user with the specified id or name (automatic detection).

> Please read the note about the automatic detection at `osu.getUser(id, [eventDays], callback)`.

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is an array of scores.

#### Method ```osu.getUserRecentRaw(parameters, callback)``` ####

> Calls the 'get_user_recent' API method with the specified parameters.

> Callback format: ```callback(error, output)```

> *Note that this method is mainly for internal usage.*

#### Method ```osu.getUserRecent(id, callback)``` ####

> Gets the last 10 scores of the user with the specified id or name (automatic detection).

> Please read the note about the automatic detection at `osu.getUser(id, [eventDays], callback)`.

> Uses the mode set by ```osu.setMode()```.

> Callback format: ```callback(error, output)```

> output is an array of scores.

#### Method ```osu.getMatchRaw(parameters, callback)``` ####

> Calls the 'get_match' API method with the specified parameters.

> Callback format: ```callback(error, output)```

> *Note that this method is mainly for internal usage.*

#### Method ```osu.getMatch(id, callback)``` ####

> Gets the match with the specified id.

> Callback format: ```callback(error, output)```

> output is a multiplayer match object or `undefined` if not found.
