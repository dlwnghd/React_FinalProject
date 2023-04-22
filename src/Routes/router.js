import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Components'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: '',
			},
		],
	},
])

export default router
