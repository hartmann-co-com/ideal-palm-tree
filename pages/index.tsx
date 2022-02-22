import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { gql, useQuery } from '@apollo/client'
import {Link} from "@chakra-ui/react";
import {Routes} from "../routes/routes";

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`

const Index = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(ViewerQuery)
  const viewer = data?.viewer
  const shouldRedirect = !(loading || error || viewer)

  useEffect(() => {
    if (shouldRedirect) {
      router.push(Routes.logIn.url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect])

  if (error) {
    return <p>{error.message}</p>
  }

  if (viewer) {
    return (
      <div>
        You're signed in as {viewer.email} goto{' '}
        <NextLink href="/about" passHref>
          <Link>About</Link>
        </NextLink>{' '}
        page. or{' '}
        <NextLink href="/logout" passHref>
          <Link>logout</Link>
        </NextLink>
      </div>
    )
  }

  return <p>Loading...</p>
}

export default Index
