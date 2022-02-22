import {FormEvent, useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import Field from '../components/field'
import {Button, Divider, Heading, Input, InputGroup, InputRightElement, Spacer, Stack, VStack} from "@chakra-ui/react";

const SignUpMutation = gql`
  mutation SignUpMutation($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`

function SignUp() {
  const [signUp] = useMutation(SignUpMutation)
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
      await signUp({
        variables: {
          email: usernameElement.value,
          password: passwordElement.value,
        },
      })

      router.push('/login')
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
            <Button type={"submit"}>Register</Button>
          </Stack>
        </form>
      </VStack>
    </>
  )
}

export default SignUp
