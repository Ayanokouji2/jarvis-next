
import {SignedIn, UserButton, SignedOut, SignInButton} from '@clerk/nextjs'
import MobileSidebar from '@/components/mobile-sidebar'
import { getApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
export default async function Navbar() {

	const apiLimitCount : number = await getApiLimit()
	const isPro = await checkSubscription()
	
	return (
		<div className='flex items-center p-4'>
			<MobileSidebar isPro={isPro} apiLimit={apiLimitCount}/>
			<div className='flex w-full justify-end bg-slate-600'>
				{/* <SignedIn> */}
					<UserButton />
				{/* </SignedIn> */}
			</div>
		</div>
	)
}
