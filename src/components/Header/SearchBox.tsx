import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
    const [search, setSearch] = useState(""); //Controled component

    const searchInputRef = useRef<HTMLInputElement>(null); //Uncontroled components

    
    const teste = function(){
        console.log(searchInputRef.current.value);
    }

    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxWidth={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="gray.800"
            borderRadius="full">
            <Input
                color="gray.50"
                variant="unstyled"
                placeholder="Buscar na Plataforma"
                _placeholder={{
                    color:
                        'gray.400'
                }}
                px="4"
                mr="4"
                /* value={search}
                onChange={({target}) => setSearch(target.value)} */
                ref={searchInputRef}
            />
            <Icon as={RiSearchLine} onClick={teste} fontSize="20" />
        </Flex>
    );
}