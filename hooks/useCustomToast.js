// custom hook for toast
import { useToast } from "@chakra-ui/react";

export default function useCustomToast(status, description) {
    const toast = useToast();
    const toastd = 111;
    function call() {
        if (!toast.isActive(toastd)) {
            toast({
                id: toastd,
                status: status,
                description: description,
                position: "top",
                isClosable: true,
            });
        }
    }

    return call;
}
