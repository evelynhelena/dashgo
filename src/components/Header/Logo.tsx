import { Text } from "@chakra-ui/react";

export function Logo() {
    return (
        <Text
            fontSize={{sm:"2xl",md:"3xl"}}
            fontWeight="bold"
            w="64">
            dashgo
            <Text as="span" ml="1" color="pink.500">.</Text>
        </Text>
    );
}