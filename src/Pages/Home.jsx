import React, { useEffect, useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Configurations/FirebaseConfig";
import { deleteDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

const Home = () => {
  let [todo, setTodo] = useState([]);
  const inputValue = useRef();
  let [addButtonLoading, setAddButtonLoading] = useState(false);
  let [loadingIndex,setLoadingIndex] = useState(null);
 let [editIndex,setEditIndex] = useState(null);

  useEffect(() => {
    async function getDataFromFirestore() {
      const querySnapshot = await getDocs(collection(db, "todos"));
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        todo.push({ id: doc.id, ...doc.data() });
        setTodo([...todo]);
      });
    }
    getDataFromFirestore();
  }, []);

  async function addTodo(event) {
    event.preventDefault();
    if (inputValue.current.value === null || inputValue.current.value === "") {
      return;
    }

    try {
      setAddButtonLoading(true);
      const docRef = await addDoc(collection(db, "todos"), {
        todo: inputValue.current.value,
      });
      todo.push({
        todo: inputValue.current.value,
        id: docRef.id,
      });
      setTodo([...todo]);
      console.log(todo);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      setAddButtonLoading(false);
    }
    setAddButtonLoading(false);
    inputValue.current.value = "";
  }

  async function editTodo(index) {
    const newValue = prompt("Enter new value");
    if (newValue === "" || newValue === null) return;
    
    todo[index].todo = newValue;
    setTodo([...todo]);
    setEditIndex(index);
    
    const washingtonRef = doc(db, "todos", todo[index].id);
    
    await updateDoc(washingtonRef, {
      todo: newValue,
    });
  }

  async function deleteFunction(index) {
  if(editIndex === index){
   setEditIndex(null)
  }

    setLoadingIndex(index)
    await deleteDoc(doc(db, "todos", todo[index].id));
    todo.splice(index, 1);
    setTodo([...todo]);
    setLoadingIndex(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col pt-[50px]">
      <div className="bg-slate-200 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-green-500 mb-6">
          Todo App
        </h2>
        <form className="flex items-center space-x-4">
          <input
            type="text"
            ref={inputValue}
            placeholder="Add your new task"
            className="flex-1 px-4 py-[5px] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className={`flex items-center bg-green-500 hover:bg-green-600  text-md text-white p-[5px] rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 ${
              addButtonLoading ? "animate-pulse" : ""
            }`}
            disabled={addButtonLoading}
            onClick={addTodo}
          >
            <span className="mr-2">
              {addButtonLoading ? "Adding..." : "Add"}
            </span>
            {addButtonLoading ? null : (
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
            )}
          </button>
        </form>
      </div>

      <ul className="mt-[50px]">
        {todo.length > 0 ? (
          todo.map((item, index) => {
            return (
              <div key={index} className="mt-[5px]">
                <li className={`w-[300px] flex justify-between p-[5px] rounded-md mb-[5px] flex-wrap ${editIndex === index ? "bg-slate-400 font-medium" : "bg-slate-200"}`}>
                  <span className="break-words overflow-hidden text-ellipsis whitespace-normal">
                    {item.todo}
                  </span>
                  <div className="flex gap-[10px] ">
                    <button
                      className="bg-green-500 text-sm p-[5px] active:shadow-sm active:shadow-white rounded-md hover:bg-green-600 text-white"
                      onClick={() => editTodo(index)}
                    >
                      {editIndex === index ? "Edited" : "Edit" }
                    </button>
                    <button
                      className="bg-red-500 text-sm p-[5px] active:shadow-sm active:shadow-white rounded-md hover:bg-red-600 text-white"
                      onClick={() => deleteFunction(index)}
                    >
                      {loadingIndex === index ? "Deleting..." : "Delete"}
                    </button>
                  </div>
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
