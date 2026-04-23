const User = require('../models/User');

// Login or Register using Name only
exports.login = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // Check if user exists
        let user = await User.findOne({ name });
        
        // If user doesn't exist, register them
        if (!user) {
            const role = name.toLowerCase() === 'admin' ? 'admin' : 'user';
            user = await User.create({ name, role });
        }

        res.status(200).json({
            name: user.name
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
