const express = require('express');
const router = express.Router();

const { createProxyMiddleware } = require('http-proxy-middleware');

router.use('/api', createProxyMiddleware({
    target: 'http://localhost:5500',
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded'
    },
    changeOrigin: true
}));

router.get('/', (req, res) => {
    res.send('hit the main route');
});

module.exports = router;