import React, { useEffect, useState } from 'react'
import "./Todolist.css"

// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit'
// import DeleteIcon from '@mui/icons-material/Delete';
import { GrAdd } from 'react-icons/gr';
import { MdModeEditOutline } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';
const getlocalData = ()=>{
  const lists = localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists)
  }else{
    return []
  }
}

const TodoList = () => {

    const [inputData, setinputData] = useState("")
    const [actualData, setActuaData] = useState(getlocalData())
    const [toggle ,setToggle] = useState(false);
    const [set,setset] = useState("")

 
    const inputEvent = (event) => {
        setinputData(event.target.value)
    };


    const onclick = () => {
        if (!inputData) {
            alert("pls fill the data");
        } else if (inputData && toggle){
            setActuaData(
                actualData.map((elem)=>{
                    if(elem.id === set){
                        return{...elem , name: inputData}
                    }
                    return elem;
                })
            );
            setinputData("")
            setToggle(false)
            setset(null)




        } else {
            const mynewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            };


            setActuaData([...actualData, mynewInputData]);
            setinputData("");

        }
    }

 


    const deleteitems = (index) => {
        const deleted = actualData.filter((elem) => {
            return elem.id !== index;
        });
        setActuaData(deleted);
    }


    const editItems = (index) =>{
        const editedData = actualData.find((elem)=>{
            return elem.id === index
        }) 
         setset(index);
         setinputData (editedData.name)
         setToggle(true)
    }

    const removeAll = () => {
        setActuaData([])
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(actualData));
    },[actualData]);


    return (
        <>
            <div className="mainone">
                <div className="main">


                    <h1>📝</h1>

                    <p>Add Your List Here✌️ </p>

                    <div className="inputbtn">
                        <input type="text" placeholder='✍️ Add item' value={inputData} onChange={inputEvent} />



                        {toggle ? (<MdModeEditOutline className='edit'  onClick={onclick}/>) : (<GrAdd className='plus' onClick={onclick} />)}
                        
                    </div>
                    {actualData.map((elem) => {
                        return (
                            <>
                                <div className="inputbtn items" key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className="todo-btn">
                                        <MdModeEditOutline className='edit'  onClick={() => editItems(elem.id)}/>
                                        <AiFillDelete style={{fontSize: "40px"}}   onClick={() => deleteitems(elem.id)} />
                                    </div>
                                </div>
                            </>
                        )
                    })}


                    <div className="showItems">
                        <button className="btn effect04" datatype='data-sm-link-text' onClick={removeAll}>
                            <span>REMOVE ALL</span>
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export { TodoList }
