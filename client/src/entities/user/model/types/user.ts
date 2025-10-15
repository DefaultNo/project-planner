export interface IUser {
	id: number
	name?: string
	email: string
}

export interface IProfileResponse {
	user: IUser
	statistics: Array<{
		label: string
		value: string
	}>
}

export type UserForm = Omit<IUser, 'id'> & {
	password?: string
}
