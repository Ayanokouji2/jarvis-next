'use client'

import * as z from 'zod'
import axios from 'axios'

import Heading from '@/components/heading'
import {Image} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {Input} from '@/components/ui/input'

import {amountOption, formSchema, resolutionOption} from '@/app/(dashboard)/(routes)/image/constants'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {Empty} from '@/components/Empty'
import {Loader} from '@/components/loader'
import {cn} from '@/lib/utils'
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '@/components/ui/select'
import { useProModal } from '@/hooks/use-pro-modal'
import { toast } from 'sonner'

export default function ConversationPage() {
	const router = useRouter()
	const proModal = useProModal()

	const [images, setImages] = useState<string[]>([])

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
			amount: '1',
			resolution: '256x256',
		},
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			setImages([])

			const result = await axios.post('/api/image', data)
			console.log('[IMAGE_RESPONSE]', result)

			const urls = result.data?.map((image: {url: string}) => image.url)

			setImages(urls)
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
				title='Image Generation'
				description='Convert Your well written text into an image'
				icon={Image}
				iconColor='text-pink-700'
				bgColor='bg-pink-700/10'
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
									<FormItem className='col-span-12 lg:col-span-6 '>
										<FormControl className='m-0 p-0 '>
											<Input
												className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
												{...field}
												placeholder='Write your Prompt in here'
												disabled={isLoading}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								name='amount'
								control={form.control}
								render={({field}) => (
									<FormItem className='col-span-12 lg:col-span-2'>
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={
															field.value
														}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{amountOption.map((_,index)=>(
													<SelectItem key={index} value={_.value}>{_.label}</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>							
							<FormField
								name='resolution'
								control={form.control}
								render={({field}) => (
									<FormItem className='col-span-12 lg:col-span-2'>
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={
															field.value
														}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{resolutionOption.map((_,index)=>(
													<SelectItem key={index} value={_.value}>{_.label}</SelectItem>
												))}
											</SelectContent>
										</Select>
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
						<div className='p-20'>
							<Loader />
						</div>
					)}
					{images.length === 0 && !isLoading && (
						<Empty
							label={
								'We are waiting for your well written prompt to generate image'
							}
						/>
					)}
					<div>images will be rendered here</div>
				</div>
			</div>
		</div>
	)
}
