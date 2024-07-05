import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import styled from "styled-components";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import EmojiPicker from "../atoms/EmojiPicker";

const MessageList = styled(List)`
  margin: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  overflow-y: auto;
`;

const MessageItem = styled.li`
  display: flex;
  justify-content: ${(props) =>
    props.sender === "bot" ? "flex-start" : "flex-end"};
  align-items: center;
  position: relative;
`;

const MessageBubble = styled.div`
  max-width: 60%;
  padding: 4px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.sender === "bot" ? "#f1f1f1" : "#1976d2"};
  color: ${(props) => (props.sender === "bot" ? "black" : "white")};
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  position: relative;
`;

const EmojiContainer = styled.div`
  display: flex;
  opacity: 0;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.sender !== "bot" ? "left: -30px;" : "right: -30px;")};

  ${MessageItem}:hover & {
    opacity: 1;
  }
`;

const MessageReaction = styled(Box)`
  position: absolute;
  bottom: -14px;
  ${(props) => (props.sender === "bot" ? "left: 0" : "right: 0")};
`;

function MessageDisplay({
  messages,
  loading,
  emojiAnchorEl,
  selectedMessage,
  handleEmojiClick,
  handleEmojiClose,
  handleEmojiOpen,
  handleClearMessages,
}) {
  return (
    <Box flexGrow={1} overflow="auto" margin={"16px"}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      ) : (
        <MessageList>
          {messages.map((message, index) => (
            <MessageItem key={index} sender={message.sender}>
              <MessageBubble sender={message.sender}>
                <Typography variant="body1" sx={{ margin: "8px" }}>
                  {message.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ alignSelf: "flex-end", marginTop: "4px" }}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <MessageReaction sender={message.sender}>
                  {message.reaction && <span>{message.reaction}</span>}
                </MessageReaction>
                <EmojiContainer sender={message.sender}>
                  <IconButton
                    sx={{ cursor: "pointer", padding: 0 }}
                    onClick={(event) =>
                      handleEmojiOpen(event, index, event.currentTarget)
                    }
                  >
                    <EmojiEmotionsIcon fontSize="small" />
                  </IconButton>
                </EmojiContainer>
              </MessageBubble>
            </MessageItem>
          ))}
        </MessageList>
      )}
      <EmojiPicker
        anchorEl={emojiAnchorEl}
        onClose={handleEmojiClose}
        onEmojiClick={handleEmojiClick}
      />
    </Box>
  );
}

export default MessageDisplay;
