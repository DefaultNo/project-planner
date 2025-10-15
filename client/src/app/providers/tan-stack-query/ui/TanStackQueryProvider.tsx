'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState } from 'react'

import { queryClientConfig } from '../config/query-client.config'

export const TanStackQueryProvider = ({
	children
}: {
	children: ReactNode
}) => {
	const [client] = useState(new QueryClient(queryClientConfig))

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
