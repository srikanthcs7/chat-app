import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import styled from "styled-components";

const ChatBoxWrapper = styled(Box)`
  display: flex;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
`;

function ChatBox({ handleSend }) {
  const [message, setMessage] = useState("");

  return (
    <ChatBoxWrapper>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setMessage("");
          handleSend(message);
        }}
        sx={{ marginLeft: "4px" }}
      >
        Send
      </Button>
    </ChatBoxWrapper>
  );
}

export default ChatBox;
