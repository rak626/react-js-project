import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    todos: [{ id: nanoid(), text: 'hello world' }],
    isUpdateActive: { isActive: false, id: 1 },
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            )
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.input }
                    : todo
            )
        },
        toggleUpdate: (state, action) => {
            state.isUpdateActive = action.payload
        },
    },
})

export const { addTodo, removeTodo, updateTodo, toggleUpdate } =
    todoSlice.actions

export default todoSlice.reducer
