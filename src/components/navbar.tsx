import {SignedIn, UserButton, SignedOut, SignInButton} from '@clerk/nextjs'
import MobileSidebar from '@/components/mobile-sidebar'
export default function Navbar() {
	return (
		<div className='flex items-center p-4'>
			<MobileSidebar />
			<div className='flex w-full justify-end bg-slate-600'>
				{/* <SignedIn> */}
					<UserButton />
				{/* </SignedIn> */}
			</div>
		</div>
	)
}
