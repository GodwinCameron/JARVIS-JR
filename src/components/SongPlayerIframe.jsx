import React, { useState } from "react";

const YouTubePlayer = () => {
  const [videoId, setVideoId] = useState("initialVideoId");

  // Function to update video source
  const playSong = (songId) => {
    setVideoId(songId);
  };

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <div className="more-options">
        <div className="option" onClick={() => playSong("newVideoId")}>
          Request Song
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
