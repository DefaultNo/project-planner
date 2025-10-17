import { Test, TestingModule } from '@nestjs/testing'
import { PomodoroSettingsService } from './pomodoro-settings.service'
import { PrismaService } from '../prisma.service'
import { PomodoroSettingsDTO } from './dto/pomodoro-settings.dto'

describe('PomodoroSettingsService', () => {
	let service: PomodoroSettingsService
	let prisma: any

	const mockUserId = 'user-123'
	const mockSettingsId = 'settings-456'

	const mockSettings = {
		id: mockSettingsId,
		userId: mockUserId,
		workInterval: 50,
		breakInterval: 10,
		intervalsCount: 7
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PomodoroSettingsService,
				{
					provide: PrismaService,
					useValue: {
						userPomodoroSettings: {
							findFirst: jest.fn(),
							create: jest.fn(),
							update: jest.fn()
						}
					}
				}
			]
		}).compile()

		service = module.get<PomodoroSettingsService>(PomodoroSettingsService)
		prisma = module.get<PrismaService>(PrismaService)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	// Тест 1: Створення налаштувань Pomodoro
	it('should create default pomodoro settings', async () => {
		prisma.userPomodoroSettings.create.mockResolvedValue(mockSettings)

		const result = await service.create(mockUserId)

		expect(prisma.userPomodoroSettings.create).toHaveBeenCalledWith({
			data: {
				userId: mockUserId,
				workInterval: 50,
				breakInterval: 10,
				intervalsCount: 7
			}
		})
		expect(result).toEqual(mockSettings)
	})

	// Тест 2: Оновлення налаштувань
	it('should update pomodoro settings', async () => {
		const updateDto: PomodoroSettingsDTO = {
			workInterval: 45,
			breakInterval: 15,
			intervalsCount: 8
		}
		const updatedSettings = { ...mockSettings, ...updateDto }

		prisma.userPomodoroSettings.findFirst.mockResolvedValue(mockSettings)
		prisma.userPomodoroSettings.update.mockResolvedValue(updatedSettings)

		const result = await service.update(mockUserId, updateDto)

		expect(prisma.userPomodoroSettings.findFirst).toHaveBeenCalledWith({
			where: { userId: mockUserId }
		})
		expect(prisma.userPomodoroSettings.update).toHaveBeenCalledWith({
			where: { id: mockSettingsId },
			data: updateDto
		})
		expect(result).toEqual(updatedSettings)
	})

	// Тест 3: Отримання налаштувань користувача
	it('should get settings for user', async () => {
		prisma.userPomodoroSettings.findFirst.mockResolvedValue(mockSettings)

		const result = await service.getByUserID(mockUserId)

		expect(prisma.userPomodoroSettings.findFirst).toHaveBeenCalledWith({
			where: { userId: mockUserId }
		})
		expect(result).toEqual(mockSettings)
	})

	// Тест 4: Повернення null якщо налаштування не знайдені
	it('should return null if settings not found', async () => {
		prisma.userPomodoroSettings.findFirst.mockResolvedValue(null)

		const result = await service.getByUserID('non-existent-user')

		expect(result).toBeNull()
	})

	// Тест 5: Отримання налаштувань через getPomodoroSettingsByUserId
	it('should get pomodoro settings by user id', async () => {
		prisma.userPomodoroSettings.findFirst.mockResolvedValue(mockSettings)

		const result = await service.getPomodoroSettingsByUserId(mockUserId)

		expect(prisma.userPomodoroSettings.findFirst).toHaveBeenCalledWith({
			where: { userId: mockUserId }
		})
		expect(result).toEqual(mockSettings)
	})
})

