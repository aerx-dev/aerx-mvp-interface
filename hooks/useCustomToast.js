// custom hook for toast
import { useToast } from "@chakra-ui/react";

export default function useCustomToast(status, description, toastId) {
    const toast = useToast();
    function call() {
        if (!toast.isActive(toastId)) {
            toast({
                id: toastId,
                duration: 3000,
                status: status,
                description: description,
                position: "bottom",
                // isClosable: true,
            });
        }
    }

    return call;
}
