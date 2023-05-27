import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import TokenService from '../Utils/tokenService'
import { useEffect } from 'react'

function PrivateRoute() {
	const access_token = TokenService.getAccessToken()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	useEffect(() => {
		if (!access_token) {
			navigate('/login', {
				state: {
					from: pathname,
				},
			})
		}
	}, [])

	return access_token ? <Outlet /> : <Navigate to={'/login'} />
}
export default PrivateRoute
