'use client'

import * as z from 'zod'
import axios from 'axios'

import Heading from '@/components/heading'
import {Music4} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {Input} from '@/components/ui/input'

import {formSchema} from '@/app/(dashboard)/(routes)/music/constants'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {Empty} from '@/components/Empty'
import {Loader} from '@/components/loader'
import { useProModal } from '@/hooks/use-pro-modal'
import { toast } from 'sonner'

export default function MusicPage() {
	const router = useRouter()

	const proModal = useProModal()

	const [music, setMusic] = useState<string>()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			setMusic(undefined)

			const response = await axios.post('/api/music', data)
			setMusic(response.data.audio)

			form.reset()
		}catch (error: any) {
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
				title='Music Generation'
				description='Convert Your Prompt to Music'
				icon={Music4}
				iconColor='text-emerald-500'
				bgColor='bg-emerald-500/10'
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
					{!music && !isLoading && (
						<Empty label={'No Music has Generated'} />
					)}
					{
						music && (
							<audio controls className='w-full mt-8' src={music}></audio>
						)
					}
				</div>
			</div>
		</div>
	)
}
