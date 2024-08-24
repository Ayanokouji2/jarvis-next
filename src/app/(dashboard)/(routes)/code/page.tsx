'use client'

import * as z from 'zod'
import axios from 'axios'

import Heading from '@/components/heading'
import {Code2} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {Input} from '@/components/ui/input'
// import {ChatCompletionRequestMessage} from 'openai'

import {formSchema} from '@/app/(dashboard)/(routes)/code/constants'
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

import Markdown from 'react-markdown'
import { useProModal } from '@/hooks/use-pro-modal'
import { toast } from 'sonner'

export default function CodePage() {
	const router = useRouter()
	const proModal = useProModal()

	const [messages, setMessages] = useState<string[]>([])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: ''
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			const newMessages = [
				'You are a code generator that helps senior developers write, complete and fix there code. Using the given prompts, you can generate code snippets, functions, classes, etc. You can also generate code completions, fix code errors, and more. You can also ask for help with your code, and the code generator will provide you with the necessary information to help you solve your problem. And also helps them in understanding the theory of the code or any IT related topic.',
				data.prompt,
			]

			const response = await axios.post('/api/code', {
				messages: newMessages,
			})

			setMessages(current => [
				...current,
				response.data,
				data.prompt,
			])

			form.reset()
		} catch (error: any) {
			if(error?.response?.status === 403){
				proModal.onOpen();
			}
			else toast.error(error?.response?.data?.message || error.message)
		} finally {
			router.refresh()
		}
	}

	return (
		<div className=''>
			<Heading
				title='Code Generation'
				description='Most Intelligent AI model to help you write code'
				icon={Code2}
				iconColor='text-green-700'
				bgColor='bg-green-700/10'
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
									'p-8 w-full flex items-start gap-x-6 rounded-lg ' ,
									index % 2 !== 0
										? 'bg-white border border-black/10'
										: 'bg-muted',
								)}>
								{index % 2 !== 0 ? (
									<UserAvatar />
								) : (
									<BotAvatar />
								)}
								<Markdown
									className={'text-sm overflow-hidden leading-7 	'}
									components={{
										pre: ({node, ...props}) => (
											<div className=' overflow-auto w-full bg-black/10 my-2 p-2 rounded-lg'>
												<pre {...props} />
											</div>
										),
										// code: ({node, ...props}) => (
										// 	<code
										// 		{...props}
										// 		className='bg-black/10 rounded-lg p-1'
										// 	/>
										// ),
									}}>
									{message || ''}
								</Markdown>
								{/* <p className="text-sm text-wrap " dangerouslySetInnerHTML={{ __html: message }} /> */}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
