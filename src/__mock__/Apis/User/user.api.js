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
				token: Math.floor(Math.random() * 100000),
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
