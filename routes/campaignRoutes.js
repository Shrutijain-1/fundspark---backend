const express = require('express');
const router = express.Router();
const {
    getCampaigns,
    createCampaign,
    fundCampaign,
    deleteCampaign
} = require('../controllers/campaignController');

router.route('/')
    .get(getCampaigns)
    .post(createCampaign);

router.route('/:id').delete(deleteCampaign);
router.route('/:id/fund').post(fundCampaign);

module.exports = router;
