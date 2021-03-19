
const path = require('path');

//setting up html routes for each html file. 

module.exports = (app) => {

    app.get('/', (req, res) =>
        res.sendFile(path.join(__dirname, '../public/index.html'))
    );

    app.get('/exercise', (req, res) =>
        res.sendFile(path.join(__dirname, '../public/exercise.html'))
    );

    app.get('/stats', (req, res) =>
        res.sendFile(path.join(__dirname, '../public/stats.html'))
    );

};