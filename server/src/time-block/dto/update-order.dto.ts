import { IsArray, IsString } from 'class-validator'

export class UpdateOrderDTO {
	@IsArray()
	@IsString({ each: true })
	ids: string[]
}
