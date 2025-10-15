import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TimeBlockService } from './time-block.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TimeBlockDTO } from 'src/time-block/dto/time-block.dto'
import { UpdateOrderDTO } from 'src/time-block/dto/update-order.dto'

@Controller('user/time-block')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') id: string) {
		return this.timeBlockService.getAll(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string, @Body() dto: TimeBlockDTO) {
		return this.timeBlockService.create(userId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update-order')
	@Auth()
	async updateOrder(@Body() updateOrderDTO: UpdateOrderDTO) {
		return this.timeBlockService.updateOrder(updateOrderDTO.ids)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@CurrentUser('id') userId: string,
		@Body() dto: Partial<TimeBlockDTO>,
		@Param('id') id: string
	) {
		return this.timeBlockService.update(userId, id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
		return this.timeBlockService.delete(userId, id)
	}
}
