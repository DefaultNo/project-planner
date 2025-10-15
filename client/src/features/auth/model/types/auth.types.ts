import { IUser } from '@/entities/user'

export interface IAuthForm {
	email: string
	password: string
}

export interface IAuthResponse {
	user: IUser
	accessToken?: string
}
