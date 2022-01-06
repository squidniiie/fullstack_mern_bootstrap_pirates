import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";

const Detail = () => {
    const { id } = useParams();
    const [userState, setUserState] = useState({})
    const history = useHistory();
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                console.log(res.data)
                setUserState(res.data)
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <button onClick={(e) => history.push('/')}>
                Aboard Ship
            </button>
            {
                (userState) ?
                    <div>
                        <h1>{userState.pirateName}</h1>
                    </div> : <h1>Loading...</h1>
            }
            <img src={userState.imgUrl} alt="img" width="400px" />
            <h1>"{userState.catchPhrase}"</h1>
            <table>
                <thead>
                    <th>About</th>
                </thead>
                <tbody>
                    <tr>Position: {userState.position}</tr>
                    <tr>Treasures: {userState.numOfTreasure}</tr>
                    <tr>Peg Leg: {pegLeg ? "Yes" : "No"}
                        <button onClick={() => setPegLeg(!pegLeg)}>{pegLeg ? "No" : "Yes"}</button>
                    </tr>
                    <tr>Eye Patch: {eyePatch ? "Yes" : "No"}
                        <button onClick={() => setEyePatch(!eyePatch)}>{eyePatch ? "No" : "Yes"}</button>
                    </tr>
                    <tr>Hook Hand: {hookHand ? "Yes" : "No"}
                        <button onClick={() => setHookHand(!hookHand)}>{hookHand ? "No" : "Yes"}</button>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Detail;