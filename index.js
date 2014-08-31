var request = require('request');

exports.Api = OsuApi;

var Modes = {
    osu: 0,
    taiko: 1,
    CtB: 2,
    osumania: 3
};

exports.Modes = Modes;

function buildOnlyFirstCallback(originalCallback) {
    return (function (err, obj){
        if(err) {
            originalCallback(err, null);
        } else {
            originalCallback(null, obj[0]);
        }
    });
}

function OsuApi(apiKey) {
    this.apiKey = apiKey;
    this.mode = Modes.osu;
}

OsuApi.prototype.setMode = (function(mode) {
   this.mode = mode; 
});

OsuApi.prototype.callApi = (function(endpoint, params, callback) {
    params.k = this.apiKey;
    request.get({
        url: 'https://osu.ppy.sh/api/'+endpoint,
        qs: params,
        followRedirect: false
    }, function(error, response, body) {
        if(error) {
            callback(error, null);
        } else {
            var err = null;
            var obj = null;
            if(response.statusCode == 200) {
                try {
                    obj = JSON.parse(body);
                } catch(e) {
                    if(body == 'Please provide a valid API key.') {
                        err = new Error("Invalid API key");
                    } else {
                        err = new Error("Could not parse json");
                    }
                }
            } else {
                err = new Error("Bad http-response");
            }
            callback(err, obj);
        }
    });
});

OsuApi.prototype.getBeatmapsRaw = (function(obj, callback) {
    this.callApi('get_beatmaps', obj, callback);
});

OsuApi.prototype.getBeatmap = (function(id, callback) {
    this.callApi('get_beatmaps', {b: id}, buildOnlyFirstCallback(callback));
});

OsuApi.prototype.getBeatmapSet = (function(id, callback) {
    this.callApi('get_beatmaps', {s: id}, callback);
});

OsuApi.prototype.getBeatmapsByUser = (function(id, callback) {
    this.callApi('get_beatmaps', {u: id}, callback);
});

OsuApi.prototype.getUserRaw = (function(obj, callback) {
    this.callApi('get_user', obj, callback);
});

OsuApi.prototype.getUser = (function(user, eventDays, callback) {
    var params = {u: user, m: this.mode};
    switch(typeof user) {
        case 'string':
            params.type = 'string';
            break;
        case 'number':
            params.type = 'id';
            break;
    }
    if(typeof eventDays == 'function') {
        callback = eventDays;
    } else if(eventDays) {
        params.event_days = eventDays;
    }

    this.callApi('get_user', params, buildOnlyFirstCallback(callback));
});

OsuApi.prototype.getScoresRaw = (function(obj, callback) {
    this.callApi('get_scores', obj, callback);
});

OsuApi.prototype.getScores = (function(beatmapId, userId, callback) {
    var params = {b: beatmapId, m: this.mode};
    if(typeof userId == 'function') {
        callback = userId;
    } else if(userId) {
        params.u = userId;
    }

    this.callApi('get_scores', params, callback);
});

OsuApi.prototype.getUserScore = (function(beatmapId, userId, callback) {
    this.getScores(beatmapId, userId, buildOnlyFirstCallback(callback));
});

OsuApi.prototype.getUserBestRaw = (function(obj, callback) {
    this.callApi('get_user_best', obj, callback);
});

OsuApi.prototype.getUserBest = (function(id, callback) {
    var params = {u: id, m: this.mode};
    switch(typeof user) {
        case 'string':
            params.type = 'string';
            break;
        case 'number':
            params.type = 'id';
            break;
    }
    this.callApi('get_user_best', params, callback);
});

OsuApi.prototype.getUserRecentRaw = (function(obj, callback) {
    this.callApi('get_user_recent', obj, callback);
});

OsuApi.prototype.getUserRecent = (function(id, callback) {
    var params = {u: id, m: this.mode};
    switch(typeof user) {
        case 'string':
            params.type = 'string';
            break;
        case 'number':
            params.type = 'id';
            break;
    }
    this.callApi('get_user_recent', params, callback);
});

OsuApi.prototype.getMatchRaw = (function(obj, callback) {
    this.callApi('get_match', obj, callback);
});

OsuApi.prototype.getMatch = (function(id, callback) {
    this.callApi('get_match', {mp: id}, callback);
});
