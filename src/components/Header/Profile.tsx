import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Evelyn Helena</Text>
                <Text color="gray.300" fontSize="small">evelyn.helena1@gmail.com</Text>
            </Box>
            <Avatar size="md" name="Evelyn Helena" src="https://github.com/evelynhelena.png" />
        </Flex>
    );
}