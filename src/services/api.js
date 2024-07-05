export const fetchMessages = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const messages = localStorage.getItem("chatMessages") || [];

  localStorage.setItem("chatMessages", JSON.stringify(messages));

  return messages;
};

export const clearMessages = () => {
  localStorage.removeItem("chatMessages");
};
