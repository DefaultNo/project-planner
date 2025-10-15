import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'
import { CookieOptions } from 'express-serve-static-core'
import { UserService } from 'src/user/user.service'
import { AuthDto } from 'src/auth/dto/auth.dto'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private jwt: JwtService,
		private userService: UserService
	) {}

	private issueTokens(userId: string) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)

		if (!user) throw new NotFoundException('User not found')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid email or password')

		return user
	}

	private getCookieOptions(expiresIn: Date): CookieOptions {
		return {
			httpOnly: true,
			domain: 'localhost',
			expires: expiresIn,
			secure: true,
			sameSite: 'none'
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid Refresh token')

		const { password, ...user } = await this.userService.getByID(result.id)
		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async login(dto: AuthDto) {
		const { password, ...user } = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const existedUser = await this.userService.getByEmail(dto.email)

		if (existedUser) throw new BadRequestException('User already exists')

		const user = await this.userService.create(dto)
		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(
			this.REFRESH_TOKEN_NAME,
			refreshToken,
			this.getCookieOptions(expiresIn)
		)
	}

	removeRefreshTokenToResponse(res: Response) {
		const expiresIn = new Date(0)

		res.cookie(this.REFRESH_TOKEN_NAME, '', this.getCookieOptions(expiresIn))
	}
}
