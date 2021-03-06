# Eternal Sunset

## Authors
- Léo Pradel [Github account](https://github.com/pradel "Github account")
- Frédéric Daubagna

## Description
Observing the Twitter timeline in Paris we have seen the sun setting in real time close to the Arc de Triomphe ... Reflecting some more, it appeard obvious that our solar star was going down everywhere on earth. The sun never lies down, the earth spins on it axis and this explains why we have the feeling that the sun is setting down.
This is the proccess wich led me to the idea of watching a permanent sunset - Eternal Sunset - on my TV.

The social networks become messengers of this interaction between men and this perpetual movement.

Eternal Sunset is a collaborative work evolving with every minute rotations of earth, and the works evolves constantly.
We honor the solar system in the bosom of wich we are citizens.

## Link to Prototype
[Heroku App](http://eternal-sunset.herokuapp.com/ "Heroku App")

## Example Code
Server side
```
// instantiate public stream
var streamTwitter = T.stream('statuses/filter', { track: '#sunset' });

streamTwitter.on('tweet', function (tweet) {
    // if is an image and not a retweet 
    if (tweet && tweet.retweeted_status == null && tweet.entities != null && tweet.entities.media != null && tweet.entities.media[0].media_url != null) {
        io.sockets.emit('new:tweet', {image_url: tweet.entities.media[0].media_url});
    }
});
```
Client side
```
.controller('MainCtrl', function ($scope, mySocket, boxFactory) {
        $scope.boxs = boxFactory.getBoxs();
        // when receive a new socket put in wall
        mySocket.on('new:tweet', function(tweet) {
            boxFactory.addTweet(tweet);
        });
    });
```

## Links to External Libraries
Nodejs [Node js](http://nodejs.org/ "Node js")
Express [Express](http://expressjs.com/ "Express")
SocketIO [SocketIO](http://socket.io/ "SocketIO")
Twit [Twit](https://github.com/ttezel/twit "Twit")
Instagram node lib [Instagram-node-lib](https://github.com/mckelvey/instagram-node-lib "Instagram-node-lib")
AngularJS [AngularJS](http://angularjs.org/ "AngularJS")
jQuery [jQuery](http://jquery.com/ "jQuery")
Google Maps API [google-maps](https://developers.google.com/maps/ "google-maps")
Angular-socket-io [angular-socket-io](https://github.com/btford/angular-socket-io "angular-socket-io")

## Images & Videos
![Mapping](project_images/mapping.jpg?raw=true "Mappin")