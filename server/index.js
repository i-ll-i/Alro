const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/AD/COVERS'));
app.use(express.static(__dirname + '/AD/PICTURES'));

// app.use(( req, res, next ) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     res.append('Access-Control-Allow-Headers', 'x-requested-with');
//     next();
// });

require('./routers/sections.router.js')(app);
require('./routers/articles.router.js')(app);
require('./routers/authentication.router.js')(app);

app.listen( 9000, () => {
    console.log( "Сервер запущен!" );
});