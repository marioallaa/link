var connect = require('connect');
var serveStatic = require('serve-static');

connect()
    .use(serveStatic(__dirname))
    .listen(8080, () => console.log('Server running on http://localhost:8080/ ...'));