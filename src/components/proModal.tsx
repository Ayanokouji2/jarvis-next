'use client'

import {
	Check,
	Code2,
	Image,
	MessageCircle,
	Music4,
	Video,
	Zap,
} from 'lucide-react'

const tools = [
	{
		label: 'Conversation',
		icon: MessageCircle,
		color: 'text-violet-500',
		bgColor: 'bg-violet-500/10',
		href: '/conversation',
	},
	{
		label: 'Image Generation',
		icon: Image,
		color: 'text-pink-700',
		bgColor: 'bg-pink-700/10',
		href: '/image',
	},
	{
		label: 'Music Generation',
		icon: Music4,
		color: 'text-emerald-500',
		bgColor: 'bg-emerald-500/10',
		href: '/music',
	},
	{
		label: 'Video Generation',
		icon: Video,
		color: 'text-orange-700',
		bgColor: 'bg-orange-700/10',
		href: '/video',
	},
	{
		label: 'Code Generation',
		icon: Code2,
		color: 'text-green-500',
		bgColor: 'bg-green-500/10',
		href: '/code',
	},
]

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
    DialogDescription,
	DialogFooter
} from '@/components/ui/dialog'
import {useProModal} from '@/hooks/use-pro-modal'
import {Badge} from '@/components/ui/badge'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

export default function ProModal() {
	const proModal = useProModal()
	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
						<div className='flex items-center font-bold gap-x-2 py-1 '>
							Upgrade to Jarvis
							<Badge variant='premium' className='uppercase text-sm py-1'>
								Pro
							</Badge>
						</div>
					</DialogTitle>
                    <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium '>
						{tools.map((_,index)=>(
							<Card
								key={_.href}
								className='p-3 border-black/5 flex items-center justify-between'
							>
								<div className="flex items-center gap-x-4">
									<div className={cn('p-2 w-fit rounded-md',_.bgColor)}>
										<_.icon className={cn('w-6 h-6',_.color)} />
									</div>
									<div className="font-semibold text-sm">
										{_.label}
									</div>
								</div>

								<Check className='text-primary aspect-square h-5'/>
							</Card>
						))}
                    </DialogDescription>
					<DialogFooter>
						<Button size='lg' variant='premium' className='w-full'>
							Upgrade
							<Zap className='fill-white ml-2 h-4 aspect-square'/>
						</Button>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
