import React, { useState, useEffect } from 'react'

const ToDo = () => {

    const getLocalData = () => {
        const lists = localStorage.getItem("toDoList")

        if (lists) {
            return JSON.parse(lists)
        }
    }

    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData)
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () => {
        if (!inputData) {
            alert("Please fill data")
        }
        else if (inputData && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputData };
                    }
                    return curElem;
                })
            );

            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newInputData])
            setInputData("")
        }
    }

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };


    const deleteItem = (index) => {
        const updatedItem = items.filter((curele) => {
            return curele.id !== index
        })

        setItems(updatedItem)
    }

    const removeAll = () => {
        setItems([])
    }

    useEffect(() => {
        localStorage.setItem("toDoList", JSON.stringify(items))
    }, [items]);
    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <i class="fa-solid fa-list-check"></i>
                        <figcaption>Add Your list here</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='Add Item' className='form-controls' value={inputData} onChange={(event) => setInputData(event.target.value)} />
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>

                    <div className='showItems'>
                        {items.map((curele, index) => {
                            return (
                                <div className='eachItem' key={curele.id}>
                                    <h3>{curele.name}</h3>
                                    <div className='todo-btn'>
                                        <i className='far fa-edit add-btn' onClick={() => editItem(curele.id)}></i>
                                        <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curele.id)}></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='showItems'><button className='btn effect04' data-sm-link-text="Remove ALL" onClick={removeAll}><span>CheckList</span></button></div>
                </div>
            </div>
        </>
    )
}

export default ToDo
