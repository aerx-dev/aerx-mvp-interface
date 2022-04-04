
import PlayButton from "./playButton";
import React, { useEffect, useState, useMemo } from "react";
import {
    Avatar,
    Box,
    Grid,
    GridItem,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react"
import useAudioPlayer from "../../hooks/useAudio";
import PlaySlider from "./playSlider";
import { SpinnerIcon } from "@chakra-ui/icons";


const SongCard = (props) => {

    const url = props.url
    const [loading, setLoading] = useState(true)
    const [audio] = useState(new Audio(url));
    const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer(audio);

    // Check when the file has loaded
    useEffect(() => {
        audio.addEventListener("canplay", () => setLoading(false))
        return () => {
            audio.removeEventListener("canplay", () => setLoading(false))
        }
    }, [audio])

    const bg = useColorModeValue("#aac3dc", "#393e55");

    function convertDurationTrack(raw_duration) {
        let duration = parseInt(raw_duration)
        let minutes = Math.floor(duration / 60);
        let seconds = duration - minutes * 60;
        if (seconds.toString().length === 1) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    return (
        <Box
            flexDirection="row"
            display="flex"
            alignItems="center"
            bg={bg}
            px={4}
            py={4}
            borderRadius="full"
            className="shadow-xl"
        >
            {props.cover && <Avatar
                mr={3}
                size="xl"
                src={props.cover}
                alt={props.title}
                bg={bg}
                className="shadow-sm ring-2 ring-gray-600 hover:ring"
            />}
            <Stack >
                <Box className="drop-shadow-lg font-black uppercase">
                    {props.title}
                </Box >
                <Box className="drop-shadow-lg capitalize ">
                    {props.artist}
                </Box >
            </Stack>
            <Box
                className="ml-2 mr-3"
            >
                {loading ? <SpinnerIcon className="animate-spin h-6 w-6" />
                    : <PlayButton
                        playing={playing}
                        setPlaying={setPlaying}
                    />}
            </Box>
            <Box
                className="w-full ml-2 mr-6"
            >
               {!loading && <PlaySlider
                    current={curTime}
                    duration={duration}
                    playing={playing}
                    setClickedTime={setClickedTime}
                    convertDurationTrack={convertDurationTrack}
                />}
            </Box>
        </Box >
    );
};

export default SongCard;