import React, { useEffect, useState, useMemo } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { Box, Icon, IconButton } from '@chakra-ui/react'
import { PlayCircleOutlined } from "@ant-design/icons";
import { ArrowRightIcon, ArrowUpDownIcon, SpinnerIcon } from "@chakra-ui/icons";

const PlayButton = ({ playing, setPlaying }) => {
  
  // const audio = useMemo(() => new Audio(url), [url]);
  // const [loading, setLoading] = useState(true)
  // const [playing, setPlaying] = useState(false);
  
  const toggle = () => setPlaying(!playing);
  

  return (
    <Box>
      
        < IconButton
        rounded="full"
          icon={!playing ? <FaPlay className="h-full ml-1"/> : <FaPause className="h-full"/>}
          onClick={toggle}
        >
        </IconButton>
    </Box >
  );
};

export default PlayButton;

