import React, { useState, useEffect } from "react";
import ChatBox from "../components/organisms/ChatBox";
import MessageDisplay from "../components/organisms/MessageDisplay";
import styled from "styled-components";
import { fetchMessages, clearMessages } from "../services/api";
import Actions from "../components/organisms/Actions";

const ChatPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = localStorage.getItem("chatMessages");
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        const response = await fetchMessages();
        setMessages(response);
      }
      setLoading(false);
    };

    loadMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const audio = new Audio("/notification.wav");
      audio.play();
    }
  }, [messages]);

  const handleEmojiClick = (emoji) => {
    const updatedMessages = messages.map((msg, index) =>
      index === selectedMessage ? { ...msg, reaction: emoji.emoji } : msg
    );
    setMessages(updatedMessages);
    setEmojiAnchorEl(null);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  };

  const handleEmojiOpen = (event, index, target) => {
    setSelectedMessage(index);
    setEmojiAnchorEl(target);
  };

  const handleEmojiClose = () => {
    setEmojiAnchorEl(null);
  };

  const handleClearMessages = () => {
    console.log("--");
    clearMessages();
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem("chatMessages", JSON.stringify(newMessages));
  };

  const replyBot = (updatedMessages) => {
    const newMsg = {
      text: "Yes! I always come with the same response!",
      sender: "bot",
      timestamp: Date.now(),
    };
    saveMessages([...updatedMessages, newMsg]);
  };

  const handleSend = (message) => {
    const newMsg = { text: message, sender: "user", timestamp: Date.now() };
    saveMessages([...messages, newMsg]);
    setTimeout(() => replyBot([...messages, newMsg]), 1000);
  };

  const clearAllMessages = () => {
    clearMessages();
    setMessages([]);
  };

  return (
    <ChatPageWrapper>
      <Actions clearAllMessages={clearAllMessages} />
      <MessageDisplay
        messages={messages}
        loading={loading}
        emojiAnchorEl={emojiAnchorEl}
        selectedMessage={selectedMessage}
        handleEmojiClick={handleEmojiClick}
        handleEmojiClose={handleEmojiClose}
        handleEmojiOpen={handleEmojiOpen}
        handleClearMessages={handleClearMessages}
      />
      <ChatBox handleSend={handleSend} />
    </ChatPageWrapper>
  );
}

export default ChatPage;
