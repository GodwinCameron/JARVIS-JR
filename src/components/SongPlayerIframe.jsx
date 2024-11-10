import React, { useState } from "react";

const YouTubePlayer = ({ url }) => {
  const [videoId, setVideoId] = useState(url);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Function to update video source
  const playSong = (songId) => {
    setVideoId(songId);
  };

  return (
    <div>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}&autoplay=1&listType=playlist&shuffle=1`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
      <div
        className="vid-button"
        onClick={() => {
          if (width === 400) {
            setWidth(0);
            setHeight(0);
          } else {
            setWidth(400);
            setHeight(300);
          }
        }}
      >
        <p>&#9776;🔊</p>
      </div>
      <div className="more-options">
        <div className="option" onClick={() => playSong("dQw4w9WgXcQ?si=r_db7-P2M_J5P3XW")}>
          Request Song
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
