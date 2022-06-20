import { useRouter } from 'next/router'
import Search from "../components/Search";
import { Box } from "@chakra-ui/react";

const SearchPage = () => {
    const { query } = useRouter();
    return (
        <Box>
            <Search searched={query.id} />
        </Box>
    );
};

export default SearchPage;
