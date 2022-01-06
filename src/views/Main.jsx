import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import Form from '../components/Form';
import List from '../components/List';
import { Link, useHistory } from 'react-router-dom';

const Main = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();

    const changeSubmitted = () => {
        setSubmitted(!submitted)
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                setUsers(res.data);
                setSubmitted(res.data);
            })
            .catch(err => console.error(err));
    }, [submitted]);

    const removeFromDom = userId => {
        setUsers(users.filter(user => user._id !== userId));
    }

    return (
        <div>
            <h1>Pirate Crew</h1>
            <button onClick={(e) => history.push('/new_user')}>
                Add Pirate
            </button>
            <hr />
            {submitted && <List users={users} removeFromDom={removeFromDom} />}
        </div>
    );
}

export default Main;