
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var client = require('twilio')('AC61455fd7aad3316f82f60f04cddb586b', 'e83a985c887fb4a41511e707020066ab');

var mysql = require("mysql");
var db_config = {
    host : "us-cdbr-east-05.cleardb.net",
    port : 3306,
    user : "ba21ad8f1c205b",
    password : "53ca88d6",
    database : "heroku_c840271f8e22be3"
};

var mysqlPool = mysql.createPool(db_config);

function keepAlive(){
   mysqlPool.getConnection(function(err, connection){
     if(err) { return; }
     connection.ping();
     connection.release();
   });
    //redis client를 사용중이라면, 아마 Redis연결도 빠르게 끊길겁니다.
    //client.ping();  // 라고 해주면 Redis연결도 유지합니다.
 	console.log("KeepAlive");
 }

setInterval(keepAlive, 60*1000);

var app = express();

app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// // all environments
app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/member', routes.member);
// app.get('/member/join', routes.join_member);
// app.get('/member/buy', function(req,res) {
// 	routes.buy_member(req,res,mysqlPool);
// });
// app.get('/member/info', function(req,res) {
//   routes.info_member(req,res,mysqlPool);
// });
app.get('/member/info', function(req,res) {
  routes.getMemberInfo(req,res,mysqlPool);
});

app.get('/sales/info', function(req,res) {
  routes.getSalesInfo(req,res,mysqlPool);
});

app.post('/member/join', function(req,res) {
  routes.postMemberJoin(req,res,mysqlPool);
});


app.get('/member/buy', function(req,res) {
  routes.getMemberbuy(req,res,mysqlPool);
});

app.get('/member/detail/:mno', function(req,res) {
  routes.getMemberDetail(req,res,mysqlPool);
});

app.get('/product/list', function(req,res) {
	routes.getProductList(req,res,mysqlPool);
});

app.get('/member/detail/:mno/usualline', function(req,res) {
  routes.getMemberDetailUsualLine(req,res,mysqlPool);
});

app.get('/member/detail/:mno/rescentline', function(req,res) {
  routes.getMemberDetailRescentLine(req,res,mysqlPool);
});

app.post('/member/product/sell/', function(req,res) {
  routes.sellProduct(req,res,mysqlPool);
});

app.get('/stats/location', function(req,res) {
  routes.statsLocation(req,res,mysqlPool);
});

app.get('/stats/age', function(req,res) {
  routes.statsAge(req,res,mysqlPool);
});

app.get('/stats/product', function(req,res) {
  routes.statsProduct(req,res,mysqlPool);
});

app.get('/member/detail/getline/:pname', function(req,res) {
  routes.getRecommendLine(req,res,mysqlPool);
});

app.post('/sendMessage', function(req,res) {
  var phoneno = req.body.phoneno.substring(1);
  var phoneno = phoneno.replace(/-/g,'');

  console.log(phoneno);


  client.sendMessage({

      to:'+82'+phoneno, // Any number Twilio can deliver to
      from: '+18128714013', // A number you bought from Twilio and can use for outbound communication
      body: req.body.message // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio

      console.log(err);

      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1

          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."

      }
  });
});

app.get('/messageList', function(req, res) {
  client.sms.messages.list(function(err, data) {
    res.json(data.sms_messages);
  });
})

// app.get('/member/grade', routes.grade_member);
// app.get('/worker', routes.worker);
// app.get('/product', function(req,res) {
// 	routes.product(req,res,mysqlPool);
// });
// app.get('/schedule', routes.schedule);
// app.get('/stats', routes.stats);
// app.get('/stats/product', routes.product_stats);
// app.get('/stats/sales', routes.sales_stats);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
