import { Button } from "@chakra-ui/react";
import React from "react";

export default function PurpleButton({ children, ...rest }) {
    return (
        <Button
            borderRadius={20}
            bgColor="#6054F0"
            size="sm"
            position="absolute"
            {...rest}
        >
            {children}
        </Button>
    );
}
