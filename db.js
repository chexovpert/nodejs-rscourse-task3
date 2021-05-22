const Sequelize = require('sequelize');
require('dotenv').config()
                                //database username   password
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: '5433'
})
const Game = require('./models/game')(sequelize, Sequelize)
const User = require('./models/user')(sequelize, Sequelize)

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)
function sync () {
    console.log('sync');
}

module.exports= {Game, User, sync}
