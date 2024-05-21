import React from "react";

interface Beat {
  img: string;
  title: string;
  genre: string;
  date: string;
}

interface BeatItemProps {
  beats: Beat[];
}

const BeatItem: React.FC<BeatItemProps> = ({ beats }) => {
  return (
    <ul>
      {beats.map((beat, index) => (
        <li key={index}>
          <img src={beat.img} alt={`Beat ${index}`} />
          <h4>{beat.title}</h4>
          <p>Genre: {beat.genre}</p>
          <p>Date: {beat.date}</p>
        </li>
      ))}
    </ul>
  );
}

export default BeatItem;
