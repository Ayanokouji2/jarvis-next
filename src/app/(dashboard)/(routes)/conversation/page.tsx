'use client'

import * as z from 'zod'
import axios from 'axios'

import Heading from '@/components/heading'
import {MessageCircle} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {Input} from '@/components/ui/input'
// import {ChatCompletionRequestMessage} from 'openai'

import {formSchema} from '@/app/(dashboard)/(routes)/conversation/constants'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {Empty} from '@/components/Empty'
import {Loader} from '@/components/loader'
import {cn} from '@/lib/utils'
import UserAvatar from '@/components/user-avatar'
import {BotAvatar} from '@/components/bot-avatar'

import {marked} from 'marked'

export default function ConversationPage() {
	const router = useRouter()

	const [messages, setMessages] = useState<String[]>([])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			// const userMessage: ChatCompletionRequestMessage = {
			// 	role: 'user',
			// 	content: data.prompt,
			// }

			// const newMessages = [...messages, userMessage]

			const response = await axios.post('/api/conversation', {
				messages: data.prompt,
			})
			// console.log('[newMessages]', newMessages)
			const responseMarkedMessage = await marked.parse(response.data)
			setMessages(current => [...current, responseMarkedMessage , data.prompt])

			form.reset()
		} catch (error: unknown) {
			console.error('[CONVERSATION_ERROR]', error)
		} finally {
			router.refresh()
		}
	}

	return (
		<div className=''>
			<Heading
				title='Conversation'
				description='Most Intelligent AI model for conversation'
				icon={MessageCircle}
				iconColor='text-violet-500'
				bgColor='bg-violet-500/10'
			/>
			<div className='px-4 lg:px-8'>
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
							<FormField
								name='prompt'
								render={({field}) => (
									<FormItem className='col-span-12 lg:col-span-10 '>
										<FormControl className='m-0 p-0 '>
											<Input
												className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
												{...field}
												placeholder='Type your message here'
												disabled={isLoading}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className='col-span-12 lg:col-span-2 w-full'
								disabled={isLoading}>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className='space-y-4 mt-4'>
					{isLoading && (
						<div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<Empty label={'No Conversation has started'} />
					)}
					<div className='flex flex-col-reverse gap-y-4'>
						{messages.map((message, index) => (
							<div
								key={index}
								className={cn(
									'p-8 w-full flex items-start gap-x-8 rounded-lg',
									index % 2 !== 0
										? 'bg-white border border-black/10'
										: 'bg-muted',
								)}>
								{index % 2 !== 0 ? (
									<UserAvatar />
								) : (
									<BotAvatar />
								)}
								<p className="text-sm" dangerouslySetInnerHTML={{ __html: message }} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
