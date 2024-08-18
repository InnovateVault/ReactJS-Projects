import { NewToDoForm } from "./components/NewToDoForm"
import { ToDoList } from "./components/ToDoList"
import { useState, useEffect } from "react"
import "./styles.css"



const App = () => {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addToDo(title) {
    setTodos((currentToDos) => {
      return [
        ...currentToDos, { id: crypto.randomUUID(), title, completed: false }
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentToDos => {
      return currentToDos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentToDos => {
      return currentToDos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewToDoForm onSubmit={addToDo} />
      <h1 className="header">ToDo List</h1>
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}

export default App