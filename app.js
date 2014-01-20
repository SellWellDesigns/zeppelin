/**
 * Module dependencies.
 */
var 
    express = require('express'),
    http    = require('http'),
    path    = require('path')
;

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var animations = [
    'fixed-bg',
    'stack',
    'stack--fixed',
    'grow',
    'cards',
    'curl',
    'wave',
    'flip',
    'fly',
    'fly-simplified',
    'fly-reverse',
    'helix',
    'fan',
    'papercut',
    'twirl'
];

app.get('/', function(req, res){
    res.render('index', {
        animations: animations
    });
})

animations.forEach(function(view){
    app.get('/' + view, function(req, res){
        res.render('animation', {
            animation: view
        });
    });
});

app.get('/demo1', function(req, res){
    res.render('demo1');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
