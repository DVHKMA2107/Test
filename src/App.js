import "./App.css"
import TodoList from "./components/TodoList"
import NewTodo from "./components/NewTodo"

function App() {
  return (
    <div className="App">
      <NewTodo />
      <TodoList />
    </div>
  )
}

export default App
