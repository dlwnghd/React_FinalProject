import {
	AiOutlineSearch,
	AiOutlineArrowRight,
	AiOutlineHeart,
	AiFillHeart,
	AiOutlineUser,
	AiFillCaretDown,
	AiFillCaretRight,
	AiFillForward,
	AiOutlinePlusCircle,
	AiOutlineMenu,
	AiOutlineShoppingCart,
	AiOutlineHome,
	AiOutlineShop,
	AiOutlineSwap,
	AiOutlineComment,
	AiOutlineReddit,
	AiOutlineCamera,
	AiOutlineExport,
	AiOutlineMore,
} from 'react-icons/ai'

export const Search_Icon = () => <AiOutlineSearch /> // 검색

export const Arrow_Icon = ({ size }) => (
	<AiOutlineArrowRight size={size ? size : 50} />
) // 슬라이드 화살표

export const NotFillHeart_Icon = ({ size, onClick }) => (
	<AiOutlineHeart size={size ? size : 50} onClick={onClick} />
) // 빈 하트
export const FillHeart_Icon = ({ size, onClick }) => (
	<AiFillHeart size={size ? size : 50} onClick={onClick} />
) // 찬 하트
export const Profile_Icon = ({ size }) => (
	<AiOutlineUser size={size ? size : 50} />
) // 프로필
export const DropdownArrow_Icon = ({ size }) => <AiFillCaretDown size={size} /> // 드롭 다운 화살표
export const PaginationArrowSingle_Icon = ({ rotate }) => (
	<AiFillCaretRight style={{ transform: `rotate(${rotate}deg)` }} />
) // 페이지네이션화살표 (>)
export const PaginationArrowDouble_Icon = ({ rotate }) => (
	<AiFillForward style={{ transform: `rotate(${rotate}deg)` }} />
) // 페이지네이션화살표 (>>)

export const AddProduct_Icon = () => <AiOutlinePlusCircle /> // 상품 등록
export const MenuBurger_Icon = ({ size, color, cursor }) => (
	<AiOutlineMenu size={size} color={color} cursor={cursor} />
) // 햄버거
export const InterestBasket_Icon = ({ size, color, cursor }) => (
	<AiOutlineShoppingCart size={size} color={color} cursor={cursor} />
) // 관심 상품
export const Camera_Icon = () => <AiOutlineCamera /> // 이미지 추가
export const ChatOut_Icon = () => <AiOutlineExport /> // 채팅방 나가기
export const EtcOption_Icon = ({ size, onClick }) => (
	<AiOutlineMore size={size ? size : 50} onClick={onClick} />
) // 기타 옵션
export const ModalClose_icon = () => <AiOutlineClose /> // 모달 닫기

// 탭바
export const Home_Icon = () => <AiOutlineHome /> // 홈
export const FreeMarket_Icon = () => <AiOutlineShop /> // 프리마켓
export const TradeUsed_Icon = () => <AiOutlineSwap /> // 트레이드 유즈
export const Chatting_Icon = () => <AiOutlineComment /> // 채팅
export const MyPage_Icon = () => <AiOutlineReddit /> // 마이 페이지
