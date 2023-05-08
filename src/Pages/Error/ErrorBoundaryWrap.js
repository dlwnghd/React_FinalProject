import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallback'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'

function ErrorBoundaryWrap({ children }) {
	const { reset } = useQueryErrorResetBoundary()
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
			{children}
		</ErrorBoundary>
	)
}
export default ErrorBoundaryWrap
