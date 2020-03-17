module.exports = (err, req, res, next) => {
    console.log(err.message);
    res.status(500);
    res.send('server internal error');
};

module.exports = (err, req, res, next, id) => {
    console.log(err.message);
    res.status(500);
    res.send('server internal error related to the id');
};
