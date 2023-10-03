import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'


function Chatbot (){
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    if(e.target.value !== ' ')
    {
        setInput(e.target.value);
    }
   };

 const sendMessage = () => {

    const message = input;
    if(message.length ===0 )
    {
        return;
    }
    setMessages([...messages, { text: message, type: 'user' }]);
    setInput('');

    // Send the user's message to the Metaphor API
    axios
      .post('http://localhost:5000/chat', { message: message }, {
        headers: {
          'x-api-key': 'c0b52b2a-e2a5-4a25-94a3-ee00c4781bf7',
        },
      })
      .then((response) => {
        const botMessage = response.data; 
        setMessages([...messages, { text: botMessage, type: 'bot' }]);
      })
      .catch((error) => {
        console.error('Metaphor API Error', error);
      });
    };


return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={handleInputChange}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
