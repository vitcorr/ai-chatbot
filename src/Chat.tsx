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

  function handlebuttonClick() {
    onChatChange(""); // Call the parent function to clear the chat
    setChat(""); // Clear the local chat state
    onChatSubmit(); // Call the parent function to submit the chat
  }

  return (
    <div className="fixed bottom-0 flex flex-col py-4 bg-gray-500 rounded-2xl mb-4 mx-auto shadow-lg px-4">
      <label className="flex justify-center">
        <p className="text-white p-2 text-center m-2">You: </p>
        <input
          className="p-2 rounded-md border-2 border-[#2cc295] bg-[#0C3B2E] m-2 text-white"
          type="text"
          placeholder="Enter a chat..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={chat}
        />
        {chat && (
          <button
            className="bg-[#2cc295] text-white p-2 rounded-md hover:shadow-2xl m-4 hover:shadow-white"
            onClick={handlebuttonClick}
          >
            Send
          </button>
        )}
      </label>
      <span className="text-white p-2">
        AI is experimental and meant to assist only. Please,{" "}
        <span style={{ color: "red" }}>SPEAK</span> to someone if you need{" "}
        <span style={{ color: "red" }}>URGENT</span> help!
      </span>
    </div>
  );
};

export default Chat;
