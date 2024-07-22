import {SignedOut, SignInButton} from '@clerk/nextjs'

const LandingPage = () => {
	return (
		<div>
			<SignedOut>
				<SignInButton />
			</SignedOut>
		</div>
	)
}

export default LandingPage
