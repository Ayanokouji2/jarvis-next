import Heading from '@/components/heading'
import {MessageCircle} from 'lucide-react'

export default function ConversationPage() {
	return (
		<div className=''>
			<Heading
				title='Conversation'
				description='Anything can be the description '
				icon={MessageCircle}
				iconColor='text-violet-500'
				bgColor='bg-violet-500/10'
			/>
		</div>
	)
}
