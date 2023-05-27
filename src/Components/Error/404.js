import styled from 'styled-components'

function Error404() {
	return (
		<S.ErrorWrapper>
			<S.ErrorText>
				<p>404</p>
			</S.ErrorText>
			<S.Cat className="cat">
				<S.Ear_left className="ear ear--left"></S.Ear_left>
				<S.Ear_right className="ear ear--right"></S.Ear_right>
				<S.Face className="face">
					<S.Eye_left className="eye eye--left">
						<S.Eye_pupil className="eye-pupil"></S.Eye_pupil>
					</S.Eye_left>
					<S.Eye_right className="eye eye--right">
						<S.Eye_pupil className="eye-pupil"></S.Eye_pupil>
					</S.Eye_right>
					<S.Muzzle className="muzzle"></S.Muzzle>
				</S.Face>
			</S.Cat>
		</S.ErrorWrapper>
	)
}

export default Error404

const ErrorWrapper = styled.div`
	height: 80rem;
	display: grid;
	align-items: center;
	justify-content: center;
	background: #161616;
	justify-items: center;
	align-content: space-evenly;

	@media screen and (max-width: 440px) {
		height: 70rem;
	}
`

const ErrorText = styled.div`
	text-align: center;
	color: white;

	& > p {
		font-size: 25rem;

		@media screen and (max-width: 440px) {
			font-size: 25rem;
		}
	}
`

// 고양이
const Cat = styled.div`
	position: relative;
	height: 200px;
	width: 226px;

	& > .ear {
		position: absolute;
		top: -30%;
		height: 60%;
		width: 25%;
		background: #fff;

		// Ear hair
		&::before,
		&::after {
			content: '';
			position: absolute;
			bottom: 24%;
			height: 10%;
			width: 5%;
			border-radius: 50%;
			background: #161616;
		}

		&::after {
			transform-origin: 50% 100%;
		}
	}
`

// 귀
const Ear_left = styled.div`
	left: -7%;
	border-radius: 70% 30% 0% 0% / 100% 100% 0% 0%;
	transform: rotate(-15deg);

	&::before,
	&::after {
		right: 10%;
	}

	&::after {
		transform: rotate(-45deg);
	}
`
const Ear_right = styled.div`
	right: -7%;
	border-radius: 30% 70% 0% 0% / 100% 100% 0% 0%;
	transform: rotate(15deg);

	&::before,
	&::after {
		left: 10%;
	}

	&::after {
		transform: rotate(45deg);
	}
`

// 얼굴
const Face = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	background: #161616;
	border-radius: 50%;

	& > .eye {
		overflow: hidden;
		position: absolute;
		top: 35%;
		height: 30%;
		width: 31%;
		background: #fff;
		border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;

		// Eyelids
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			height: 0;
			width: 100%;
			border-radius: 0 0 50% 50% / 0 0 40% 40%;
			background: #161616;
			animation: blink 4s infinite ease-in;
		}

		@keyframes blink {
			0% {
				height: 0;
			}
			90% {
				height: 0;
			}
			92.5% {
				height: 100%;
			}
			95% {
				height: 0;
			}
			97.5% {
				height: 100%;
			}
			100% {
				height: 0;
			}
		}

		// Tips of the eyes
		&::before {
			content: '';
			position: absolute;
			top: 60%;
			height: 10%;
			width: 15%;
			background: #fff;
			border-radius: 50%;
		}
	}
`
const Eye_left = styled.div`
	left: 0;

	&::before {
		right: -5%;
	}
`
const Eye_right = styled.div`
	right: 0;

	&::before {
		left: -5%;
	}
`

// 눈동자
const Eye_pupil = styled.div`
	position: absolute;
	top: 25%;
	height: 50%;
	width: 20%;
	background: #161616;
	border-radius: 50%;
	animation: look-around 4s infinite;

	@keyframes look-around {
		0% {
			transform: translate(0);
		}
		5% {
			transform: translate(50%, -25%);
		}
		10% {
			transform: translate(50%, -25%);
		}
		15% {
			transform: translate(-100%, -25%);
		}
		20% {
			transform: translate(-100%, -25%);
		}
		25% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(0, 0);
		}
	}

	.eye--left & {
		right: 30%;
	}

	.eye--right & {
		left: 30%;
	}

	// Glare on the pupil
	&::after {
		content: '';
		position: absolute;
		top: 30%;
		right: -5%;
		height: 20%;
		width: 35%;
		border-radius: 50%;
		background: #fff;
	}
`

// 코
const Muzzle = styled.div`
	position: absolute;
	top: 60%;
	left: 50%;
	height: 6%;
	width: 10%;
	background: #fff;
	transform: translateX(-50%);
	border-radius: 50% 50% 50% 50% / 30% 30% 70% 70%;
`

const S = {
	ErrorWrapper,
	ErrorText,
	Cat,
	Ear_left,
	Ear_right,
	Face,
	Eye_left,
	Eye_right,
	Eye_pupil,
	Muzzle,
}
