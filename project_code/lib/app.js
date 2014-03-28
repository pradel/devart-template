'use strict';

var Twit = require('twit');
var request = require('request');

var T = new Twit({
    consumer_key: 'xxxxxx',
    consumer_secret: 'xxxxxx',
    access_token: 'xxxxx-xxxxxx',
    access_token_secret: 'xxxxxx'
});

var hashtag = "sunset";
var exclude =  [
    'food',
    'dog',
    'tagsforlikes',
    'cloudporn',
    'natureporn',
    'skyporn',
    'cat',
    'likeforlike',
    'like4like'
];

var refreshTimeInstagram = 5 * 1000;
var postsInstagram = [];
var clientIdInstagram = "xxxx";

var urlInstagram = "https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?client_id=" + clientIdInstagram + "&callback=?";


module.exports = function(io, server) {

    var streamTwitter = T.stream('statuses/filter', { track: ['#' + hashtag] });

    streamTwitter.on('tweet', function (tweet) {
        // if is not a retweet and there is an image
        if (tweet && tweet.retweeted_status == null && tweet.entities != null && tweet.entities.media != null && tweet.entities.media[0].media_url != null) {
            io.sockets.emit('new:tweet', {image_url: tweet.entities.media[0].media_url});
        }
    });

    setInterval(function() {
        request({url: urlInstagram, json: true}, function (error, response, data) {
            if (!error && response.statusCode == 200) {
                if (data.data) {
                    data = data.data;
                    for (var i = 0; i < data.length; i++) {
                        if (!isInWallInstagram(data[i])  && noExcludeTags(data[i])) {
                            postsInstagram.push(data[i]);
                            io.sockets.emit('new:tweet', {image_url:  data[i].images.standard_resolution.url});
                        }
                    }
                    if (postsInstagram > 30) {
                        postsInstagram.slice(0, 30);
                    }
                }
            }
        });
    }, refreshTimeInstagram);

    function noExcludeTags(post) {
        for (var i = 0; i < exclude.length; i++) {
            if (post.tags.indexOf(exclude[i]) != -1)
                return false
        }
        return true;
    }

    function isInWallInstagram(post) {
        for (var i = 0; i < postsInstagram.length; i++) {
            if (postsInstagram[i].id == post.id)
                return true;
        }
        return false;
    }

};