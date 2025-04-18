import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import Chat from "./Chat";
import Message from "./Message";

const ai = new GoogleGenAI({
  apiKey: "",
});

const newChat = ai.chats.create({
  model: "gemini-2.0-flash",
  history: [],
  // contents: chat,
  // config: {
  //   systemInstruction: "Keep responses short and concise.",
  // },
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
    <div className="App">
      <h1>Gemini Ai Chatbot</h1>
      Messages:
      <Message messages={newChat.getHistory()}></Message>
      <Chat onChatChange={setChat} onChatSubmit={submit} />
      {chat && <button onClick={submit}>send</button>}
    </div>
  );
}

export default App;
