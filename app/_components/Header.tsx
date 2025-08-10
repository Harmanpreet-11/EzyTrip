import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import path from 'path'
import React from 'react'

const menuOptions = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Pricing',
        path: '/pricing'
    },
    {
        name: 'Contact',
        path: '/contact'
    }
]

const Header = () => {
    return (
        <div className='flex justify-between items-center p-4'>
            <div className='flex gap-2 items-center'>
                <Image src={'logo.svg'} alt='logo' width={30} height={30} />
                <h2 className='font-bold text-2xl'>EzyTrip</h2>
            </div>

            <div className='flex gap-8 items-center'>
                {menuOptions.map((menu, index) => (
                    <Link href={menu.path}>
                        <h2 className='text-lg hover:scale-105 hover:text-primary transition-all'>{menu.name}</h2>
                    </Link>
                ))}
            </div>

            <div>
                <SignInButton mode='modal'>
                    <Button>
                        Get Started
                    </Button>
                </SignInButton>

            </div>
        </div>
    )
}

export default Header