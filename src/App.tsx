import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import Chat from "./Chat";

const client = new GoogleGenAI({
  apiKey: "",
});

function App() {
  //collect the user chat input
  const [chat, setChat] = useState("");
  // send a request to the Gemini API
  const [aiReply, setAiReply] = useState("");

  async function submit() {
    const response = await client.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: chat,
      // config: {
      //   systemInstruction: "Keep responses short and concise.",
      // },
    });

    // Log the response as it arrives
    setAiReply("");
    for await (const chunk of response) {
      //console.log(chunk);
      setAiReply((prev) => prev + chunk.text);
    }
    // console.log(response.text);
    // setAiReply(response.text || "");
  }

  return (
    <div className="App">
      <h1>Gemini Ai Chatbot</h1>

      <Chat onChatChange={setChat} onChatSubmit={submit} />

      {chat && <button onClick={submit}>send</button>}

      <div>
        <h2>Bot: </h2>
        <ReactMarkdown>{aiReply}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
