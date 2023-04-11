const express = require('express');
const router = express.Router();
const base = require('../controllers/hello')
const issue = require('../controllers/your-company/example')

router.get('/', base.hello)


router.post('/customer/issue', issue.open_account)

module.exports = router;