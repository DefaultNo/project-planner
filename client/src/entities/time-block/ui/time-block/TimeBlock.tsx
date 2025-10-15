import { FormProvider, useForm } from 'react-hook-form'

import cls from './TimeBlock.module.scss'

import { TimeBlockFormState } from '../../model/types/time-block.types'
import { TimeBlockForm } from '../time-block-form/TimeBlockForm'
import { TimeBlockList } from '../time-blocks-list/TimeBlockList'

export const TimeBlock = () => {
	const methods = useForm<TimeBlockFormState>({
		defaultValues: {
			name: '',
			duration: 1
		}
	})
	return (
		<FormProvider {...methods}>
			<div className={cls.TimeBlock}>
				<TimeBlockForm />
				<TimeBlockList />
			</div>
		</FormProvider>
	)
}
