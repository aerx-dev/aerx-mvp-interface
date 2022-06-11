import { Box, VStack, Icon, Heading, Text, HStack } from "@chakra-ui/react";
import { ReceiveIconButton, SendIconButton} from "../../UI/Buttons";
import {ThunderboltFilled} from "@ant-design/icons";

const BalanceBar = ({ balance, ...rest }) => {
    return (
        <Box
            bgImage="/images/balance-bg.svg"
            bgColor="#ffff0006"
            bgPos="center"
            bgSize="cover"
            bgBlendMode="darken"
            borderRadius="lg"
            w="100%"
            py={3}
			borderTopRadius	="0"
			borderTopColor="grey"
			borderTopWidth="1px"
			
            >
            <VStack
               className="content-align-left px-4" 
			   align="baseline"
			   fontSize="2.5vh"
            >   
                <Text className="font-semibold" >Your Balance</Text>
                <HStack>
                    <Icon color="yellow" as={ThunderboltFilled} />
                    <Heading size="md" fontSize="2.5vh">{balance || 0}</Heading>
                </HStack>
                <HStack>
                    <SendIconButton />
                    <ReceiveIconButton />
                </HStack>
            </VStack>
        </Box>
    );
};

export default BalanceBar;
