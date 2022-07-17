import {
    Box,
    Flex,
    HStack,
    Text,
    useColorModeValue,
    useClipboard,
    VStack,
} from "@chakra-ui/react";
import BalanceBar from "./balanceBar";
import { nearStore } from "../../../stores/near";
import { InterestTags } from "../../UI/Tags";
import { CopyButton } from "../../UI/IconButton";
import { SendButton, FollowButton } from "../../UI/Buttons";
import FlipButtons from "./flipButtons";
import { HEIGHT, WIDTH } from "@/utils/styles";

const styles = {
    fontFamily: "Open Sans",
    fontSize: 12,
};

const NFTCard = ({
    bg,
    profile,
    balance,
    flip,
    setToSend,
}: {
    bg: any;
    profile: any;
    balance: any;
    flip: () => void;
    setToSend: (toSend: boolean) => void;
}) => {
    const nearState = nearStore((state) => state);
    const value = nearState.accountId || "0jx12hbuwc34jc";
    const { hasCopied, onCopy } = useClipboard(value);
    console.log("balance", balance);
    const picBg = useColorModeValue("white", "gray.300");
    const bgGradient = useColorModeValue(
        "linear(#edf2f700, #edf2f720 15%, gray.100 90%)",
        "linear(#1E202100, #1E202100 15%, lightblack 90%)",
    );
    const tags = ["#crypto", "#eth", "#near", "#aerx"];

    return (
        <Flex
            className="justify-between"
            direction="column"
            minH={HEIGHT.sidebar}
            maxH={HEIGHT.sidebar}
            width={WIDTH.sidebar}
            overflowWrap="anywhere"
        >
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
                    className="z-10 absolute bottom-0 h-1/3 w-full px-2 text-white"
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
                    <ProfileTags iterType="tags" data={tags} />
                    <HStack className="bottom-0 gap-x-2 my-2">
                        <Box ml={2}>
                            <SendButton />
                        </Box>
                        <Box>
                            <FollowButton />
                        </Box>
                    </HStack>
                </Box>
            </Box>
            <HStack m={3} justifyContent="left">
                <Text> {value} </Text>
                <Box onClick={onCopy}>
                    <CopyButton />
                </Box>
            </HStack>

            <Box className="text-left px-4 mb-5" sx={styles}>
                <Text
                    className="opacity-50 mb-3 font-semibold"
                    fontSize="1.8vh"
                >
                    ABOUT
                </Text>
                <Text overflowWrap="anywhere">{profile?.aboutMe}</Text>
            </Box>
            <VStack
                bgImage="/images/balance-bg.svg"
                bgColor="#ffff0006"
                bgPos="center"
                bgSize="cover"
                bgBlendMode="darken"
                borderRadius="lg"
                w="100%"
                px={3}
                py={4}
                borderTopRadius="0"
                borderTopColor="grey"
                borderTopWidth="1px"
                spacing={2}
                alignItems={"left"}
            >
                <BalanceBar balance={balance} />
                <FlipButtons flip={flip} setToSend={setToSend} />
            </VStack>
        </Flex>
    );
};

const ProfileTags = ({
    iterType,
    data,
    ...rest
}: {
    iterType: any;
    data: any;
}) => {
    return (
        <HStack
            spacing={1}
            my={2}
            sx={styles}
            justifyContent="left"
            alignItems="center"
            w="100%"
        >
            {data.map((iter: any, idx: number) =>
                iterType === "tags" ? (
                    <InterestTags
                        key={iter + idx}
                        borderRadius={15}
                        px={1}
                        py={0.5}
                    >
                        {iter}
                    </InterestTags>
                ) : null,
            )}
        </HStack>
    );
};

export default NFTCard;
