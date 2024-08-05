import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
    DialogDescription
} from '@/components/ui/dialog'
import {useProModal} from '@/hooks/use-pro-modal'
import {Badge} from '@/components/ui/badge'

export default function ProModal() {
	const proModal = useProModal()
	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
						<div className='flex items-center font-bold gap-x-2 py-1 '>
							Upgrade to Jarvis
							<Badge variant='premium' className='uppercase text-sm py-1'>
								Pro
							</Badge>
						</div>
					</DialogTitle>
                    <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium '>

                    </DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
