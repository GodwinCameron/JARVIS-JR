export const JarvisMessageComponent = ({ message }) => {

    const parts = message.split("```");
    let transformedMessage = "";
  
    parts.forEach((part, index) => {
      if (index % 2 === 0) {
        // If it's normal text, escape HTML characters
        transformedMessage += part.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      } else {
        // If it's code, wrap in <code> tags without escaping
        transformedMessage += `<code>${part}</code>`;
      }
    });
  
    return (
      <>
        <div className="chat-systemText">
          &#47;&#47;&#47; &#61; &#62; Conversation transcription:
        </div>
        <div
          className="chat-jarvisText"
          dangerouslySetInnerHTML={{ __html: transformedMessage }}
        />
      </>
    );
  };
  