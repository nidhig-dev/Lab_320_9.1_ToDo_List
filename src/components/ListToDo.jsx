import { useState, useReducer, useRef } from 'react';
import { todo } from "../utilities/data.mjs";

//import reducer
import reducer from '../reducers/todoReducer.mjs';

export default function ListToDo() {
    const [isSave, setIsSave] = useState(false);
    //id state of the todo that is being edited
    const [editId, setEditId] = useState(null);
    //value of the todo that is being updated
    const [editValue, setEditValue] = useState("");
    //value of item to be added
    const [addItem, setAddItem] = useState("");
    //ref for auto focus
    const addtodo = useRef();


    function handleAdd() {
        //If empty string is added to todo
        if (!addItem.trim()) return;
        dispatch({ type: "Add", payload: { name: addItem } });
        setAddItem("");
        addtodo.current.focus();
    }
    function handleEdit(id,title) {        
        setIsSave(true)
        setEditId(id);
        setEditValue(title);
       
    }
    function handleSave(id) {
        dispatch({ type: "Save", payload: { id, value: editValue } });
        setIsSave(false);
        setEditId(null);
    };

    const [state, dispatch] = useReducer(reducer, todo)
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type='text'
                    placeholder='what to do..'
                    className='addTodo'
                    value={addItem}
                    autoFocus
                    ref={addtodo}
                    onChange={(e) => setAddItem(e.target.value)}
                />
                <button type="submit"
                    className='btn'
                    onClick={handleAdd}>Submit</button>
            </form>
            <ul>
                {
                    //display the last added to do first
                    [...state].reverse().map((eachTodo) => (
                        // if save is not clicked and this todo is not being edited
                        (!(isSave && editId === eachTodo.id)) ?
                            <li className="listTodo" key={eachTodo.id}>
                                <input
                                    type="checkbox"
                                    name="todoCheck"
                                    checked={eachTodo.completed}
                                    onChange={() => {
                                        dispatch({
                                            type: "toggleCheck",
                                            payload: { id: eachTodo.id }
                                        })
                                    }} />
                                {eachTodo.title}

                                <button
                                    disabled={eachTodo.completed}
                                    className="btn"
                                    onClick={()=>handleEdit(eachTodo.id,eachTodo.title)}
                                >Edit
                                </button>

                                <button disabled={!eachTodo.completed}
                                    className="btn"
                                    onClick={() => {
                                        dispatch({
                                            type: "Delete",
                                            payload: {
                                                id: eachTodo.id
                                            }
                                        })
                                    }}>Delete</button>

                            </li>
                            : 
                            // if save is clicked and this todo is being edited
                            <li className="listTodo"
                                key={eachTodo.id}>
                                <input type="text"
                                    name="saveTodo"
                                    className='saveTodo'
                                    value={editValue}
                                    onChange={(e) => {
                                        setEditValue(e.target.value)

                                    }} />

                                <button
                                    className="btn"
                                    onClick={() => {
                                        handleSave(eachTodo.id)
                                    }}>Save</button>

                            </li>
                    ))}

            </ul>

        </div>
    )
}
