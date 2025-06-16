const express = require('express');
const router = express.Router();

const nftController = require('../controllers/nftController');

router.post('/uploadMetadata', nftController.uploadMetadata);
router.post('/mint', nftController.mintNFT);

module.exports = router;
