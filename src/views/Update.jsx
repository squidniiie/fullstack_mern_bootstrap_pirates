import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useHistory } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
            })
    }, []);

    const updateUser = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/${id}`, {
            firstName,
            lastName
        })
            .then(res => {
                history.push("/")
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                console.log(errorResponse)
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <Link to={"/"}>
                Home
            </Link>
            <p>Edit this user:</p>
            <form onSubmit={updateUser}>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                <p>
                    <label>First Name</label><br />
                    <input type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }} />
                </p>
                <p>
                    <label>Last Name</label><br />
                    <input type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }} />
                </p>
                <input type="submit" value="Update" onSubmit={(e) => history.push("/")} />
                <button onClick={(e) => history.push("/")}>Cancel</button>
            </form>
        </div>
    )
}

export default Update;