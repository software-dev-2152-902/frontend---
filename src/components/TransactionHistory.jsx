import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function TransactionHistory({ transactions }) {
    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Transaction History</h3>
                <div className="mt-4 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                            Hash
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            From
                                        </th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            To
                                        </th>
                                        <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {transactions.map((tx) => (
                                        <tr key={tx.hash}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                                                {tx.hash.substring(0, 10)}...
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {tx.from.substring(0, 6)}...
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {tx.to.substring(0, 6)}...
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">
                                                {tx.amount}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}