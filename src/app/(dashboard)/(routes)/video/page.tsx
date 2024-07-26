'use client'

import * as z from 'zod'
import axios from 'axios'

import Heading from '@/components/heading'
import {Video} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {Input} from '@/components/ui/input'

import {formSchema} from '@/app/(dashboard)/(routes)/video/constants'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {Empty} from '@/components/Empty'
import {Loader} from '@/components/loader'

export default function VideoPage() {
	const router = useRouter()

	const [video, setVideo] = useState<string>()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			setVideo(undefined)

			const response = await axios.post('/api/video', data)
			console.log(response.data)
			setVideo(response.data[0])

			form.reset()
		} catch (error: unknown) {
			console.error('[VIDEO_ERROR]', error)
		} finally {
			router.refresh()
		}
	}

	return (
		<div className=''>
			<Heading
				title='Video Generation'
				description='Convert Your Prompt to Video'
				icon={Video}
				iconColor='text-orange-700'
				bgColor='bg-orange-700/10'
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
												placeholder='Type your prompt here'
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
					{!video && !isLoading && (
						<Empty label={'No video has Generated'} />
					)}
					{
						video && (
							<video controls className='w-full aspect-video rounded-lg border bg-black my-8' src={video}></video>
						)
					}
				</div>
			</div>
		</div>
	)
}
