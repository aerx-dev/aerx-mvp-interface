import { Tag , Avatar , Box } from "@chakra-ui/react";
import { TagAddButton } from "../UI/IconButton";

const MemberTag = ({...rest}) => {
    return (
        <Box {...rest}>
            <TagAddButton/>
            <Tag mt={1} bg='transparent' borderRadius="full" >
                <Avatar
                bg='transparent'
                name="Tag member 1"
                src='/images/Hello.png'
                size="2xs"
                />
                <Avatar
                bg='transparent'
                name="Tag member 1"
                src='/images/Laugh.png'
                size="2xs"
                /> 
                <Avatar
                bg='transparent'
                name="Tag member 1"
                src='/images/To-tears.png'
                size="2xs"
                />
            </Tag>
        </Box>
    )
}

export default MemberTag;



