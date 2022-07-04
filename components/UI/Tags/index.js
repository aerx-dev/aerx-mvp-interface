import { Tag, Avatar } from "@chakra-ui/react";

export const InterestTags = ({ children, ...rest }) => {
    return (
        <Tag
            size="xs"
            variant="solid"
            as="i"
            bg="transparent"
            color="invert(bg)"
            {...rest}
        >
            {children}
        </Tag>
    );
};
