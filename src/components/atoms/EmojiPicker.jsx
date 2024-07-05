import React from "react";
import { IconButton, Popover } from "@mui/material";

const EmojiPicker = ({ anchorEl, onClose, onEmojiClick }) => {
  const emojis = ["😀", "😂", "😍", "😢", "👍"];

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <div>
        {emojis.map((emoji) => (
          <IconButton key={emoji} onClick={() => onEmojiClick(emoji)}>
            {emoji}
          </IconButton>
        ))}
      </div>
    </Popover>
  );
};

export default EmojiPicker;
