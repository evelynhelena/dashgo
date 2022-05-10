import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiRefreshLine } from "react-icons/ri";
import { useQuery } from 'react-query';
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error, refetch } = useUsers(page);
    console.log(data?.totalCount)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })
    
    async function handlePrefetUser(userId:string){
        await queryClient.prefetchQuery(['user',userId], async () => {
            const response = await api.get(`users/${userId}`);

            return response.data;
        },{
            staleTime: 1000 * 60 * 10, // 10 minutos
        })
    }

    return (
        <Box>
            <Header />
            <Flex
                width="100%"
                my="6"
                maxWidth={1480}
                mx="auto"
                px="6"
            >
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários

                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>
                        <Flex justify="center">
                            <Button
                                size="sm"
                                colorScheme="pink"
                                cursor="pointer"
                                onClick={() => refetch()}
                                mr="3"
                            >
                                <Icon as={RiRefreshLine} fontSize="20" />
                            </Button>
                            <NextLink href="/users/create" passHref>
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="pink"
                                    leftIcon={<Icon
                                        as={RiAddLine} fontSize="20" />
                                    }
                                    cursor="pointer"
                                >
                                    Criar Novo
                                </Button>
                            </NextLink>
                        </Flex>

                    </Flex>
                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={{ sm: "4", md: "4", lg: "6" }} color="gray.300" width="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuário</Th>
                                        {isWideVersion && <Th>Data de Cadastro</Th>}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.users.map(user => {
                                        return (
                                            <Tr key={user.id}>
                                                <Td px={{ sm: "4", md: "4", lg: "6" }}>
                                                    <Checkbox colorScheme="pink" />
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Link color="purple.400" onMouseEnter={() => handlePrefetUser(user.id)}>
                                                            <Text fontWeight="bold">{user.name}</Text>
                                                        </Link>
                                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                {isWideVersion && <Td>{user.createdAt}</Td>}

                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </>
                    )}
                    <Pagination totalCountOfRegisters={data?.totalCount} currentPage={page} onPageChange={setPage} />
                </Box>
            </Flex>
        </Box>
    );
}