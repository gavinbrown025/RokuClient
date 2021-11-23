const express = require('express');
const router = express.Router();

const { createProxyMiddleware } = require('http-proxy-middleware');

const production = true
const url = production ? 'https://video-db-gb.herokuapp.com/' : 'http://localhost:5500'

router.get('/', (req, res) => {
    res.render('index');
});

router.use('/api', createProxyMiddleware({
    target: url,  //!target the server port
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}));

router.use('/ums', createProxyMiddleware({
    target: url,  //!target the server port
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}));

router.use((req, res) => {
    res.status(404);
    res.render('error', {
        layout: "errorLayout.hbs",
        errormessage: `you've lost your way. "${req.url}" doesnt exist`
    });
});

module.exports = router;