import { Navigate, Outlet } from 'react-router-dom'
import TokenService from '../Utils/tokenService'

function PrivateRoute() {
	const access_token = TokenService.getAccessToken()

	return access_token ? <Outlet /> : <Navigate to={'/login'} />
}
export default PrivateRoute
