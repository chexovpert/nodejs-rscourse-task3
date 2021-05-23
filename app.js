const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const middleware = require('./middleware/validate-session');

const port=4000;

db.sync();
app.use(express.urlencoded({ //fix body
    extended: true
}));
app.use(express.json());
app.use('/api/auth', user);
app.use(middleware);
app.use('/api/game', game);
//app.set('port', process.env.PORT || port);
app.listen(port, () => {
    console.log(`App is listening on ${port}`, );
})