'use strict';

var server = require('./app'); 
var port   = 4000;

server.listen(port, function() {
  console.log('## ' + new Date());
  console.log('## OrganicBags Server running in port: %d', port);
  console.log('################## ');
});

