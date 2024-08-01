import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import './AIAssistant.css';

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
    <Paper className="ai-assistant">
      <Box className="ai-assistant-header">
        <Typography variant="h6">AI Shopping Assistant</Typography>
      </Box>
      <Box className="ai-assistant-chat">
        {chat.map((msg, index) => (
          <Typography key={index} className={`ai-assistant-message ${msg.sender}`}>
            {msg.text}
          </Typography>
        ))}
      </Box>
      <Box className="ai-assistant-input">
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything..."
          fullWidth
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </Box>
    </Paper>
  );
};

export default AIAssistant;
