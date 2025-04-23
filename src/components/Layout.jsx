import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
    HomeIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    XMarkIcon,
    Bars3Icon,
    BookOpenIcon,
    BellIcon,
    Cog6ToothIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Logo, { GrowingLogo } from './Logo'

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Planning', href: '/planning', icon: MapPinIcon },
    { name: 'Carbon Credits', href: '/credits', icon: CurrencyDollarIcon },
    { name: 'IoT Monitoring', href: '/monitoring', icon: ChartBarIcon },
    { name: 'Education', href: '/education', icon: BookOpenIcon },
]

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [notificationsOpen, setNotificationsOpen] = useState(false)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const location = useLocation()

    return (
        <div className="h-screen bg-slate-50">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-slate-900/80" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1">
                                <div className="absolute top-0 right-0 -mr-12 pt-4">
                                    <button
                                        type="button"
                                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-green-900 to-green-800 px-6 pb-4">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Logo size="md" showText={true} />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <Link
                                                                to={item.href}
                                                                onClick={() => setSidebarOpen(false)}
                                                                className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold ${location.pathname === item.href
                                                                        ? 'bg-green-700 text-white'
                                                                        : 'text-green-100 hover:bg-green-700 hover:text-white'
                                                                    }`}
                                                            >
                                                                <item.icon className="h-6 w-6 shrink-0" />
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <div
                onMouseEnter={() => setIsCollapsed(false)}
                onMouseLeave={() => setIsCollapsed(true)}
                className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? 'w-20' : 'w-72'}`}
            >
                {/* Main sidebar background with pattern */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-900 to-green-800">
                    {/* Floating animated circles */}
                    <motion.div 
                        className="absolute top-1/4 right-0 w-32 h-32 rounded-full bg-green-700/30 blur-xl"
                        animate={{ 
                            y: [0, 15, 0],
                            x: [0, -5, 0] 
                        }}
                        transition={{ 
                            duration: 8, 
                            repeat: Infinity,
                            ease: "easeInOut" 
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-1/4 left-0 w-24 h-24 rounded-full bg-green-600/20 blur-xl"
                        animate={{ 
                            y: [0, -15, 0],
                            x: [0, 5, 0] 
                        }}
                        transition={{ 
                            duration: 7, 
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />
                    
                    {/* Organic patterns */}
                    <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="leaves" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M20 0 Q30 10 20 20 Q10 30 0 20 Q-10 10 0 0" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#leaves)" />
                        </svg>
                    </div>
                    
                    {/* Animated wave pattern */}
                    <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden">
                        <motion.svg 
                            className="absolute w-full h-full text-green-800"
                            viewBox="0 0 100 20"
                            preserveAspectRatio="none"
                            animate={{
                                x: [0, -20, 0],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <path 
                                d="M0,0 Q5,2 10,0 T20,0 T30,0 T40,0 T50,0 T60,0 T70,0 T80,0 T90,0 T100,0 V20 H0 Z" 
                                fill="currentColor" 
                                fillOpacity="0.2"
                            />
                        </motion.svg>
                        <motion.svg 
                            className="absolute w-full h-full text-green-700"
                            viewBox="0 0 100 20"
                            preserveAspectRatio="none"
                            animate={{
                                x: [0, 20, 0],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <path 
                                d="M0,10 Q5,12 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10 V20 H0 Z" 
                                fill="currentColor" 
                                fillOpacity="0.3"
                            />
                        </motion.svg>
                    </div>
                </div>

                <div className="relative flex h-16 shrink-0 items-center px-6">
                    {!isCollapsed ? (
                        <Logo size="md" showText={true} />
                    ) : (
                        <div className="mx-auto">
                            <Logo size="md" showText={false} />
                        </div>
                    )}
                </div>

                <nav className="relative flex flex-1 flex-col px-6">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item, index) => {
                                    const isActive = location.pathname === item.href
                                    return (
                                        <motion.li 
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                to={item.href}
                                                className={`group flex items-center gap-x-3 rounded-xl p-2 text-sm font-semibold transition-all duration-200 ${isActive
                                                        ? 'bg-green-700 text-white shadow-lg shadow-green-900/30'
                                                        : 'text-green-100 hover:bg-green-700/70 hover:text-white'
                                                    }`}
                                            >
                                                <motion.div
                                                    whileHover={{ rotate: isActive ? 0 : 10 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <item.icon
                                                        className={`shrink-0 transition-all duration-300 ${isCollapsed ? 'h-8 w-8' : 'h-6 w-6'
                                                            }`}
                                                    />
                                                </motion.div>
                                                {!isCollapsed && (
                                                    <motion.span
                                                        initial={{ opacity: 0, width: 0 }}
                                                        animate={{ opacity: 1, width: 'auto' }}
                                                        exit={{ opacity: 0, width: 0 }}
                                                    >
                                                        {item.name}
                                                    </motion.span>
                                                )}
                                            </Link>
                                        </motion.li>
                                    )
                                })}
                            </ul>
                        </li>
                        
                        {/* User profile section at the bottom */}
                        <li className="mt-auto">
                            {!isCollapsed && (
                                <motion.div 
                                    className="rounded-xl bg-green-800/50 p-3 text-sm text-green-100"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-x-3 mb-2">
                                        <div className="h-9 w-9 rounded-full bg-green-700 p-1">
                                            <UserCircleIcon className="h-7 w-7 text-green-100" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Emma Wilson</p>
                                            <p className="text-xs text-green-200/70">Farm Manager</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {isCollapsed && (
                                <motion.div
                                    className="flex justify-center"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="h-10 w-10 rounded-full bg-green-800/50 p-1 flex items-center justify-center">
                                        <UserCircleIcon className="h-7 w-7 text-green-100" />
                                    </div>
                                </motion.div>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:pl-20' : 'lg:pl-72'
                    }`}
            >
                <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1 items-center">
                            <motion.h1 
                                key={location.pathname}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-lg font-semibold text-gray-900 relative"
                            >
                                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                                <motion.div 
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-green-300 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.2 }}
                                />
                            </motion.h1>
                        </div>
                        
                        {/* Right-side header elements */}
                        <div className="flex items-center gap-x-4">
                            {/* Weather widget */}
                            <div className="hidden md:flex items-center py-1 px-3 bg-blue-50 rounded-full border border-blue-100">
                                <svg className="w-5 h-5 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                                <span className="text-sm font-medium text-blue-700">23°C</span>
                            </div>
                            
                            {/* Farm status indicator */}
                            <div className="hidden md:flex items-center bg-gradient-to-r from-green-500 to-green-400 text-white py-1 px-3 rounded-full shadow-sm">
                                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                                <span className="text-xs font-medium">Farm Status: Optimal</span>
                            </div>
                            
                            {/* Notifications */}
                            <div className="relative">
                                <motion.button
                                    className="p-1.5 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-1"
                                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" />
                                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                                </motion.button>
                                
                                {notificationsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <div className="px-3 py-2 border-b border-gray-100">
                                            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {[
                                                { title: 'Sensor maintenance required', time: '10 minutes ago' },
                                                { title: 'Carbon credits update', time: '1 hour ago' },
                                                { title: 'New sustainability guideline', time: '2 hours ago' }
                                            ].map((notification, i) => (
                                                <a key={i} href="#" className="block px-4 py-2 hover:bg-gray-50">
                                                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                                    <p className="text-xs text-gray-500">{notification.time}</p>
                                                </a>
                                            ))}
                                        </div>
                                        <div className="border-t border-gray-100 px-3 py-2">
                                            <a href="#" className="text-xs font-medium text-green-600 hover:text-green-700">View all notifications</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Settings */}
                            <motion.button
                                className="p-1.5 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-1"
                                whileHover={{ scale: 1.05, rotate: 15 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="sr-only">Settings</span>
                                <Cog6ToothIcon className="h-6 w-6" />
                            </motion.button>
                            
                            {/* Profile dropdown */}
                            <div className="relative">
                                <motion.button
                                    className="flex items-center gap-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-1"
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center ring-2 ring-white shadow-md">
                                        <span className="text-white font-bold text-sm">EW</span>
                                    </div>
                                </motion.button>
                                
                                {profileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Your Profile</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign out</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
                <main className="py-6">
                    <div className="px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen relative">
                        {/* Decorative background elements */}
                        <div className="absolute top-20 right-10 w-64 h-64 bg-green-100 rounded-full opacity-30 blur-3xl -z-10" />
                        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full opacity-40 blur-3xl -z-10" />
                        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-purple-100 rounded-full opacity-20 blur-xl -z-10" />
                        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-100 rounded-full opacity-30 blur-2xl -z-10" />
                        
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
