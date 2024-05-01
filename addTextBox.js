const mongoose = require('mongoose');
const TextBox = require('./models/TextBox');

// MongoDB Connection String
const mongoURI = process.env.MONGODB_CONNECTION_STRING; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('open', async () => {
  console.log('Connected to MongoDB');

  // Create a new text box
  const newTextbox = new TextBox({
    content: 'Sample Text Box',
    x: 100,  // X position
    y: 100,  // Y position
    lastEdited: new Date()
  });

  // Save the new text box
  try {
    const savedTextbox = await newTextbox.save();
    console.log('Text Box Added:', savedTextbox);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error adding text box:', error);
    mongoose.disconnect();
  }
});