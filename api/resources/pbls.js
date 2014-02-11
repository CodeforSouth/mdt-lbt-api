//********************************//
//   Physical_Business_Location   //
//********************************//
exports.pbls = function(req, res){
    var sql = ' SELECT DISTINCT Physical_Business_Location FROM 2014_LBT_MiamiDade ORDER BY Physical_Business_Location ';

    runQuery(res, sql);
};
