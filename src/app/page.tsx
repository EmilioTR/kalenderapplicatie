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
import BrainDumpDrawer from "@/components/brainDumpDrawer";
import { Calendar, EventSourceInput } from "@fullcalendar/core/index.js";
import LinearProgress from '@mui/material/LinearProgress';
import ShowListTodo from '@/components/showListTodo';
import { Box } from "@mui/material";
import Button from '@mui/joy/Button';

import emptybadge from './images/emptybadge.png'
import badge from './images/medail.png'


interface Todo {
  id: number;
  title: string;
  description: string;
  start: Date | string;
  allDay: boolean;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export default function Home() {

  const [todos, setTodos] = useState([
    { title: 'Voetballen', description: 'Ik moet gaan voetballen, het is training', id: 0, backgroundColor: '#3ac0cf', borderColor: "#3ac0cf", textColor: 'white' },
    { title: 'Fietsen', description: 'Voorbereiden op fietstoernooi, moet een fietstour van 20km fietsen onder de 40 minuten', id: 1, backgroundColor: '#3ac0cf', borderColor: "#3ac0cf", textColor: 'white' },
    { title: 'Cinema met Carlos', description: 'We gaan eindelijk Dune 2 gaan kijken!!! Lisan Al Gaiiiib!', id: 2, backgroundColor: '#8cb849', borderColor: "#8cb849", textColor: 'white' },
    { title: 'Taak Wiskunde II afwerken', description: 'Oefening 1.3 t.e.m. oef 3.3 afwerken. DEADLINE: 17/06', id: 3, backgroundColor: '#c9c426', borderColor: "#c9c426", textColor: 'white' },
    { title: 'Maandelijkse checkup van oma bij het ziekenhuis', description: 'Moet oma voeren naar het ziekenhuis om haar bloed te laten checken --- verder is dit een beschrijving van de vijfde taak die eigelijk ook wel een zeer lange beschrijving heeft om de UI eens te testen want je weet nooit wat er kan gebeuren in het leven...', id: 5, backgroundColor: '#d63341', borderColor: "#d63341", textColor: 'white' },
  ])

  const emptyTodo = {
    id: 0,
    title: '',
    start: '',
    description: '',
    backgroundColor: '',
    borderColor: "",
    textColor: "",
    allDay: false,
  }

  const [allTodos, setAllTodos] = useState<Todo[]>([])
  const [doneTodos, setDoneTodos] = useState<Todo[]>([])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDisplayModal, setShowDisplayModal] = useState(false)
  const [showListTodoModal, setShowListTodoModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [newTodo, setNewTodo] = useState<Todo>(emptyTodo)
  const [isListTodo, setIsListTodo] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)

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

  const handleDateSelect = (data: any) => {
    setNewTodo({ ...newTodo, ...data, id: new Date().getTime() })
    setShowCreateModal(true)
  }

  // const handleEventChange = (data: any) => {
  //   console.log(data.event._def)
  //   setNewTodo({...newTodo, title: data.event._def.title , allDay: data.event._def.allDay , ...data.event._def.extendedProps})
  //   console.log(newTodo)
  //   setAllTodos([...allTodos, newTodo])
  //   setNewTodo(emptyTodo)

  // }

  const addTodo = (data: DropArg) => {       // id mss later nog op andere manier doen
    // console.log("DATA", data)
    const selectedTodo = todos.find(todo => todo.title === data.draggedEl.innerText) || { title: 'Er ging iets mis', description: 'Dit is geen todo', id: 999, backgroundColor: 'red', borderColor: "darkred", textColor: 'darkred' }
    const todo = {
      ...newTodo,
      id: new Date().getTime(),
      title: selectedTodo.title,
      description: selectedTodo.description,
      allDay: data.allDay,
      start: data.date.toISOString(),
      backgroundColor: selectedTodo.backgroundColor,
      borderColor: selectedTodo.borderColor,
    }

    setTodos(todos.filter(todo => todo.title !== data.draggedEl.innerText))

    setAllTodos([...allTodos, todo])
  }

  const handleDeleteModal = (data: any) => {
    setShowDeleteModal(true)
    setIdToDelete(Number(data.id))
  }

  const handleShowModal = (data: { event: { id: string } }) => {
    setShowDisplayModal(true)
    setSelectedTodo(allTodos.filter(todo => Number(todo.id) === Number(data.event.id))[0])
  }

