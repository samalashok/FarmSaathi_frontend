import React, { useReducer, createContext, useState } from "react";

const Context = createContext();
const UpdateContext = createContext();

const ACTION = {
    add: 'add',
    delete: 'delete',
    update: 'update',
    empty: 'empty',
    setData: 'setData'
}

const reducer = (carts, action) => {
    switch (action.type) {
        case ACTION.add:
            const newcart = carts.filter(c => c.id !== action.id);
            newcart.push({
                id: action.id, name: action.name, quantity: action.quantity, img: action.img, price: action.price, delDate: action.delDate, retDate: action.retDate
            })
            localStorage.setItem('carts', JSON.stringify(newcart))
            return [...newcart]
        case ACTION.delete:
            const newc = carts.filter(c => c.id !== action.id)
            localStorage.setItem('carts', JSON.stringify(newc));
            return [...newc];
        case ACTION.update:
            const newca = []
            for (let i = 0; i < carts.length; i++) {
                let obj = carts[i];
                if (obj.id === action.id) {
                    newca.push({ ...obj, quantity: action.quantity, retDate: action.retDate, delDate: action.delDate })
                }
                else {
                    newca.push(obj)
                }
            }
            localStorage.setItem('carts', JSON.stringify(newca));
            return [...newca];
        case ACTION.setData:
            localStorage.setItem('carts', JSON.stringify([...action.data]));
            return [...action.data]
        default:
            return carts
    }
}

export default function ContextData(props) {
    const [carts, dispatch] = useReducer(reducer, [])
    const handleAdd = (item) => {
        dispatch({ type: ACTION.add, id: item.id, name: item.name, img: item.img, price: item.price, quantity: item.quantity, delDate: item.delDate, retDate: item.retDate })
    }
    const handleDelete = (item) => {
        dispatch({ type: ACTION.delete, id: item.id })
    }
    const handleUpdate = (item) => {
        dispatch({ type: ACTION.update, id: item.id, quantity: item.quantity, delDate: item.delDate, retDate: item.retDate })
    }
    const handleSetData = (item) => {
        dispatch({ type: ACTION.setData, data: item.data })
    }

    const [address, setAddress] = useState([])
    const handleAddress = (data) => {
        setAddress(data)
    }

    const [mode, setMode] = useState(false)
    const handleMode = () => {
        console.log("changed")
        setMode(d => !d)
    }

    const listItem = ['Tractor', 'Power Tiller', 'Harvester', 'Sprayer', 'Mulcher', 'Fertilizer', 'Harrow', 'Plough', 'Seedre', 'Trailor']
    const [searchText, setSearchText] = useState()
    const handleSearch = (text) => {
        setSearchText(text)
    }
    return (
        <Context.Provider value={{ carts, address, mode, searchText, listItem }} >
            <UpdateContext.Provider value={{ handleAdd, handleDelete, handleUpdate, handleSetData, handleAddress, handleMode, handleSearch }}>
                {props.children}
            </UpdateContext.Provider>
        </Context.Provider>
    )
}

export { Context };
export { UpdateContext };
