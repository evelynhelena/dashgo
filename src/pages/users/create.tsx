import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obratória').min(6, 'No mínimo 6 caracteres'),
    passwordConfirmation: yup.string().oneOf([null, yup.ref('password')], "As senhas precisam ser iguais"),
});

export default function CreateUser() {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(CreateUserFormSchema)
    })

    const { errors } = formState;

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {

        await new Promise(resolve => setTimeout(resolve, 2000));
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

                <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={{ sm: "6", md: "8" }}>
                    <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={{ sm: "6", md: "8" }} w="100%">
                            <Input
                                name="name"
                                label="Nome Completo"
                                {...register('name')} 
                                error={errors.name}/>
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                {...register('email')} 
                                error={errors.email}/>
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={{ sm: "6", md: "8" }} w="100%">
                            <Input
                                name="password"
                                type="password"
                                label="Senha"
                                {...register('password')} 
                                error={errors.password}/>
                            <Input
                                name="passwordConfirmation"
                                type="password"
                                label="Confirmação da senha"
                                {...register('passwordConfirmation')} 
                                error={errors.passwordConfirmation}/>
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button type="submit" isLoading={formState.isSubmitting} colorScheme="pink">Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}