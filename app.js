var express = require('express'),
    path = require('path'),
    routes = require('./routes'),
    fs = require('fs');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 8080);
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('codingformiami2013'));
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.session());
    app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));
});

app.get('/mapit', function (req, res) {
    res.render('index');
});
app.get('/', routes.index);
app.get('/accounts', routes.accounts);
app.get('/account/:actNum', routes.accountDetails);
app.get('/receipt/:recNum', routes.receiptDetails);
app.get('/pbls', routes.pbls);
app.get('/categorycodesnames', routes.categoryCodesNames);
app.get('/classcodesnames', routes.classCodesNames);
app.get('/geoview', routes.geoview);
/*
app.get('/categorynames', routes.categoryNames);
app.get('/categorycodes', routes.categoryCodes);
app.get('/classnames', routes.classNames);
app.get('/classcodes', routes.classCodes);
*/

app.get('*', function(req, res){
    var logged = (new Date).toISOString() + ' --> ' + req.ip + ' to ' + req.url + '\n\r';
    fs.appendFile('logs/request.log', logged, function(err){
        if(!err){
            res.json(404, { 
                'error': 'not found', 
                'ip': req.ip, 
                'date': (new Date).toISOString(),
                'url': req.url 
            });
        };
    });
});

app.listen(app.get('port'), function(){
    console.log('Server started at localhost on ' + app.get('port'));
});
