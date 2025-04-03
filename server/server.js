/**
 * AndWeSupport Backend Server
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from both root and public directories
app.use('/', express.static(path.join(__dirname, '..')));
app.use('/public', express.static(path.join(__dirname, '../public')));

// API Routes

// Booking form submission endpoint
app.post('/api/booking', (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }
    
    // In a real implementation, you would:
    // 1. Store data in a database
    // 2. Send email notification
    // 3. Add to CRM system
    
    // For now, we'll just log the data and return success
    console.log('New booking request:', { name, email, phone, message });
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Your booking request has been received successfully! We will contact you shortly.'
    });
    
  } catch (error) {
    console.error('Error processing booking request:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request. Please try again later.' 
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/subscribe', (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide an email address' 
      });
    }
    
    // Here you would add the email to your mailing list or marketing platform
    console.log('New newsletter subscription:', email);
    
    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
    
  } catch (error) {
    console.error('Error processing subscription:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your subscription. Please try again later.' 
    });
  }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }
    
    // Here you would store the contact request and send notification emails
    console.log('New contact request:', { name, email, subject, message });
    
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.'
    });
    
  } catch (error) {
    console.error('Error processing contact request:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while sending your message. Please try again later.' 
    });
  }
});

// Catch-all route to serve the frontend for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});