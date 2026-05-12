const router = require('express').Router();
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

// REGISTER
router.post('/register',
  [
    body('username').notEmpty().withMessage('Username required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 6 }).withMessage('Min 6 characters')
      .matches(/[A-Z]/).withMessage('Must include uppercase')
      .matches(/[0-9]/).withMessage('Must include number')
  ],
  register
);

// LOGIN
router.post('/login', login);

module.exports = router;
