'use client'

import Image  from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'

import { cn } from '@/lib/utils'
import {Button} from '@/components/ui/button'

const font = Montserrat({
    weight: '600',
    subsets: ['latin']
})

export default function LandingNavbar() {

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href='/' className='flex items-center'>
                <div className="relative h-12 w-12 mr-4">
                    <Image className='rounded-full h-1' fill alt='logo' src='/logo1.jpg'/>
                </div>
                <h1 className={cn('text-2xl font-bold text-white',font.className)}>Jarvis II</h1>
            </Link>
            <div className="flex-items-center gap-x-2">
                <Link href={'/dashboard'}>
                    <Button variant={'outline'} className='rounded-full'>Get Started</Button>
                </Link>
            </div>
        </nav>
    )
}