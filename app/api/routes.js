const express = require('express');
const presenceController = require('./presenceController');

const router = express.Router();

router.route('/presence/home').post(presenceController.home);
router.route('/presence/away').post(presenceController.away);

module.exports = router;