import { Content } from "@google/genai";
import ReactMarkdown from "react-markdown";

//props for the Message component
type MessageProps = {
  messages: Content[];
};

const Message = ({ messages }: MessageProps) => {
  return (
    <div>
      {messages.map((item) => (
        <p>
          <ReactMarkdown>
            {(item.role == "user" ? "YOU: " : "AI: ") +
              (item.parts && item.parts[0].text)}
          </ReactMarkdown>
          <hr />
        </p>
      ))}
    </div>
  );
};

export default Message;
