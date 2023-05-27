import {
	Chatting_Icon,
	FreeMarket_Icon,
	Home_Icon,
	MyPage_Icon,
	TradeUsed_Icon,
} from '../Components/Icons/Icons'

export const MobileNav = [
	{
		text: '홈',
		navigation: '/',
		icon: <Home_Icon />,
	},
	{
		text: '무료',
		navigation: '/list/freeMarket',
		icon: <FreeMarket_Icon />,
	},
	{
		text: '네고',
		navigation: '/list/usedTrade',
		icon: <TradeUsed_Icon />,
	},
	{
		text: '채팅',
		navigation: '/chat인데 modal로 띄우기로 해서 흠',
		icon: <Chatting_Icon />,
	},
	{
		text: '내 정보',
		navigation: '/mypage-bank',
		icon: <MyPage_Icon />,
	},
]
