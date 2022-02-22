import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation, useApolloClient } from '@apollo/client'
import {Routes} from "../../routes/routes";

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`

function LogOut() {
  const client = useApolloClient()
  const router = useRouter()
  const [signOut] = useMutation(SignOutMutation)

  useEffect(() => {
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push(Routes.logIn.url)
      })
    })
  }, [signOut, router, client])

  return <p>Signing out...</p>
}

export default LogOut
