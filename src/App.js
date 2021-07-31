import './App.css';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addUser} from "./actions/authAction";
import axios from "axios";

function App() {

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axios({
            method: "GET",
            url: "https://jsonplaceholder.typicode.com/users",
            headers: {"Content-Type" : "application/json"}
        }).then(res=>{
            console.log(res);
            if(res.status === 200){
                setUsers(res.data);
            }
        }).catch(error=>{
            console.log(error);
        })
    }

    const onClickButton = () => {
        dispatch(addUser(users));
    }

    useEffect(()=>{
        fetchUsers();
    },[])

    return (
        <div className="App">
            <button onClick={(e)=>onClickButton(e)} >Add to Redux</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>                
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 ?
                            users.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.address.street}</td>
                                    </tr>
                                )
                            })
                        : ''
                    }
                </tbody>
            </table>
        </div>
    );
}

export default App;
