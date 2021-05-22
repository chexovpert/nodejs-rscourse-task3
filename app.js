const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const bodyParser = require('body-parser');

const port=4000;

db.sync();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
//app.set('port', process.env.PORT || port);
app.listen(port, () => {
    console.log(`App is listening on ${port}`, );
}) //