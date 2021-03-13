const express = require('express');
const router = express.Router();

const { createProxyMiddleware } = require('http-proxy-middleware');

router.use('/api', createProxyMiddleware({
    target: 'http://localhost:5500',  //!target the server port
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}));

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/home', (req, res) => {
    res.render('index');
});

router.use((req, res) => {
    res.status(404);
    res.render('error', {
        layout: "errorLayout.hbs", 
        errormessage: `you've lost your way "${req.url}" doesnt exist`
    });
});

module.exports = router;