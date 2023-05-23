import * as ProductApi from './Product/product.api'
import * as UserApi from './User/user.api'
import * as MypageApi from './MyPage/mypage.api'

export const handler = [
	...Object.values(ProductApi),
	...Object.values(UserApi),
	...Object.values(MypageApi),
]
