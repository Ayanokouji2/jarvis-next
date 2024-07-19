import {Button} from '@/components/ui/button'
import {SignedIn, UserButton, SignedOut, SignInButton} from '@clerk/nextjs'
import {Menu} from 'lucide-react'
export default function Navbar() {
	return (
		<div className='flex items-center p-4'>
			<Button variant='ghost' size='icon' className='md:hidden'>
				<Menu />
			</Button>
			<div className='flex w-full justify-end bg-slate-600'>
				
					<SignedOut>
						<SignInButton />
					</SignedOut>
				
					<SignedIn>
						<UserButton />
					</SignedIn>
				
			</div>
		</div>
	)
}
