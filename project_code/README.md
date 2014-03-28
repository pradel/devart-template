# Eternal Sunset

## Installation

Create an application at [Twitter developpers](https://dev.twitter.com/ "Twitter developpers")
Create an application at [Instagram developpers](http://instagram.com/developer/ "Instagram developpers")
Download the git repository.
Run
```
npm install
bower install
```

Put your keys app in ./lib/app.js
```
var T = new Twit({
    consumer_key: 'xxxxxx',
    consumer_secret: 'xxxxxx',
    access_token: 'xxxxx-xxxxxx',
    access_token_secret: 'xxxxxx'
});

var clientIdInstagram = "xxxx";
```

## Running
```
node app.js
```

Open your browser at [http://localhost:8080/](http://localhost:8080/ "http://localhost:8080/")