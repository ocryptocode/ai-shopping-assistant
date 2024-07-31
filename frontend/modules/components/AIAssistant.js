import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import axios from 'axios';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    const newMessage = { sender: 'user', text: message };
    setChat([...chat, newMessage]);

    const response = await axios.post('/api/ai-assistant', { message });
    const aiMessage = { sender: 'ai', text: response.data.reply };

    setChat([...chat, newMessage, aiMessage]);
    setMessage('');
  };

  return (
    <Box>
      <Typography variant="h6">AI Shopping Assistant</Typography>
      <Box>
        {chat.map((msg, index) => (
          <Typography key={index} color={msg.sender === 'ai' ? 'primary' : 'textPrimary'}>
            {msg.text}
          </Typography>
        ))}
      </Box>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        placeholder="Ask me anything..."
        fullWidth
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </Box>
  );
};

export default AIAssistant;
