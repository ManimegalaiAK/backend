const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get user's cart (fetching the cart for the authenticated user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.productId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart); // Return the cart items
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

module.exports = router;
