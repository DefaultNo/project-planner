import {
	Body,
	Controller,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDTO } from 'src/user/dto/user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('')
	@Auth()
	async user(@CurrentUser('id') id: string) {
		return this.userService.getUserWithStatistics(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update')
	@Auth()
	async updateUser(@CurrentUser('id') id: string, @Body() dto: UserDTO) {
		return this.userService.update(id, dto)
	}
}
