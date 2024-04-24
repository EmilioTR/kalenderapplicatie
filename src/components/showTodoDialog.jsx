import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";

export default function ShowTodoDialog({ selectedTodo, showDisplayModal, setShowDisplayModal, handleDeleteModal, setTodoAsDone }) {

    /*
        HIER ALLES VAN DE TODO WEERGEVEN
        De delete handelen
        een description toevoegen aan de todo model

        mss later ook een checked uitbreiden
    */


    return (
        <Transition.Root show={showDisplayModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowDisplayModal}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="flex flex-row w-full justify-between">
                                <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900">
                                        {showDisplayModal ? selectedTodo.title : ""}
                                    </Dialog.Title>

                                    <button
                                        type="button"
                                        className="flex justify-center items-center !bg-slate-50 hover:!bg-slate-300 text-slate-600 p-2 rounded-full w-8 h-8 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-left">

                                    

                                    <Dialog.Description className="h-fit mt-1">
                                        {showDisplayModal ? selectedTodo.description : ""}
                                    </Dialog.Description>

                                    <div className="flex justify-between items-center mt-5">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent !bg-red-100 px-4 py-2 text-md font-medium text-red-900 hover:!bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                            onClick={() => handleDeleteModal(selectedTodo)}
                                            >
                                            Verwijder
                                        </button>
{showDisplayModal ? !selectedTodo.done &&   
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent !bg-green-100 px-4 py-2 text-md font-medium text-green-900 hover:!bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => setTodoAsDone(selectedTodo)}
                                            
                                        >
                                            Gedaan
                                        </button>
                                      :  null}
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