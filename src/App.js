import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import GlobalStyles from './Styles/global'

import theme from './Styles/theme'
import router from './Routes/router'

import { RecoilRoot } from 'recoil'

import { worker } from './__mock__/browser'

function App() {
	worker.start()

	return (
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<RouterProvider router={router} />
			</ThemeProvider>
		</RecoilRoot>
	)
}

export default App
