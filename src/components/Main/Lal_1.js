import React from 'react'
import {PUBLIC_URL} from '../../config';


export default function Lal_1(props) {
    const LALData = props.LAL1Data;
    const LALData_RT = LALData[LALData.length-1]
    console.log(LALData_RT )
    if(!LALData) return <p>Loading...</p>
    return (
        <div style={{margin: '40px', width: '500px', textAlign: 'center'}}>
            <h4>Linea de acabado liso Nº1</h4>
            <div style={{display: 'flex', alignItems:'center'}}>
                <img src={`${PUBLIC_URL}/PlanoPlantaLAL.jpg`} height='400' alt='LAL1'/>
                <div style={{border: '1px solid gray', padding: '10px', alignSelf: 'flex-start', marginTop: '10px', textAlign: 'left'}}>
                    <p>Estado:<b>{LALData_RT.status}</b></p>
                    <p>Programa: <b>{LALData_RT.productivity.program}</b></p>
                    <p>Velocidad: <b>{LALData_RT.productivity.speed}%</b></p>
                    <p>Temperatura: <b>{LALData_RT.productivity.temperature}ºC</b></p>
                </div>
            </div>
        </div>
    )
}
