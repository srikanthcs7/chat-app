import React from "react";
import { Box, Card, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default ({ clearAllMessages }) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography>Chat with Bot</Typography>
      </Box>
      <Box>
        <Tooltip title="Clear all messages">
          <IconButton onClick={clearAllMessages}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};
