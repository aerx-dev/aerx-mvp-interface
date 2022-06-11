import { Box, Divider, Flex, HStack, Text, useColorModeValue, useClipboard } from "@chakra-ui/react";
import BalanceBar from "./balanceBar";
import { InterestTags } from "../../UI/Tags";
import { CopyButton, HeartIcon , NotificationIcon } from "../../UI/IconButton";
import { SendButton , FollowButton } from "../../UI/Buttons";

const styles = {
    fontFamily: "Open Sans",
    fontSize: 12,
};

const NFTCard = ({ profile, balance, ...rest }) => {
    
    const value = "0jx12hbuwc34jc" ;
    const { hasCopied, onCopy } = useClipboard(value);
    console.log(balance);
    const picBg = useColorModeValue("white", "gray.300");
    const bgGradient = useColorModeValue(
        "linear(#edf2f700, #edf2f720 15%, gray.100 90%)",
        "linear(#1E202100, #1E202100 15%, lightblack 90%)",
    );
    const tags = ["#crypto", "#eth", "#near", "#aerx"]; 

    return (
        <Box className="border-1 fixed max-h-screen " {...rest}>
            <Flex className="align-middle justify-between" direction="column" overflowWrap="anywhere">
                <Box
                    className="rounded-t-lg w-full relative "
                    height="45vh"
                    bg={picBg}
                    bgImage={profile?.profileImg || "/images/pavel.png"}
                    position="relative"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                >
                    <Box
                        className="z-10 absolute bottom-0 h-2/5 w-full px-2 text-white"
                        bgGradient={bgGradient}
                        fontFamily="Open Sans"
                    >
                        <Text
                            className="h-1/4 mb-2"
                            fontWeight="bold"
                            fontSize="2xl"
                        >
                            {profile?.fullName || "Pavel Dantsev"}
                        </Text>
                        <Text sx={styles} fontWeight="medium">
                            @{profile?.username || "pashq.aerx"}
                        </Text>
                        <ProfileTags iterType="tags" data={tags} {...rest} />
                        <HStack className="bottom-0 gap-x-2 my-2" >
                            <Box ml={2}><SendButton/></Box>
                            <Box><FollowButton /></Box>  
                        </HStack>
                        
                    </Box>
                </Box>
                <HStack m={3} justifyContent="left">
                    <Text> {value} </Text>
                    <Box onClick={onCopy}><CopyButton /></Box>
                </HStack>
                
                <Box className="text-left px-4 mb-5" sx={styles}>
                    <Text className="opacity-50 mb-3 font-semibold">ABOUT</Text>
                    <Text overflowWrap="anywhere">
                        {profile?.aboutMe}
                    </Text>
                </Box>
                <Divider />
                <BalanceBar balance={balance} />
            </Flex>
        </Box>
    );
};

const ProfileTags = ({ iterType, data, ...rest }) => {
    return (
        <HStack
            spacing={1}
            my={2}
            sx={styles}
            justifyContent="left"
            alignItems="center"
            w="100%"
        >
            {data.map((iter) =>
                iterType === "tags" ? (
                    <InterestTags
                        key={iter}
                        borderRadius={15}
                        px={1}
                        py={0.5}
                    >
                        {iter}
                    </InterestTags>
                    ) : null
                    )}
                </HStack>
            );
};

export default NFTCard;
