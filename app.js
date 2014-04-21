/**
 * Module dependencies.
 */
var 
    express    = require('express'),
    http       = require('http'),
    path       = require('path'),
    nodemailer = require('nodemailer')
;

var app = express();

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "",
        pass: ""
    }
});

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

app.get('/', function(req, res){
    res.render('index');
});

app.post('/contact', function(req, res){
    var body, name, email, message;

    body    = req.body;
    name    = body.name;
    email   = body.email;
    message = body.message;

    smtpTransport.sendMail(
        {
            from: 'Zeppelin Places <noreply@zeppelinplaces.com>',
            to: 'conar@sellwelldesigns.com',
            subject: 'Message from ZeppelinPlaces.com',
            text: 'Name: ' + name + '\r\nEmail: ' + email + '\r\nMessage: ' + message,
            html: '<strong>Name:</strong> ' + name + '<br /><strong>Email:</strong> ' + email + '<br /><strong>Message:</strong> ' + message
        },
        function(err, response){
            if(err){
                console.log('Mail Error', err);
            }
            else {
                console.log('Message Sent: ', response.message);
            }
            res.redirect('/');
        }
    );
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
