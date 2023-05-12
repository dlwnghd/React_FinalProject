import {
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
	AiOutlineClose,
	AiOutlineRollback,
	AiOutlineReddit,
	AiOutlineCamera,
	AiOutlineExport,
	AiOutlineMore,
	AiFillShopping,
	AiOutlineDollarCircle,
	AiOutlineFund,
	AiOutlineDown,
	AiFillSignal,
} from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'

export const Search_Icon = ({ color, position }) => (
	<CiSearch color={color} position={position} />
) // 검색

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

export const AddProduct_Icon = ({ size, color }) => (
	<AiOutlinePlusCircle size={size} color={color} />
) // 상품 등록
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
export const ModalClose_icon = ({ size }) => <AiOutlineClose size={size} /> // 모달 닫기

export const RollBack_icon = ({ size, color, cursor }) => (
	<AiOutlineRollback size={size} color={color} cursor={cursor} />
) // 뒤로 가기

// 구매 물품
export const Shopping_Icon = ({ size, color }) => (
	<AiFillShopping size={size} color={color} />
)
// 판매 물품
export const Dollar_Icon = ({ size, color }) => (
	<AiOutlineDollarCircle size={size} color={color} />
)
// 통계 아이콘
export const Total_Icon = ({ size, color }) => (
	<AiOutlineFund size={size} color={color} />
)
// 아래 꼬리없는 arrow
export const Down_Icon = ({ size, color }) => (
	<AiOutlineDown size={size} color={color} />
)
export const RecentPrice_Icon = () => <AiFillSignal /> // 최근 시세동향

// 탭바
export const Home_Icon = () => <AiOutlineHome /> // 홈
export const FreeMarket_Icon = () => <AiOutlineShop /> // 프리마켓
export const TradeUsed_Icon = () => <AiOutlineSwap /> // 트레이드 유즈
export const Chatting_Icon = () => <AiOutlineComment /> // 채팅
export const MyPage_Icon = () => <AiOutlineReddit /> // 마이 페이지
