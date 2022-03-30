import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { Icon } from '@chakra-ui/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayButton = ({ url }) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  });

  return (
    <Icon
      as={playing ? FaPause : FaPlay}
      onClick={toggle}
    />
  );
};

export default PlayButton;

