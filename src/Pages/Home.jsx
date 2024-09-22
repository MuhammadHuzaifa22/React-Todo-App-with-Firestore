import React, { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Configurations/FirebaseConfig";


const Home = () => {
  let [todo, setTodo] = useState([]);
  const inputValue = useRef();
 async function addTodo(event) {
    event.preventDefault();
    
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo:inputValue.current.value
      });
      todo.push({
        todo:inputValue.current.value,
        id:docRef.id
      })
      setTodo([...todo]);
      console.log(todo)
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

 async  function editTodo(index) {
    const newValue = prompt("Enter new value");
    todo[index].todo = newValue
    setTodo([...todo]);

  
const washingtonRef = doc(db, "todos", todo[index].id);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  todo:newValue,
  id:todo[index].id

});
  }
  function deleteFunction(index) {
    todo.splice(index, 1);
    setTodo([...todo]);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Todo App
        </h2>
        <form className="flex items-center space-x-4">
          <input
            type="text"
            ref={inputValue}
            placeholder="Add your new task"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={addTodo}
          >
            <span className="mr-2">Add</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </div>

      <ul>
        {todo.length > 0 ? (
          todo.map((item, index) => {
            return (
              <div key={index}>
                <li>
                  {item.todo}
                  <button
                    className="btn btn-primary"
                    onClick={() => editTodo(index)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-primary" onClick={() => deleteFunction(index)}>
                    Delete
                  </button>
                </li>
              </div>
            );
          })
        ) : (
          <h1>No Todo Found</h1>
        )}
      </ul>
    </div>
  );
};

export default Home;
