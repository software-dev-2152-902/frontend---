import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    HomeIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    XMarkIcon,
    Bars3Icon,
    BookOpenIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Planning', href: '/planning', icon: MapPinIcon },
    { name: 'Carbon Credits', href: '/credits', icon: CurrencyDollarIcon },
    { name: 'IoT Monitoring', href: '/monitoring', icon: ChartBarIcon },
    { name: 'Education', href: '/education', icon: BookOpenIcon },
];

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="h-screen bg-gray-50">
            {/* Mobile sidebar */}
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
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-green-700">
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    type="button"
                                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <XMarkIcon className="h-6 w-6 text-white" />
                                </button>
                            </div>

                            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                                <div className="flex flex-shrink-0 items-center px-4">
                                    <h1 className="text-2xl font-bold text-white">SAFMS</h1>
                                </div>
                                <nav className="mt-5 space-y-1 px-2">
                                    {navigation.map((item) => {
                                        const current = location.pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={`
                          group flex items-center rounded-md px-2 py-2 text-base font-medium
                          ${current ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-600'}
                        `}
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-green-700">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <h1 className="text-2xl font-bold text-white">SAFMS</h1>
                        </div>
                        <nav className="mt-5 flex-1 space-y-1 px-2">
                            {navigation.map((item) => {
                                const current = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`
                      group flex items-center rounded-md px-2 py-2 text-sm font-medium
                      ${current ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-600'}
                    `}
                                    >
                                        <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col lg:pl-64">
                <div className="sticky top-0 z-10 bg-green-700 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>

                <main className="flex-1">
                    <div className="py-6">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}