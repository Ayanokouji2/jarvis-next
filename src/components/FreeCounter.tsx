import {useEffect, useState} from 'react'
import {Card, CardContent} from './ui/card'
import {MAX_FREE_TIER} from '@/constant'
import {Progress} from '@/components/ui/progress'
import {Button} from '@/components/ui/button'

import {Zap} from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'

interface FreeCounterProps {
	apiLimit: number
	isPro : boolean
}
export default function FreeCounter({apiLimit = 0, isPro = false}: FreeCounterProps) {
	const [mounted, setMounted] = useState(false)
	const proModal = useProModal()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	if (isPro) {
		return null
	}
	
	return (
		<div className='px-3'>
			<Card className='bg-white/10 border-0'>
				<CardContent className='py-6 '>
					<div className='text-center text-sm text-white mb-4 space-y-2'>
						<p>
							{apiLimit} / {MAX_FREE_TIER} Free Generations
						</p>
						<Progress
							className='h-3'
							value={(apiLimit / MAX_FREE_TIER) * 100}
							max={MAX_FREE_TIER}
						/>
					</div>
					<Button className='w-full' variant={'premium'} onClick={proModal.onOpen}>
						Upgrade to Pro{' '}
						<Zap className='h-4 w-4 fill-white ml-2' />
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