  const handleShowListTodo = ( id: Number  ) => {
    setShowListTodoModal(true)
    //console.log(yap);
    //const peter = todos.filter(todo => {console.log(todo.id , yap), Number(todo.id) === Number(yap)})
    todos.forEach(todo => { 
     if(todo.id === id) {
      setSelectedTodo({...todo, start: '', allDay: false})
     }
    })
    //console.log(peter);
   // setSelectedTodo()
  }

  const handleDelete = () => {
    setAllTodos(allTodos.filter(todo => Number(todo.id) !== Number(idToDelete)))
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  const handleCloseModal = () => {
    setShowCreateModal(false)
    setIsListTodo(false)
    setNewTodo(emptyTodo)
    setShowDeleteModal(false)
    setIdToDelete(null)

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      title: e.target.value,
      id: new Date().getTime()
    })
  }

  const handleChangeDescr = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      description: e.target.value
    })
  }

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTodo({
      ...newTodo,
      backgroundColor: `${e.target.value}`,
      borderColor: `${e.target.value}`,
      textColor: "white",
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAllTodos([...allTodos, newTodo])
    setShowCreateModal(false)
    setNewTodo(emptyTodo)
  }

  const handleAddToList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsListTodo(false)
    setTodos([...todos, newTodo])
    setShowCreateModal(false)
    setNewTodo(emptyTodo)
  }

  const setTodoAsDone = (todo: Todo) => {
    if (!doneTodos.find(done => done.id === todo.id)) {
      setDoneTodos([...doneTodos, todo])
    }

    todo.backgroundColor = "lightgreen"
    todo.borderColor = "green"
    todo.textColor = "darkgreen"
    setShowDisplayModal(false)
    setAllTodos(allTodos.filter(events => Number(todo.id) !== Number(events.id)))
    setAllTodos([...allTodos, todo])
  }

  return (

    <>
      <nav className="flex justify-between border-b border-violet-100 p-4">

        <h1 className="font-bold text-2xl text-gray-700"> Calendar</h1>
        <div className="flex flex-col justify-center" >
          <div className="flex flex-row justify-between" >
            <p>Score: {doneTodos.length}</p>
            <button
              className="inline-flex justify-center rounded-md border p-1 border-transparent items-center bg-violet-100 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => console.log(allTodos)}
            > Progress</button>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <img alt="emptybadge" src='./images/emptybadge.png' className="h-8"></img>
            <Box className="w-36">
              <LinearProgress variant="determinate" value={doneTodos.length * 20} />
            </Box>
            <img alt="badge" src='./images/medail.png' className="h-8"></img>

          </div>

        </div>



        <button
          className="inline-flex justify-center rounded-md border border-transparent items-center bg-violet-100 px-4 py-2 text-md font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setOpenDrawer(!openDrawer)}
        > Brain Dump </button>

      </nav>

      <main className="flex h-min-screen flex-col items-center justify-between">
        <div className="fc-view grid grid-cols-10 p-5">
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
              select={(data) => handleDateSelect(data)}
              drop={(data) => addTodo(data)}
              eventClick={(data) => handleShowModal(data)}
              height={800}
            />
          </div>

          <div id="draggable-el" className="ml-8 w-[260px] border-2 p-2 rounded-md mt-16 h-[495px] bg-violet-50">
            <div className="flex flex-row w-full justify-between">
              <h1 className="font-bold text-lg text-center m-auto">
                In te plannen Todos&apos;
              </h1>
              <button className="hover:text-slate-500"
                onClick={() => {
                  setIsListTodo(true)
                  setShowCreateModal(true)
                }
                }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>

            </div>
            <div className="h-[95%] overflow-x-clip overflow-y-scroll">
              {
                todos.map(todo => (
                  <div
                    className={`fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white bg-[${todo.backgroundColor}] `}
                    title={todo.title}
                    key={todo.id}
                    onClick={() => handleShowListTodo(todo.id)}
                  >
                    {todo.title}

                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <DeleteDialog {...{ showDeleteModal, setShowDeleteModal, handleDelete, handleCloseModal }} />

        <CreateTodoDialog {...{ newTodo, showCreateModal, setShowCreateModal, handleSubmit, handleChange, handleChangeDescr, handleCloseModal, handleAddToList, isListTodo, setIsListTodo, handleChangeColor }} />

        <ShowTodoDialog {...{ selectedTodo, showDisplayModal, setShowDisplayModal, handleDeleteModal, setTodoAsDone }}></ShowTodoDialog>

        <ShowListTodo {...{selectedTodo, showListTodoModal, setShowListTodoModal}} />

        <BrainDumpDrawer {...{ openDrawer, setOpenDrawer }} />


      </main>

    </>
  );
}
