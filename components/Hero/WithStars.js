import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CustomImage from "./CustomImage";

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const StarComponent = ({ top, left, radius }) => (
    <Box position="absolute" top={top} left={left}>
        <img
            src="/star.svg"
            style={{
                width: radius,
                height: radius,
            }}
        />
    </Box>
);

const WithStar = ({ children }) => {
    const positions = {
        top: [
            ["30%", "70%"],
            ["60%", "10%"],
            [100, 500],
        ],
        left: [30, ["90%", "50%"], ["95%"]],
    };

    const [stars, setStars] = useState([]);

    useEffect(() => {
        const stars = [];
        for (let i = 0; i < 6; i++) {
            stars.push({
                top: positions.top[i],
                left: positions.left[i],
                radius: getRandomArbitrary(10, 20),
            });
        }
        setStars(stars);
    }, []);

    return (
        <Box position="relative">
            {stars.map((star, i) => (
                <StarComponent
                    key={star + i}
                    top={star.top}
                    left={star.left}
                    radius={star.radius}
                />
            ))}
            {children}
        </Box>
    );
};
export default WithStar;
