'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const navbarContent = [
    { name: 'Home', link: '/' },
    { name: 'Developers', link: '/Developers' },
    { name: 'Teams', link: '/Teams' },
    { name: 'Sponsors', link: '/Sponsors' },
    { name: 'Gallery', link: '/Gallery' },
    { name: 'Events', link: '/events' },
]

export default function Navbar() {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    function go(link: string) {
        setOpen(false)
        router.push(link)
    }

    return (
        <>
            {/* Mobile header with hamburger */}
            <header className="md:hidden fixed top-4 left-4 z-40">
                <button
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    onClick={() => setOpen((s) => !s)}
                    className="p-2 rounded-md bg-white/10 backdrop-blur text-white border border-white/10"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </header>

            {/* Mobile slide-over menu */}
            <div
                className={`fixed inset-0 z-30 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!open}
            >
                <div
                    onClick={() => setOpen(false)}
                    className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
                />

                <nav
                    className={`absolute left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900/95 to-slate-800/90 text-white p-6 transform transition-transform ${
                        open ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    aria-label="Mobile navigation"
                >
                    <div className="flex flex-col gap-4 mt-6">
                        {navbarContent.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => go(item.link)}
                                className="text-left capitalize text-lg py-2 px-2 rounded hover:bg-white/5"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Desktop vertical sidebar */}
            <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-48 md:flex-col md:items-start md:py-8 md:px-4 md:gap-4 z-20">
                <div className="w-full bg-transparent text-white">
                    <div className="flex flex-col gap-3">
                        {navbarContent.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => router.push(item.link)}
                                className="w-full text-left capitalize text-base py-2 px-2 rounded hover:bg-white/5"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    )
}