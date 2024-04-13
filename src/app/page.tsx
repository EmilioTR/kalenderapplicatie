"use client"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import DeleteDialog from "@/components/deleteTodoDialog";
import CreateTodoDialog from "@/components/createTodoDialog";
import ShowTodoDialog from "@/components/showTodoDialog";
import { EventSourceInput } from "@fullcalendar/core/index.js";


interface Todo {
  id: number;
  title: string;
  description: string;
  start: Date | string;
  allDay: boolean;
}

export default function Home() {

  const [todos, setTodos] = useState([
    { title: 'todo1', description: 'beschrijving', id: '1' },
    { title: 'todo2', description: 'beschrijving', id: '2' },
    { title: 'todo3', description: 'beschrijving', id: '3' },
    { title: 'todo4', description: 'beschrijving', id: '4' },
    { title: 'todo5', description: 'beschrijving', id: '5' },
  ])
  const [allTodos, setAllTodos] = useState<Todo[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDisplayModal, setShowDisplayModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    title: '',
    start: '',
    description: '',
    allDay: false,
  })

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (todoEl) {
          let id = todoEl.getAttribute("data")
          let title = todoEl.getAttribute("title")
          let description = todoEl.getAttribute("description")
          let start = todoEl.getAttribute("start")
          
          return { id, title, start, description }
        }
      })
    }
  }, [])



  const handleDateClick = (arg: { date: Date, allDay: boolean }) => {       // id mss later nog op andere manier doen
    setNewTodo({ ...newTodo, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })
    setShowCreateModal(true)
  }

  const addTodo = (data: DropArg) => {       // id mss later nog op andere manier doen
    console.log("DATA", data)
    const todo = {
      ...newTodo,
      id: new Date().getTime(),
      title: data.draggedEl.innerText,
      description: data.draggedEl.innerText,
      allDay: data.allDay,
      start: data.date.toISOString(),
    }

    setAllTodos([...allTodos, todo])
  }

  const handleDeleteModal = (data: any) => {
    console.log(data)
    setShowDeleteModal(true)
    setIdToDelete(Number(data.id))
  }

  const handleShowModal = (data: { event: { id: string } }) => {
    setShowDisplayModal(true)
    console.log(data)
    setSelectedTodo(allTodos.filter(todo => Number(todo.id) === Number(data.event.id))[0])
  }

  const handleDelete = () => {
    setAllTodos(allTodos.filter(todo => Number(todo.id) !== Number(idToDelete)))
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  const handleCloseModal = () => {
    setShowCreateModal(false)
    setNewTodo({
      id: 0,
      title: '',
      start: '',
      description: '',
      allDay: false,
    })
    setShowDeleteModal(false)
    setIdToDelete(null)

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      title: e.target.value
    })
  }

  const handleChangeDescr = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      description: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAllTodos([...allTodos, newTodo])
    setShowCreateModal(false)
    setNewTodo({
      id: 0,
      title: '',
      description: '',
      start: '',
      allDay: false,
    })
  }

  return (

    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">

        <h1 className="font-bold text-2xl text-gray-700"> Calendar</h1>
      </nav>

      <main className="flex min-h-screen flex-col items-center justify-between p-5">
        <div className="fc-view grid grid-cols-10">
          <div className="col-span-8">

            <FullCalendar
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin,
                listPlugin
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,dayGridMonth,listWeek'
              }}
              events={allTodos as EventSourceInput}
              initialView='timeGridWeek'
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addTodo(data)}
              eventClick={(data) => handleShowModal(data)}
            />
          </div>

          <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
            <h1 className="font-bold text-lg text-center">Drag Todo's</h1>
            {
              todos.map(todo => (
                <div
                  className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                  title={todo.title}
                  key={todo.id}
                >
                  {todo.title}

                </div>
              ))
            }
          </div>
        </div>

        <DeleteDialog {...{ showDeleteModal, setShowDeleteModal, handleDelete, handleCloseModal }} />

        <CreateTodoDialog {...{ newTodo, showCreateModal, setShowCreateModal, handleSubmit, handleChange, handleChangeDescr, handleCloseModal }} />

        <ShowTodoDialog {...{selectedTodo, showDisplayModal, setShowDisplayModal, handleDeleteModal } }></ShowTodoDialog>
      </main>

    </>
  );
}
