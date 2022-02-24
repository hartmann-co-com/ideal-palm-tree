import {useEffect} from 'react'
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import {gql, useQuery} from '@apollo/client'
import {Link, Stack, Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {Routes} from "../../routes/routes";

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
    const {data, loading, error} = useQuery(ViewerQuery)
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
        const tracks = [
            {
                date: new Date(),
                start: new Date('2022-02-23T17:00:09+0000'),
                type: 'BREAK',
                end: new Date('2022-02-23T17:26:09+0000'),
                amount: null
            },
            {
                date: new Date(),
                start: new Date('2022-02-23T16:00:09+0000'),
                type: 'STOP',
                end: new Date('2022-02-23T16:26:09+0000'),
                amount: null
            }
        ]

        return (
            <>
                <Stack>
                    <Text>{new Date().toLocaleString()}</Text>
                    <Table>
                        <Thead>
                            <Tr>
                                {/*<Th>Date</Th>*/}
                                <Th>Start</Th>
                                <Th>End</Th>
                                <Th>Type</Th>
                                <Th>Amount</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {tracks.map(track => <Tr>
                                {/*<Td>{track.date.toLocaleString()}</Td>*/}
                                <Td>{track.start.toLocaleString()}</Td>
                                <Td>{track.end.toLocaleString()}</Td>
                                <Td>{track.type}</Td>
                                <Td>{track.amount}</Td>
                            </Tr>)}
                        </Tbody>
                    </Table>
                </Stack>
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
            </>
        )
    }

    return <p>Loading...</p>
}

export default Index
