const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

router.get('/', async(req, res) => {
    const currentTodosCounter = await getAsync('added_todos'); 
    res.send({
        "added_todos": parseInt(currentTodosCounter)
    })
})

module.exports = router;