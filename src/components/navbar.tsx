
import {SignedIn, UserButton, SignedOut, SignInButton} from '@clerk/nextjs'
import MobileSidebar from '@/components/mobile-sidebar'
import { getApiLimit } from '@/lib/api-limit'
export default async function Navbar() {

	const apiLimitCount : number = await getApiLimit()
	
	return (
		<div className='flex items-center p-4'>
			<MobileSidebar apiLimit={apiLimitCount}/>
			<div className='flex w-full justify-end bg-slate-600'>
				{/* <SignedIn> */}
					<UserButton />
				{/* </SignedIn> */}
			</div>
		</div>
	)
}
