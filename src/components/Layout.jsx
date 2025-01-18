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
                                        <span className="text-2xl font-bold text-white">SAFMS</span>
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
                                                                className={`
                                  group flex gap-x-3 rounded-md p-2 text-sm font-semibold
                                  ${location.pathname === item.href
                                                                        ? 'bg-green-700 text-white'
                                                                        : 'text-green-100 hover:bg-green-700 hover:text-white'}
                                `}
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

            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-green-900 to-green-800 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <span className="text-2xl font-bold text-white">SAFMS</span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.href}
                                                className={`
                          group flex gap-x-3 rounded-md p-2 text-sm font-semibold
                          ${location.pathname === item.href
                                                        ? 'bg-green-700 text-white'
                                                        : 'text-green-100 hover:bg-green-700 hover:text-white'}
                        `}
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
            </div>

            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="flex flex-1 items-center">
                            <h1 className="text-lg font-semibold text-gray-900">
                                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                            </h1>
                        </div>
                    </div>
                </div>

                <main className="py-6">
                    <div className="px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}