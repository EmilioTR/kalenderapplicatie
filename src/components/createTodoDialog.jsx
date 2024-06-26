import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormWithColorSelect from '@/components/colorDropdown'

export default function CreateTodoDialog({
    newTodo,
    showCreateModal,
    setShowCreateModal,
    handleSubmit,
    handleChange,
    handleChangeDescr,
    handleCloseModal,
    handleAddToList,
    isListTodo,
    setIsListTodo,
    handleChangeColor,
    handleChangeDuration
}) {

    const handleClose = () => {
        setIsListTodo(false)
        setShowCreateModal(false)
    }


    return (
        <Transition.Root show={showCreateModal} as={Fragment}>
            <Dialog as="div" className="relative z-10 overflow-visible"
                onClose={handleClose}>
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
                                <div>
                                    <div className=" text-center">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Nieuwe Todo
                                        </Dialog.Title>

                                        <FormWithColorSelect
                                            className='z-10'
                                            {...{
                                                isListTodo,
                                                handleChange,
                                                handleChangeDescr,
                                                handleChangeColor,
                                                handleChangeDuration,
                                                handleAddToList,
                                                handleSubmit,
                                                newTodo,
                                                handleCloseModal,
                                            }} />

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