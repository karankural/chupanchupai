var Json_objects = require('/WOrk/CasperJS programs/New/hcah/hcahdata1.yaml'); // getting values from json

var userid = Json_objects.Username;
var screenshot = Json_objects.Screenshots;		
var passkey = Json_objects.Password;
var url = Json_objects.Base_Url;
console.log(userid + screenshot + passkey + url);