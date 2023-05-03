import { rest } from 'msw'
import userMock from '../../Data/User/user.data'

export const userLogin = rest.post('/api/user/login', async (req, res, ctx) => {
	const { email, pw } = req.body

	console.log(email, pw)

	const findUser = userMock.find(user => user.email === email && user.pw === pw)

	if (findUser) {
		// 로그인 성공
		return res(
			ctx.status(200),
			ctx.json({
				userInfo: findUser,
				token: 11111,
				refresh: Math.floor(Math.random() * 100000),
			}),
		)
	}

	if (userMock.some(user => user.email === email)) {
		// 아이디 혹은 비밀번호가 올바르지 않습니다.
		return res(
			ctx.status(401),
			ctx.json({ message: '아이디 혹은 비밀번호가 올바르지 않습니다.' }),
		)
	}

	// 가입되지 않은 회원입니다.
	return res(
		ctx.status(401),
		ctx.json({ message: '가입되지 않은 회원입니다.' }),
	)
})

export const getUserInfo = rest.get('/api/user', async (req, res, ctx) => {
	const access_token = req.headers.get('Authorization').split(' ')[1]
	const target_user = userMock.find(user => user.token === access_token)

	return res(
		ctx.status(200),
		ctx.json({
			profile_img: target_user.profile_img,
			email: target_user.email,
			nickName: target_user.nickName,
			phone: target_user.phone,
			region: target_user.region,
		}),
	)
})

export const updateUserInfo = rest.post('/api/user', async (req, res, ctx) => {
	const access_token = req.headers.get('Authorization').split(' ')[1]
	const data = req.body
	const target_user = userMock.find(user => user.token === access_token)

	target_user.profile_img = data.profile_img
	target_user.nickName = data.nickName
	target_user.region = data.region
	target_user.phone = data.phone

	return res(
		ctx.status(200),
		ctx.json({ message: '회원정보 수정이 완료되었습니다.' }),
	)
})
