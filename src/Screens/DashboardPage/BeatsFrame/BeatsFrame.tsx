import React, { useEffect, useState } from "react";
import BeatItem from "../../../components/BeatItems/BeatItem";
import UserSingleton from "../../../Model/UserSingleton"; // Asegúrate de importar correctamente UserSingleton

interface Beat {
  img: string;
  title: string;
  genre: string;
  date: string;
}

const ListBeat: React.FC = () => {
  const [beats, setBeats] = useState<Beat[]>([]);

  useEffect(() => {
    async function fetchBeats() {
      try {
        const user = UserSingleton.getInstance();
        const username = user.getUsername();
        const response = await fetch(`http://217.182.70.161:6969/v1/api/posts/user/${username}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBeats(data);
      } catch (error) {
        console.error("Failed to fetch beats:", error);
      }
    }

    fetchBeats();
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez después del primer renderizado

  return (
    <div>
      <h1>Beats List</h1>
      <BeatItem beats={beats} />
    </div>
  );
}

export default ListBeat;
