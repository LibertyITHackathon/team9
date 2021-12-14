import React from "react";
import "./App.css";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function Todo({ todo, index, completeTodo, removeTodo }) {
  
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      
    >
      {todo.text}
      {todo.date.toString()}
      <div>
        <button onClick={() => completeTodo(index)}>Done</button>
        <button onClick={() => removeTodo(index)}>Skip</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Tech talk session #18 : 'What is cryptocurrency?'",
      isCompleted: false,
      date: new Date()
    },
    {
      text: "Tech talk session #19 : 'How to manage your asset wallet?'",
      isCompleted: false,
      date: new Date()
    },
    {
      text: "Tech talk session #20 : 'What is React and how easy is it to use it?'",
      isCompleted: false,
      date: new Date()
    }
  ]);

  const addTodo = (text, date) => {
    const newTodos = [...todos, { text, date } ];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const [date, setDate] = useState(new Date());


  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');

  const handle = () => {
     localStorage.setItem('session_title', name);
     localStorage.setItem('session_description', pwd);
     localStorage.setItem('chosen_date', date);
     addTodo(name, date)
  };
  const remove = () => {
     localStorage.removeItem('session_title');
     localStorage.removeItem('session_description');
     localStorage.removeItem('chosen_date', date);
  };

  return (
    <div className="app">
      <h1 className='text-center'>Tech Talk Planning</h1>


      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}

            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <p> Choose a date on the calendar and enter the content of your talk session. Then press ENTER to validate. </p>
        <TodoForm addTodo={addTodo} />
      </div>
      

      <div className='calendar-container'>
      <Calendar onChange={setDate} value={date} />
      <p className='text-center'>
      <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
      </div>


      <div className="App">
          <h3>Chosen Date:</h3>
          <span className='bold'></span>{' '}
          {date.toDateString()}
          {(e) => setDate(e.target.date.toDateString())}

         <h3>Enter the title of the session:</h3>
         <input
            placeholder="Session title"
            value={name}
            onChange={(e) => setName(e.target.value)}
         />
         <h3>Description:</h3>
         <input
            placeholder="Session description"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
         />
         <div>
           <h1> Result </h1>
         </div>


         {localStorage.getItem('chosen_date') && (
            <div>
               Chosen date: <p>{localStorage.getItem('chosen_date')}</p>
            </div>
         )}

         {localStorage.getItem('session_title') && (
            <div>
              Session title: <p>{localStorage.getItem('session_title')}</p>
            </div>
         )}
         {localStorage.getItem('session_description') && (
            <div>
               Session description: <p>{localStorage.getItem('session_description')}</p>
            </div>
         )}


        <div>
            <button onClick={handle}>Done</button>
         </div>

         <div>
            <button onClick={remove}>Remove</button>
         </div>
         </div>



    </div>




    
  );
}

export default App;