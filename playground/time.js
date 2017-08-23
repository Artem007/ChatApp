const moment=require('moment');

//1503329864436

var data=1503329864436;
var time=moment(data).format('MMMM Do YYYY, h:mm:ss a');

console.log(time);
