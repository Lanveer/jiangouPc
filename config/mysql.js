/**
 * Created by lanveer on 2017/9/18.
 */
const mysql = require('mysql');
const config = require('./config');

var poolCluster = mysql.createPoolCluster({
    'canRetry':true,
    'removeNodeErrorCount':2,
    'restoreNodeTimeout':5*60*1000
});
poolCluster.add('MASTER', config.mysql_master);
poolCluster.on('remove',function (nodeId) {
    console.log('Mysql Removed node : '+nodeId);
});

var master = poolCluster.of('MASTER');
exports.master = master;