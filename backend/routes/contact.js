const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 3, max: 200 }).withMessage('Subject must be 3-200 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters')
];

// Simple auth middleware for viewing messages
const authenticate = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.query.token;
  
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized access' 
    });
  }
  
  next();
};

// POST - Submit contact form
router.post('/submit', validateContact, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { name, email, subject, message } = req.body;

    // Create new message
    const newMessage = new Message({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully! Thank you for reaching out.',
      data: {
        id: newMessage._id,
        createdAt: newMessage.createdAt
      }
    });

  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// Helper function to mask email
const maskEmail = (email) => {
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  const visibleChars = Math.min(3, Math.floor(localPart.length / 2));
  return `${localPart.substring(0, visibleChars)}***@${domain}`;
};

// GET - Fetch all messages (Public route with masked email)
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .select('-__v'); // Exclude version key
    
    // Mask only email, keep name visible
    const maskedMessages = messages.map(msg => ({
      _id: msg._id,
      name: msg.name,
      email: maskEmail(msg.email),
      subject: msg.subject,
      message: msg.message,
      createdAt: msg.createdAt
    }));
    
    res.status(200).json({ 
      success: true, 
      count: maskedMessages.length,
      data: maskedMessages 
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// GET - Fetch all messages with full details (Protected admin route)
router.get('/messages/admin', authenticate, async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.status(200).json({ 
      success: true, 
      count: messages.length,
      data: messages 
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// DELETE - Delete a message (Protected route)
router.delete('/messages/:id', authenticate, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Message deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

module.exports = router;