import { useRecoilState } from 'recoil'
import { isOnSideBar } from '../../Atoms/sideBar.atom'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Detail() {
	const params = useParams()
	const [onSideBar, setOnSideBar] = useRecoilState(isOnSideBar)

	useEffect(() => {
		setOnSideBar(false)
	}, [params])

	return (
		<>
			<div></div>
		</>
	)
}

export default Detail
