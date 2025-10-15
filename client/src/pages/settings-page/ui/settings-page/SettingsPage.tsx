'use client'

import { UpdateSettingsForm } from '@/features/update-settings'
import { VStack } from '@/shared/ui/Stack'

export function SettingsPage() {
	return (
		<VStack gap='40'>
			<UpdateSettingsForm />
		</VStack>
	)
}
