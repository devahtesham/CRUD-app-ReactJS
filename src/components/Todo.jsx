import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import React, { useState ,Fragment} from "react";

const Todo = () => {
const [todo,setTodo]=useState("")
const [allTodos,setAllTodos] = useState([])

// state for convert todo box into input field when edit buttonm clicks
const [indexNum,setIndexNum] = useState("")
const [updatedVal,setUpdatedVal] = useState("")

const addTodo = (e)=>{
    setTodo(e.target.value)
}

const addTodoHandler = ()=>{
    if (!todo){
        alert("Required Fields are missing !");
        return
    }
    setAllTodos([...allTodos,todo])
    setTodo("")
}

const deleteTodoHandler = (index)=>{
    // logic 1
    // allTodos.splice(index,1)
    // setAllTodos([...allTodos])

    // logic 2
    const filteredItems = allTodos.filter((item,item_index) => item[item_index] !== item[index] )
    setAllTodos([...filteredItems])
}

const editTodoHandler = (value,index)=>{
    
    // logic 1
    // const updatedValue = prompt("Enter Updated value ..",value)
    // allTodos[index] = updatedValue;
    // setAllTodos([...allTodos])

    // logic 2
    setUpdatedVal(allTodos[index])
    console.log("updatedVal",updatedVal);
}

const deleteAllHandler = ()=>{
    setAllTodos([])
}

// this function is only when we use second approach of updating todo by converting div into input field
const updateTodoHandler = (index)=>{
        if (!updatedVal){ 
            alert("Update value is missing !!")
            return
        }

        // logic 1
        // allTodos[index] = updatedVal;

        // logic 2
        allTodos.splice(index,1,updatedVal)

        setAllTodos([...allTodos])
        setIndexNum("")

}
  return (
    <div className="container">
      <h1 className="text-center mb-1 bg-dark text-white py-3 mt-4 mb-3">TODO APPLICATION</h1>
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <section
            className="d-flex justi
          fy-content-between align-items-center mt-4"
          >
            <input
              className="form-control w-75"
              type="text"
              placeholder="Enter your Todo"
              onChange={addTodo}
              value={todo}
            />
            <br />
            <button className="btn btn-primary mx-3" onClick={addTodoHandler}>
              Add New Todo
            </button>
            <button className="btn btn-danger" onClick={deleteAllHandler}>
              Delete All
            </button>
          </section>
        </div>
        <div className="col-lg-8 mt-5">
          <section>
            {
                allTodos.length > 0 ? 
                allTodos.map((v,i)=>
                    <Fragment key={i}>
                        {
                            indexNum === i ?
                            (
                                <div key={i} className="mb-3">
                                    <input
                                        className="form-control mb-2" 
                                        autoFocus 
                                        onChange={(e)=>{
                                            setUpdatedVal(e.target.value)
                                        }} 
                                        value={updatedVal}
                                    />
                                    <button 
                                        className="btn btn-warning" 
                                        onClick={()=>{
                                            updateTodoHandler(i)
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            )
                            : (
                                <div 
                                    key={i}
                                    className="alert alert-danger d-flex justify-content-between align-items-center pb-3 mb-4 item text-dark">
                                    {v}
                                    <div className="d-flex align-items-center gap-2">
                                        <span onClick={()=>{
                                            deleteTodoHandler(i)
                                        }}>
                                            <MdDelete
                                                size={25}
                                                color={"black"}
                                            />
                                        </span>

                                        <span onClick={()=>{
                                            setIndexNum(i)
                                            editTodoHandler(v,i)

                                        }}>
                                            <BiEdit
                                                size={25}
                                                color={"black"}
                                            />
                                        </span>
                                    </div>
                                </div> 
                            )
                        }
                    </Fragment>
                )
                : 
                <h1 className="text-center">Empty !</h1>
            }
          </section>
        </div>
      </div>
    </div>
  );
}

export default Todo;
