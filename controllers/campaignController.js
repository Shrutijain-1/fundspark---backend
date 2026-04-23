const Campaign = require('../models/Campaign');

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({});
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a campaign
// @route   POST /api/campaigns
// @access  Private
exports.createCampaign = async (req, res) => {
    try {
        const { title, goal, img, desc } = req.body;

        if (!title || !goal) {
            return res.status(400).json({ message: 'Title and Goal are required' });
        }

        const campaign = await Campaign.create({
            title,
            goal: Number(goal),
            img,
            desc
        });

        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a completed campaign
// @route   DELETE /api/campaigns/:id
// @access  Private (or any authenticated user can delete if full, keeping the simple rules)
exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        if (campaign.raised < campaign.goal) {
            return res.status(400).json({ message: 'Cannot delete campaign until goal is reached' });
        }

        await Campaign.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Campaign removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fund a campaign
// @route   POST /api/campaigns/:id/fund
// @access  Private
exports.fundCampaign = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        campaign.raised += Number(amount);
        await campaign.save();

        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
