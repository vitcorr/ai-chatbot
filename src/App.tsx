import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

import Chat from "./Chat";
import Message from "./Message";

const ai = new GoogleGenAI({
  apiKey: "",
});

const newChat = ai.chats.create({
  model: "gemini-2.0-flash",
  history: [],
  // contents: chat,
  config: {
    systemInstruction: "Try to use emojis.",
  },
});

function App() {
  //collect the user chat input
  const [chat, setChat] = useState("");
  // send a request to the Gemini API
  const [aiReply, setAiReply] = useState("");

  async function submit() {
    const response = await newChat.sendMessage({
      message: chat,
    });
    // Log the response as it arrives
    setAiReply("");
    setAiReply(response.text || "");
    // console.log(response.text);
    // setAiReply(response.text || "");
    console.log(newChat.getHistory());
  }

  return (
    <div className="App min-h-screen flex flex-col items-center bg-[#0C3B2E]">
      <h1 className="fixed w-full flex justify-center p-4 bg-[#0C3B2E] text-white text-2xl">
        Gemini Ai Chatbot🌟
      </h1>
      <Message messages={newChat.getHistory()}></Message>
      <Chat onChatChange={setChat} onChatSubmit={submit} />
    </div>
  );
}

export default App;
