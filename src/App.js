import { useState, useEffect } from 'react'
import './App.css';

const App = () => {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if(savedTodos){
      return JSON.parse(savedTodos)
    }else{
      return [];
    }
  });

  function handleCheckedClick(todo){
    setCurrentTodo({...todo});
    if(todo.checked){
      setCurrentTodo({...todo, checked: false});
    }else{
      setCurrentTodo({...todo, checked: true});
    }

    const checkedItem = todos.map((todo) => {
      return todo.id === currentTodo.id ? currentTodo : todo;
    })

    setTodos(checkedItem);
  }



  function handleDeleteClick(id){
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(removeItem);
  }

  function handleEditClick(todo){
    setIsEditing(true);
    setCurrentTodo({...todo})
  }

  function handleUpdateTodo(id, updateTodo){
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updateTodo : todo;
    })

    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditFormSubmit(e){
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }
  

  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleEditInputChange(e){
    setCurrentTodo({...currentTodo, text: e.target.value})
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  function handleInputChange(e){
    setTodo(e.target.value);
  }

  function handleFormSubmit(e){

    e.preventDefault()
    
    if(todo !== ""){
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
          checked: false
        }
      ])
    }

    setTodo("");
  }
  

  return (
    <div className="App">
      <div className='container'>
        <h1>Todo List</h1>

        {isEditing ? (
          <form onSubmit={handleEditFormSubmit}>
            <h2>Edit Todo</h2>
            <input
              type='text'
              name='editTodo'
              placeholder='แก้ไข Todo'
              value={currentTodo.text}
              onChange={handleEditInputChange}
            />
            <div className='flex-button'>
            <button className='update' type='submit'>Update</button>
            <button className='cancel' onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <h2>Add Todo</h2>
            <input 
              type="text"
              name="todo"
              placeholder="สร้าง Todo ใหม่"
              value={todo}
              onChange={handleInputChange}
            />
            <button type='submit'>Add</button>
          </form>
        )}
        
        
        <ul className='todo-list'>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.checked ? (
                <li key={todo.id}>
                  <s>{todo.text}</s>
                  <div className='flex-button'>
                    <button className='checked' onClick={() => handleCheckedClick(todo)}>Checked/Unchecked</button>
                    <button className='edit' onClick={() => handleEditClick(todo)}>Edit</button>
                    <button className='delete' onClick={() => handleDeleteClick(todo.id)}>Delete</button>
                  </div>
                </li>
              ) : (
                <li key={todo.id}>
                  {todo.text}
                  <div className='flex-button'>
                    <button className='checked' onClick={() => handleCheckedClick(todo)}>Checked/Unchecked</button>
                    <button className='edit' onClick={() => handleEditClick(todo)}>Edit</button>
                    <button className='delete' onClick={() => handleDeleteClick(todo.id)}>Delete</button>
                  </div>
                </li>
              )}
          </li>
            
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;
