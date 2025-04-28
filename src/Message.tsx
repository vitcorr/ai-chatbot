import { Content } from "@google/genai";
import ReactMarkdown from "react-markdown";

//props for the Message component
type MessageProps = {
  messages: Content[];
};

const Message = ({ messages }: MessageProps) => {
  return (
    <div className="flex flex-col bg-[#707d7d] rounded-2xl p-2 w-[50%] ml-[24%]">
      <h2 className="text-2xl text-white text-center m-2">Messages</h2>

      {messages.map((item, index) =>
        item.role == "user" ? (
          <div className="flex max-w-full items-end" key={index}>
            <p className="m-2 p-2 items-center justify-center text-white">
              You:
            </p>
            <div className=" m-2 bg-[#00df81] px-4 py-2 rounded-2xl">
              <ReactMarkdown>{item.parts && item.parts[0].text}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="flex" key={index}>
            <p className="m-2 p-2 items-center justify-center text-white">
              AI:
            </p>
            <div className="m-2 bg-[#aacbc4] px-4 py-2 rounded-2xl">
              <ReactMarkdown>{item.parts && item.parts[0].text}</ReactMarkdown>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Message;
