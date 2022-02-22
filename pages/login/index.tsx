import {FormEvent, useState} from 'react'
import {useRouter} from 'next/router'
import {gql, useApolloClient, useMutation} from '@apollo/client'
import {getErrorMessage} from '../../lib/form'
import {Routes} from "../../routes/routes";
import {Button, Divider, Heading, Input, InputGroup, InputRightElement, Spacer, Stack, VStack} from "@chakra-ui/react";

const SignInMutation = gql`
    mutation SignInMutation($email: String!, $password: String!) {
        signIn(input: { email: $email, password: $password }) {
            user {
                id
                email
            }
        }
    }
`

function LogIn() {
    const client = useApolloClient()
    const [signIn] = useMutation(SignInMutation)
    const [errorMsg, setErrorMsg] = useState()
    const router = useRouter()

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        // @ts-ignore
        const usernameElement = event.currentTarget.elements.username
        // @ts-ignore
        const passwordElement = event.currentTarget.elements.password

        try {
            await client.resetStore()
            const {data} = await signIn({
                variables: {
                    email: usernameElement.value,
                    password: passwordElement.value,
                },
            })
            if (data.signIn.user) {
                await router.push(Routes.url)
            }
        } catch (error) {
            setErrorMsg(getErrorMessage(error))
        }
    }

    return (
        <>
            <VStack height={"100vh"} justifyContent={"center"}>
                <Heading>Time Track Login</Heading>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4} shadow={"lg"} p={4} rounded={3}>
                        <Heading size={"sm"}>Username:</Heading>
                        <Input
                            name={"username"}
                            pr='4.5rem'
                            type={'login'}
                            placeholder='Login'
                        />

                        <Heading size={"sm"}>Password:</Heading>
                        <InputGroup size='md'>
                            <Input
                                name={"password"}
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        {errorMsg && <p>{errorMsg}</p>}

                        <Spacer/>
                        <Button type={"submit"}>Login</Button>
                    </Stack>
                </form>
            </VStack>
        </>
    )
}

export default LogIn
