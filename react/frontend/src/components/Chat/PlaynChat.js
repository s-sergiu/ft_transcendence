import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import languages from './languages';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const urlParams = new URLSearchParams(window.location.search);
const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const ChatMessage = ({ message, time, isUser }) => (
  <div className={`flex gap-5 ${isUser ? "self-end text-right" : ""} text-3xl text-black max-md:mt-10 max-md:flex-wrap`}>
    {!isUser && <img src="/Users/shetteemah/Documents/transcendence/frontend/src/chat-avatar.png" alt="User1 avatar" className="in-chat-user1-avatar" />}
    <div className={`${isUser ? "flex-auto" : "flex flex-col grow shrink-0 basis-0 w-fit"}`}>
      <div>{message}</div>
      {!isUser && <div className="mt-1.5 text-base text-neutral-400">{time}</div>}
    </div>
    {isUser && <img src="/Users/shetteemah/Documents/transcendence/frontend/src/chat-avatar.png" alt="User2 avatar" className="in-chat-user2-avatar" />}
  </div>
);

const ChatInput = () => (
  <div className="chat-input-section">
    <div className="chat-text-box">
      Chat message...
    </div>
      <img src="/Users/shetteemah/Documents/transcendence/frontend/img/send-icon.png" alt="Send message icon" className="send-chat-button" />
  </div>
);

const ChatMessages = () => {
  const messages = [
    { message: "Chat message...", time: "22:04 PM", isUser: false },
    { message: "Chat message...", time: "22:04 PM", isUser: true },
    { message: "Chat message...", time: "22:04 PM", isUser: false },
    { message: "Chat message...", time: "22:04 PM", isUser: false },
    { message: "Chat message...", time: "22:04 PM", isUser: true },
    { message: "Chat message...", time: "22:04 PM", isUser: false },
    { message: "Chat message...", time: "22:04 PM", isUser: true },
  ];

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.isUser ? 'self-end' : ''}`}
        >
          {msg.message}
          <div className="message-time">{msg.time}</div>
        </div>
      ))}
    </div>
  );
};

const ChatHeader = ({ onClose }) => (
  <header className="chat-section-header">
    <img src="/Users/shetteemah/Documents/transcendence/frontend/src/chat-avatar.png" alt="Chat avatar" className="user-chat-avater" />
    <h2 className="chat-heading">Chat</h2>
    <button className="close-button my-auto text-white" onClick={onClose}>x</button>
  </header>
);

const ScoreBoard = () => (
  <div className="scoreboard">
    <div className="player-1-score-box">
      Player 1: 0
    </div>
    <div className="player-2-score-box">
      Player 2: 0
    </div>
  </div>
);

function Playnchat() {
  const [language, setLanguage] = useState(languages.english);
  const [isChatOpen, setChatOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div className="body">
      <main className="game-window">
        <section className="header-box">
          <h1 className="game-titel">
            PONG GAME
          </h1>
          <ScoreBoard />
        </section>
      </main>
      <div className='chat-icon' onClick={toggleChat}>
        <img src="/Users/shetteemah/Documents/transcendence/frontend/img/chat.svg" alt="Chat icon" />
      </div>
      {isChatOpen && (
        <aside className="chat-section">
          <div className="chat-window">
            <ChatHeader onClose={toggleChat} />
            <ChatMessages />
          </div>
        </aside>
      )}
    </div>
  );
}

export default Playnchat;