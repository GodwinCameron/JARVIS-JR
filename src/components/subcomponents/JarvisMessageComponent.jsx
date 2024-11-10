import { useEffect, useState } from "react";

export const JarvisMessageComponent = ({ message, time, turboMode }) => {

  const [formattedDateTime, setFormattedDateTime] = useState("");

  // Wrap content between the first and second triple backticks in <code> tags
  const transformedMessage = message.replace(/```([\s\S]*?)```/g, (match, codeContent) => {
    // Escape < and > characters inside codeContent only
    const escapedCode = codeContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<code>${escapedCode}</code>`;
  });

  useEffect(() => {
    const dateTime = time ? new Date(time) : new Date();
    const optionsDateTime = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    setFormattedDateTime(dateTime.toLocaleString("en-US", optionsDateTime));
  }, [time]);

  return (
    <>
      <div className="chat-systemText">
        &#47;&#47;&#47; &#61; &#62; {formattedDateTime} Conversation transcription:
      </div>
      <div
        className="chat-jarvisText"
        style={turboMode ? { color: "#FF4D00" } : undefined}
        dangerouslySetInnerHTML={{ __html: turboMode ? `Turbo Response: ${transformedMessage}` : transformedMessage }}
      />
    </>
  );
};
