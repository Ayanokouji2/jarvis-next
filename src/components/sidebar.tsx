'use client'

import {cn} from '@/lib/utils'
import {
	Code2Icon,
	ImageIcon,
	LayoutDashboard,
	MessageCircle,
	Music4,
	Settings,
	VideoIcon,
} from 'lucide-react'
import {Montserrat} from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import FreeCounter from './FreeCounter'

const montserrat = Montserrat({weight: '600', subsets: ['latin']})

const routes = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: LayoutDashboard,
		color: 'text-sky-500',
	},
	{
		label: 'Conversation',
		href: '/conversation',
		icon: MessageCircle,
		color: 'text-violet-500',
	},
	{
		label: 'Image Generation',
		href: '/image',
		icon: ImageIcon,
		color: 'text-pink-700',
	},
	{
		label: 'Audio Generation',
		href: '/music',
		icon: Music4,
		color: 'text-emerald-500',
	},
	{
		label: 'Video Generation',
		href: '/video',
		icon: VideoIcon,
		color: 'text-orange-700',
	},
	{
		label: 'Code Generation',
		href: '/code',
		icon: Code2Icon,
		color: 'text-green-700',
	},
	{
		label: 'Setting',
		href: '/settings',
		icon: Settings, 
	},
]

export default  function Sidebar({apiLimit, isPro}:{apiLimit : number, isPro: boolean}) {
	const pathname = usePathname()

	return (
		<div className='space-y-4 py-4 flex flex-col h-full bg-[#111824] text-white'>
			<div className='px-3 py-2 flex-1'>
				<Link
					href='/dashboard'
					className='flex items-center pl-3 mb-14'>
					<div className='relative h-12 w-12 mr-4 mix-blend-screen object-contain '>
						<Image fill alt='logo' src='/logo1.jpg' />
					</div>
					<h1
						className={cn(
							'text-2xl font-bold capitalize',
							montserrat.className,
						)}>
						jarvis
					</h1>
				</Link>
				<div className='space-y-2'>
					{routes.map(route => (
						<Link
							href={route.href}
							key={route.href}
							className={cn(
								'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/20 rounded-lg transition',
								pathname === route.href
									? 'bg-white/20 rounded-lg text-white'
									: 'text-zinc-400',
							)}>
							<div className='flex items-center flex-1'>
								<route.icon
									className={cn('h-5 w-5 mr-3', route.color)}
								/>
								{route.label}
							</div>
						</Link>
					))}


				</div>
			</div>
			<FreeCounter isPro={isPro} apiLimit={apiLimit}/>
		</div>
	)
}
