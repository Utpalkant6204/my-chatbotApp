const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000; 

app.use(express.json());

// Define a route for handling chatbot messages
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  // Send the user's message to the Metaphor API
  
  try {
    const response = await axios.post('metaphor-endPoint', { query: message }, {
      headers: {
        'x-api-key': 'c0b52b2a-e2a5-4a25-94a3-ee00c4781bf7',
      },
    });

    const botMessage = response.data; 
    res.status(200).json({ message: botMessage });
  } catch (error) {
    console.error('Metaphor API Error', error);
    res.status(500).json({ message: 'Error communicating with the Metaphor API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
