import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from 'next/image';

export default function CongratulationDialog({ showCongratulations, setShowCongratulations, level }) {

    return (
        <Transition.Root show={showCongratulations} as={Fragment}>
            <Dialog as="div" className="relative z-10 overflow-visible"
                onClose={setShowCongratulations}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg p-5 py-6">
                                <div className="text-center text-green-700">
                                    <Dialog.Title as="h3" className="text-2xl mb-3 font-bold leading-6 text-green-800">
                                        Proficiat!
                                    </Dialog.Title>

                                    <Dialog.Description as="div" className="text-balance">
                                        <p>
                                            Je hebt je goed aan je ingeplande taken gehouden!
                                        </p>
                                        <p>
                                            Als beloning heb je een nieuwe badge ontgrendeld en is deze toegevoegd aan jouw verzameling.
                                            Doe zo verder!
                                        </p>
                                    </Dialog.Description>

                                    <div className="flex flex-col w-full text-left mt-5 px-10 font-semibold">
                                        Verkregen badge:
                                        <div className="flex w-full justify-center my-3">
                                            <Image alt="current" width={150} height={150} src={`/images/badgelvl${level}.png`} />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border w-[60%] border-transparent !bg-green-100 py-2 mt-3 text-md font-medium text-green-900 hover:!bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                        onClick={() => { setShowCongratulations(false) }}
                                    >
                                        Top!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}