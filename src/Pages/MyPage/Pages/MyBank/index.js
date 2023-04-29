import styled from 'styled-components'
import Button from '../../../../Components/Button/Button'
import Input from '../../../../Components/Input/Input'
import { useRecoilState } from 'recoil'
import { isOpenModalAtom } from '../../../../Atoms/modal.atom'
import Modal from '../../../../Components/Modal/Modal'

function MyBank() {
	const [isOpenModal, setIsOpenModal] = useRecoilState(isOpenModalAtom)
	return (
		<>
			<Wrapper>
				<Button size={'full'}>회원가입</Button>
				<Input />
				<button onClick={() => setIsOpenModal(true)}>열기</button>
				{isOpenModal && (
					<Modal size={'extra'}>
						<div>모달입니다</div>
					</Modal>
				)}
			</Wrapper>
		</>
	)
}

export default MyBank

const Wrapper = styled.div`
	width: 50%;
	margin: 0 auto;
`
