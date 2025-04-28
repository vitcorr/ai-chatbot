import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";

import Chat from "./Chat";
import Message from "./Message";

const ai = new GoogleGenAI({
  apiKey: "",
});

function App() {
  //collect the user chat input
  const [chat, setChat] = useState("");
  // send a request to the Gemini API
  const [aiReply, setAiReply] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("Default Normal");
  const [newChat, setChatSession] = useState(
    ai.chats.create({
      model: "gemini-2.0-flash",
      history: [],
      // contents: chat,
      config: {
        systemInstruction: "you are a " + selectedCharacter + ".",
      },
    })
  );

  useEffect(() => {
    setChatSession(
      ai.chats.create({
        model: "gemini-2.0-flash",
        history: [],
        // contents: chat,
        config: {
          systemInstruction: "you are a " + selectedCharacter + ".",
        },
      })
    );
  }, [selectedCharacter]);
  // const newChat = ai.chats.create({
  //   model: "gemini-2.0-flash",
  //   history: [],
  //   // contents: chat,
  //   config: {
  //     systemInstruction: "you are a medieval knight ",
  //   },
  // });
  const [loading, setLoading] = useState(false);
  async function submit() {
    setLoading(true);
    const response = await newChat.sendMessage({
      message: chat,
    });
    setLoading(false);
    // Log the response as it arrives
    setAiReply("");
    setAiReply(response.text || "");
    // console.log(response.text);
    // setAiReply(response.text || "");
    console.log(newChat.getHistory());
  }

  return (
    <div className="App min-h-screen flex flex-col items-center bg-[#0C3B2E] px-5">
      <h1 className="fixed w-full flex justify-center p-4 bg-[#0C3B2E] text-white text-2xl">
        Gemini Ai Chatbot🌟
      </h1>
      <div className="flex mt-20 mb-52 justify-between w-full">
        <Message messages={newChat.getHistory()}></Message>

        <div>
          <p className="text-white">Choose A Character!</p>
          <select
            name="characters"
            id="characters"
            className="bg-gray-600 rounded-2xl p-2 m-2 text-white max-h-15 hover:border-4 "
            defaultValue="Default(Normal)"
            onChange={(e) => {
              setSelectedCharacter(e.target.value);
            }}
          >
            <option value="Default(Normal)">Default (Normal)</option>
            <option value="Donald Duck">Donald Duck</option>
            <option value="Mickey Mouse">Mickey Mouse</option>
            <option value="a Medieval Knight">Knight</option>
            <option value="Therapist">Therapist</option>
            <option value="a Pirate">Pirate</option>
            <option value="a Genie">Genie</option>
            <option value="a Robot">Robot</option>
            <option value="a Vampire">Vampire</option>
            <option value="a Ghost">Ghost</option>
            <option value="a Wizard">Wizard</option>
            <option value="a Superhero">Superhero</option>
            <option value="a Detective">Detective</option>
            <option value="a Chef">Chef</option>
          </select>
        </div>
      </div>
      {loading && <div className="loader fixed bottom-40"></div>}
      <Chat onChatChange={setChat} onChatSubmit={submit} />
    </div>
  );
}

export default App;
