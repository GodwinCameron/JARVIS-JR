import { useEffect, useState } from "react";

export const UserMessageComponent = ({message, time}) => {
    const [formattedDateTime, setFormattedDateTime] = useState("");

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
      }, []);


  return (
    <>
      <div className="chat-systemText">
        &#47;&#47;&#47; &#61; &#62; {formattedDateTime} User Input transcription:
      </div>
      <div className="chat-userText">
        &#62; {message}
      </div>
    </>
  );
};
