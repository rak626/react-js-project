import { useEffect, useState } from 'react'
import { TodoContextProvider } from './context'
import { TodoForm, TodoItem } from './components'

function App() {
    const [todos, setTodos] = useState([])

    // defining all the context api functions
    const addTodo = (todo) => {
        setTodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos])
    }

    const updateTodo = (id, todo) => {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
        )
    }

    const deleteTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.filter((prevTodo) => prevTodo.id !== id)
        )
    }

    const toggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, completed: !prevTodo.completed }
                    : prevTodo
            )
        )
    }

    // creating local storage
    useEffect(() => {
        const localTodos = JSON.parse(localStorage.getItem('todos'))
        if (localTodos && localTodos.length > 0) {
            setTodos(localTodos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    return (
        <TodoContextProvider
            value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
            <div className='bg-[#172842] min-h-screen py-8'>
                <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
                    <h1 className='text-2xl font-bold text-center mb-8 mt-2'>
                        Manage Your Todos
                    </h1>
                    <div className='mb-4'>
                        <TodoForm />
                    </div>
                    <div className='flex flex-wrap gap-y-3'>
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                            <div key={todo.id} className='w-full'>
                                <TodoItem todo={todo}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoContextProvider>
    )
}

export default App
