import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Tooltip,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

export default function PlaySlider(props) {
    // const [props.convertDurationTrack(props.current), setSliderValue] = useState(0)
    const [showTooltip, setShowTooltip] = React.useState(false)
    const [hoverVal, setHoverValue] = React.useState()

    // magic function to determine position of the mouse realtive to the slider
    const hoverTimeLine = (e) => {
        setShowTooltip(true)
        const playheadWidth = e.target.offsetWidth
        const offsetWidht = e.target.offsetLeft;
        const userClickWidht = e.clientX - offsetWidht;
        const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

        const time = (props.duration * userClickWidhtInPercent) / 100;

        if ((time >= 0) && (time <= props.duration)) {
            setHoverValue(time);
        }
    }


    return (
        <Slider
            aria-label='slider-ex-6'
            defaultValue={0}
            min={0}
            max={props.duration || 100}
            onChange={(val) => props.setClickedTime(val)}
            value={(props.current)}
            onMouseMove={(val) => hoverTimeLine(val)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
                {props.convertDurationTrack(props.current) || "0:00"}
            </SliderMark>
            {props.duration &&
                <SliderMark value={props?.duration} mt='1' ml='-2.5' fontSize='sm'>
                    {props.convertDurationTrack(props.duration)}
                </SliderMark>
            }
            {
                showTooltip
                && 
                    <SliderMark
                        value={hoverVal}
                        fontSize="sm"
                        fontWeight="medium"
                        rounded="full"
                        textAlign='center'
                        bg='blue.300'
                        color='white'
                        mt='-9'
                        ml='-5'
                        w='12'
                    >
                        {props.convertDurationTrack(hoverVal)}
                    </SliderMark>
            }
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
                hasArrow
                rounded="full"
                bg='blue.300'
                color='white'
                placement='top'
                isOpen={(!showTooltip  && props.playing)}
                label={props.convertDurationTrack(props.current)}
            >
                <SliderThumb/>
            </Tooltip>
        </Slider>
    )
}
