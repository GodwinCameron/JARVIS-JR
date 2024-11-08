export const UserMessageComponent = ({message}) => {
  return (
    <>
      <div className="chat-systemText">
        &#47;&#47;&#47; &#61; &#62; Conversation transcription:
      </div>
      <div className="chat-userText">
        &#62; {message}
      </div>
    </>
  );
};
