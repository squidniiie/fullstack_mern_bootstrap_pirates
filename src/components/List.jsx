import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const List = (props) => {
    const { removeFromDom } = props;
    const { submitted } = props;
    const [users, setUsers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.error(err));
    }, [submitted])

    const deleteUser = (userId) => {
        axios.delete('http://localhost:8000/api/users/' + userId)
            .then(res => {
                removeFromDom(userId)
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <fieldset>
                {props.users.map((user, idx) => {
                    return <p key={idx}>
                        <p>{user.pirateName}</p>
                        <img src={user.imgUrl} alt="img" width="200px" />
                        <button onClick={(e) => { deleteUser(user._id) }}>
                            Walk the Plank
                        </button>
                        <button onClick={(e) => history.push(`users/${user._id}`)}>
                            View Pirate
                        </button>
                    </p>
                })}
            </fieldset>
        </div>
    )
}

export default List;