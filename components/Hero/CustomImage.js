import NextImage from "next/image";
// import styled from "@emotion/styled";
// import { motion } from "framer-motion";

// const ImageContainer = styled(motion.div)`
//   width: ${({ width }) => (width ? width + "px" : "100%")};
//   > span {
//     position: unset !important;
//   }
//   img {
//     object-fit: cover;
//     width: 100% !important;
//     position: relative !important;
//     height: unset !important;
//   }
// `;

const CustomImage = ({
    width,
    maxWidth,
    initial,
    animate,
    onAnimationComplete,
    layoutId,
    ...rest
}) => {
    return (
        <
            // width={width}
            // initial={initial}
            // animate={animate}
            // onAnimationComplete={onAnimationComplete}
            // layoutId={layoutId}
        >
            <NextImage layout="fill" {...rest} />
        </>
    );
};

// Next js has a good image optimization but we don't have the flexible stylings.
// The default instrinsic layout is good for optimization but we need to provide both width and height. And we can't use % for the values too

export default CustomImage;
