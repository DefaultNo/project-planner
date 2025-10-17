import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'

jest.mock('argon2', () => ({
	verify: jest.fn()
}))

describe('AuthService', () => {
	let service: AuthService
	let userService: any
	let jwtService: any

	const mockUser = {
		id: 'user-123',
		email: 'test@example.com',
		password: 'hashed_password',
		name: 'Test User',
		createdAt: new Date(),
		updatedAt: new Date()
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UserService,
					useValue: {
						getByEmail: jest.fn(),
						getByID: jest.fn(),
						create: jest.fn()
					}
				},
				{
					provide: JwtService,
					useValue: {
						sign: jest.fn().mockReturnValue('mock-token'),
						verifyAsync: jest.fn()
					}
				}
			]
		}).compile()

		service = module.get<AuthService>(AuthService)
		userService = module.get<UserService>(UserService)
		jwtService = module.get<JwtService>(JwtService)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	// Тест 1: Реєстрація нового користувача
	it('should register a new user', async () => {
		const registerDto: AuthDto = {
			email: 'new@example.com',
			password: 'password123'
		}

		userService.getByEmail.mockResolvedValue(null)
		userService.create.mockResolvedValue(mockUser)

		const result = await service.register(registerDto)

		expect(userService.getByEmail).toHaveBeenCalledWith(registerDto.email)
		expect(userService.create).toHaveBeenCalledWith(registerDto)
		expect(result).toHaveProperty('user')
		expect(result).toHaveProperty('accessToken')
		expect(result).toHaveProperty('refreshToken')
	})

	// Тест 2: Реєстрація з існуючим email 
	it('should throw error when user already exists', async () => {
		const registerDto: AuthDto = {
			email: 'existing@example.com',
			password: 'password123'
		}

		userService.getByEmail.mockResolvedValue(mockUser)

		await expect(service.register(registerDto)).rejects.toThrow(
			BadRequestException
		)
		await expect(service.register(registerDto)).rejects.toThrow(
			'User already exists'
		)
	})

	// Тест 3: Успішний вхід
	it('should login user with correct credentials', async () => {
		const loginDto: AuthDto = {
			email: 'test@example.com',
			password: 'password123'
		}

		userService.getByEmail.mockResolvedValue(mockUser)
		;(verify as jest.Mock).mockResolvedValue(true)

		const result = await service.login(loginDto)

		expect(userService.getByEmail).toHaveBeenCalledWith(loginDto.email)
		expect(verify).toHaveBeenCalledWith(mockUser.password, loginDto.password)
		expect(result).toHaveProperty('user')
		expect(result).toHaveProperty('accessToken')
		expect(result).toHaveProperty('refreshToken')
	})

	// Тест 4: Невірний пароль
	it('should throw error with incorrect password', async () => {
		const loginDto: AuthDto = {
			email: 'test@example.com',
			password: 'wrongpassword'
		}

		userService.getByEmail.mockResolvedValue(mockUser)
		;(verify as jest.Mock).mockResolvedValue(false)

		await expect(service.login(loginDto)).rejects.toThrow(
			UnauthorizedException
		)
		await expect(service.login(loginDto)).rejects.toThrow(
			'Invalid email or password'
		)
	})

	// Тест 5: Користувач не знайдений
	it('should throw error when user not found', async () => {
		const loginDto: AuthDto = {
			email: 'notfound@example.com',
			password: 'password123'
		}

		userService.getByEmail.mockResolvedValue(null)

		await expect(service.login(loginDto)).rejects.toThrow(NotFoundException)
		await expect(service.login(loginDto)).rejects.toThrow('User not found')
	})
})

