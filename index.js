var request = require('request');

exports.Api = OsuApi;

function OsuApi(apiKey) {
    this.apiKey = apiKey;
}

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

OsuApi.prototype.getBeatmap = (function(id, callback) {
    this.callApi('get_beatmaps', {b: id}, function(err, obj) {
        if(err) {
            callback(err, null);
        } else {
            callback(null, obj[0]);
        }
    });
});

OsuApi.prototype.getBeatmapSet = (function(id, callback) {
    this.callApi('get_beatmaps', {s: id}, callback);
});

OsuApi.prototype.getBeatmapsByUser = (function(id, callback) {
    this.callApi('get_beatmaps', {u: id}, callback);
});
