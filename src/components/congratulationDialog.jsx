
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Box } from '@mui/material';
import FormWithColorSelect from '@/components/colorDropdown'


export default function CongratulationDialog({ showCongratulations, setShowCongratulations }) {


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
                                <div>
                                    <div className=" text-center">
    

                                        <Dialog.Title as="h3" className="text-base mb-3 font-semibold leading-6 text-gray-900">
                                            Goed bezig!
                                        </Dialog.Title>
                                        
                                        <Dialog.Description>
                                            Je hebt je goed aan je ingeplande taken gehouden! Als beloning heb je een nieuwe badge ontgrendeld en is deze toegevoegd aan jouw verzameling.
                                            Doe zo verder!
                                        </Dialog.Description>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent !bg-blue-100 px-4 py-2 mt-3 text-md font-medium text-blue-900 hover:!bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() =>{setShowCongratulations(false)}}
                                        >
                                            Top!
                                        </button>

                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}