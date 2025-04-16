import React, { useState } from "react";

//props for the chat component
type ChatProps = {
  onChatChange: (chat: string) => void;
  onChatSubmit: () => void;
};

const Chat = ({ onChatChange, onChatSubmit }: ChatProps) => {
  const [chat, setChat] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setChat(value);
    onChatChange(value); // Call the parent function to update the chat state
  }

  //handle the enter key to submit the chat
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onChatChange(""); // Call the parent function to clear the chat
      setChat(""); // Clear the local chat state
      onChatSubmit(); // Call the parent function to submit the chat
    }
  }

  return (
    <div>
      <label>
        You:{" "}
        <input
          type="text"
          placeholder="Enter a chat..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={chat}
        />
      </label>
    </div>
  );
};

export default Chat;
