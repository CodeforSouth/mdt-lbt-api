// TODO: modularize resources
// TODO: masquerade error from db for response
// TODO: allow querying by sending querystring on GET ex. { accountNumber: 666, classcode: 101 }


var db = require('../config/db'),
    _dte = (new Date).toISOString();

function runQuery(res, sql, cb){
    db.pool.getConnection(function(err, connection){
        if(!err){
            connection.query(sql, function(err, rows, fields){
                if(typeof(cb) !== 'function'){
                    if(!err){
                        res.json(200, { status: 'OK', count: rows.length, data: rows, dte: _dte });
                    } else {
                        res.json(400, { status: 'ERROR', error: err, dte: _dte });
                        console.log('RUN-QUERY__ERROR');
                        console.error(err);
                    };
                } else {
                    cb(err, rows, fields);
                };

                connection.release();
            });
        } else {
            throw err;
            //next();
        };
    });
};

exports.index = function(req, res){
    // TODO: Escape/Sanitaze querystring
    var limit = db.escape(req.query.limit) == 'NULL'? 10 : db.escape(parseInt(req.query.limit)),
        skip = db.escape(req.query.skip) == 'NULL'? 0 : db.escape(parseInt(req.query.skip)),
    	sql = ' SELECT * FROM 2014_LBT_MiamiDade LIMIT '+ skip + ',' + limit;
        //console.log(skip, limit);

    runQuery(res, sql);
};

//************//
//  Accounts  //
//************//
exports.accounts = function(req, res){
    var limit = db.escape(req.query.limit) == 'NULL'? 10 : db.escape(parseInt(req.query.limit)),
        skip = db.escape(req.query.skip) == 'NULL'? 0 : db.escape(parseInt(req.query.skip)),
        sql = ' SELECT Account_Number FROM 2014_LBT_MiamiDade LIMIT ' + skip + ',' + limit;

    runQuery(res, sql);
};

//*******************//
//    XXXXX_Details  //
//*******************//
function queryWithDetails(res, clmName, clmValue){
    var sql = 'SELECT * FROM 2014_LBT_MiamiDade WHERE ?? = ?',
        inserts = [clmName, clmValue];

    sql = db.format(sql, inserts);

    runQuery(null, sql, function (err, rows, fields){
       if(err){
            res.json(400, { status: 'ERROR', error: err, dte: _dte });
            console.log('DTLs_ERROR');
            console.error('_DTLs_ERROR');
        } else if(rows != 'undefined'){
            if(rows.length == 0){
                res.json(200, { status: 'OK', data: 'No records found', dte: _dte });
            };

            res.json(200, { status: 'OK', data: rows, dte: _dte });
        };
    });
};

exports.receiptDetails = function(req, res) {
    var recpNumber = parseInt(req.params.recNum);

    queryWithDetails(res, 'Receipt_Number', recpNumber);
};

exports.accountDetails = function(req, res){
    var acctNumber = parseInt(req.params.actNum);

    queryWithDetails(res, 'Account_Number', acctNumber);
};


//********************************//
//   Physical_Business_Location   //
//********************************//
exports.pbls = function(req, res){
    var limit = db.escape(req.query.limit) == 'NULL'? 10 : db.escape(parseInt(req.query.limit)),
        skip = db.escape(req.query.skip) == 'NULL'? 0 : db.escape(parseInt(req.query.skip)),
        sql = ' SELECT DISTINCT Physical_Business_Location '+
              ' FROM 2014_LBT_MiamiDade ORDER BY Physical_Business_Location '+
              ' LIMIT ' + skip + ' , ' + limit;

    runQuery(res, sql);
};


//**************//
//  Categories  //
//**************//
exports.categoryNames = function(req, res){
    var sql = ' SELECT DISTINCT Category_Name  FROM 2014_LBT_MiamiDade ORDER BY Category_Name ';


    runQuery(res, sql);
};

exports.categoryCodes = function(req, res){
    var sql = ' SELECT DISTINCT Category_Code FROM 2014_LBT_MiamiDade ORDER BY Category_Code ';

    runQuery(res, sql);
};

exports.categoryCodesNames = function(req, res){
    var limit = db.escape(req.query.limit) == 'NULL'? 10 : db.escape(parseInt(req.query.limit)),
        skip = db.escape(req.query.skip) == 'NULL'? 0 : db.escape(parseInt(req.query.skip)),
        sql = ' SELECT DISTINCT Category_Code, Category_Name '+
              ' FROM 2014_LBT_MiamiDade ORDER BY Category_Code '+
              ' LIMIT ' + skip + ' , ' + limit;

    runQuery(res, sql);
};

//*************//
//   Classes   //
//*************//
exports.classCodesNames = function(req, res){
    var limit = db.escape(req.query.limit) == 'NULL'? 10 : db.escape(parseInt(req.query.limit)),
        skip = db.escape(req.query.skip) == 'NULL'? 0 : db.escape(parseInt(req.query.skip)),
        sql = ' SELECT DISTINCT Class_Code, Class_Name '+
              ' FROM 2014_LBT_MiamiDade ORDER BY Class_Code '+
              ' LIMIT ' + skip + ' , ' + limit;

    runQuery(res, sql);
};

exports.classNames = function(req, res){
    var sql = ' SELECT DISTINCT Class_Name FROM 2014_LBT_MiamiDade ORDER BY Class_Name; ';

    runQuery(res, sql);
};

exports.classCodes = function(req, res){
    var sql = ' SELECT DISTINCT Class_Code FROM 2014_LBT_MiamiDade ORDER BY Class_Code ';

    runQuery(res, sql);
};

exports.geocode = function (req, res) {
    var sql = ' SELECT * FROM geocode a '+
              ' JOIN 2014_LBT_MiamiDade b on a.receipt = b.Receipt_Number '
}
