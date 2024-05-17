import React, { useState } from 'react';
import { ReactComponent as ChatIconSvg } from './chat.svg';

const ChatIcon = ({ toggleChat }) => {
  return (
    <div className="chat-icon" onClick={toggleChat}>
      <ChatIconSvg />
    </div>
  );
};

export default ChatIcon;
