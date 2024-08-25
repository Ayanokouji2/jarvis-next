import LandingContent from '@/components/landing-content'
import LandingHero from '@/components/landing-hero'
import LandingNavbar from '@/components/landing-navbar'
import {SignedOut, SignInButton} from '@clerk/nextjs'

const LandingPage = () => {
	return (
		<div className='h-full'>
			<LandingNavbar />
			<LandingHero />
			<LandingContent />
			{/* <SignedOut>
				<SignInButton />
			</SignedOut> */}
		</div>
	)
}

export default LandingPage
