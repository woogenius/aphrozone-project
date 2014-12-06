
/*
 * GET home page.
 */


exports.getMemberInfo = function(req, res, mysqlPool) {
  var query = "SELECT m.mno, m.name, m.gender, m.bday, m.phoneno, m.skintype, m2.name as recommender_name FROM member m LEFT JOIN member m2 ON m.recommender_mno = m2.mno order by mno desc"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      console.log(data);
      res.json(data)
      connection.release();
    });
  });
};

exports.getSalesInfo = function(req, res, mysqlPool) {
  var query = "SELECT id, mno, name, gender, bday, phoneno, recommender_mno FROM salesman S LEFT OUTER JOIN member M on S.member_mno = M.mno"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      console.log(data);
      res.json(data)
      connection.release();
    });
  });
};

exports.postMemberJoin = function(req, res, mysqlPool) {
  console.log(req.body);
  var name = req.body.name;
  var gender = req.body.gender;
  var bday = req.body.birthYear+"-"+req.body.birthMonth+"-"+req.body.birthDay;
  var phoneno = req.body.phoneno;
  var addr = req.body.addr;
  var bank = req.body.bank;
  var accountno = req.body.accountno;
  var fc = req.body.function;
  var skintype = req.body.skintype;
  var recommenderMno = req.body.recommenderMno;

  var insertQuery = "INSERT INTO member (name, gender, bday, phoneno, addr, bank, accountno, skintype, recommender_mno) VALUES ('"
               + name + "','" + gender + "','" + bday + "','" + phoneno + "','" + addr + "','" + bank + "','" + accountno + "','" + skintype + "','" + recommenderMno +"')"
  console.log(insertQuery);
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(insertQuery, function(err) {
      if (err) throw err;
      connection.release();
    });
  });
  res.json({status : "success"});
};


exports.getMemberbuy = function(req, res, mysqlPool) {
  var query = "select sdate, mno, mname, pname, amount, money, method, rno from sell order by sdate desc"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      console.log(data);
      res.json(data)
      connection.release();
    });
  });
};


exports.getProductList = function(req, res, mysqlPool) {
  var query = "select * from product"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      // console.log(data);
      res.json(data)
      connection.release();
    });
  });
};

exports.getMemberDetail = function(req, res, mysqlPool) {
  var mno = req.param('mno');
  var query = "select * from member where mno =" + mno;
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      console.log(data);
      res.json(data)
      connection.release();
    });
  });
};

exports.getMemberDetailRescentLine = function(req, res, mysqlPool) {
  var mno = req.param('mno');
  var query = "select sdate, pname from sell where mno ="+mno+" order by sdate desc limit 3";
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      console.log(data);
      res.json(data)
      connection.release();
    });
  });
};

exports.getMemberDetailUsualLine = function(req, res, mysqlPool) {
  var mno = req.param('mno');
  var query = "select pname, count(pname) as count from sell where mno ="+mno+" group by pname order by count desc limit 3";
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      console.log(data);
      res.json(data)
      connection.release();
    });
  });
};

exports.sellProduct = function(req, res, mysqlPool) {
  var mno = req.param('mno');
  var pname = req.param('pname');
  var amount = req.param('amount');
  var query = "select pname, count(pname) as count from sell where mno ="+mno+" group by pname order by count desc limit 3";
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      console.log(data);
      res.json(data)
      connection.release();
    });
  });
};

exports.statsLocation = function(req, res, mysqlPool) {
  var query = "select sum(money) as money, user.gu as loc from sell join user on sell.mno = user.mno group by user.gu order by money desc"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      // console.log(data);
      res.json(data)
      connection.release();
    });
  });
}

exports.statsAge = function(req, res, mysqlPool) {
  var query = "select sum(money) as money, left(115-left(birthday, 2), 1) as age from sell join user on sell.mno = user.mno group by age order by money desc"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      // console.log(data);
      res.json(data)
      connection.release();
    });
  });
}

exports.statsProduct = function(req, res, mysqlPool) {
  var query = "select sum(money) as money, pname from sell group by pname order by money desc"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      // console.log(data);
      res.json(data)
      connection.release();
    });
  });
}

exports.getRecommendLine = function(req, res, mysqlPool) {
  var pname = req.param('pname');
  console.log(req);
  var query = "select src, result1 from concatenate where src = '" + pname+"'";
  console.log(query);
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      // console.log(data);
      res.json(data)
      connection.release();
    });
  });
}






exports.index = function(req, res){
  res.render('index');
};

exports.member = function(req, res){
  res.render('member/main');
};

exports.join_member = function(req, res){
  res.render('member/join');
};

exports.buy_member = function(req, res, mysqlPool){
  var query = "select * from sell"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      // console.log(data);
      res.render('member/buy', {data:data});
      connection.release();
    });
  });
};

exports.info_member = function(req, res, mysqlPool){
  var query = "select * from user"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      // console.log(data);
      res.render('member/info', {data:data});
      connection.release();
    });
  });
};

exports.grade_member = function(req, res){
  res.render('member/grade');
};

exports.worker = function(req, res){
  res.render('worker');
};

exports.product = function(req, res, mysqlPool){
  var query = "select * from product"
  mysqlPool.getConnection(function(err, connection) {
    if(err) throw err;
    connection.query(query, function(err, data) {
      // console.log(data);
      res.render('product', {data:data});
      connection.release();
    });
  });
};

exports.schedule = function(req, res){
  res.render('schedule');
};

exports.stats = function(req, res){
  res.render('stats/main');
};

exports.sales_stats = function(req, res){
  res.render('stats/sales');
};

exports.product_stats = function(req, res){
  res.render('stats/product');
};