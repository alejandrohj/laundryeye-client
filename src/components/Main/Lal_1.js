import React from 'react'
import {PUBLIC_URL} from '../../config';

export default function Lal_1(props) {
    const LAL1Data = props.IronsData.find((data)=>{
        return data.iron = 1
    })
    if(!LAL1Data) return <p>Loading...</p>
    console.log(LAL1Data)
    // let LAL1DataRT = LAL1Data[LAL1Data.length]
    return (
        <div style={{margin: '40px', width: '500px', textAlign: 'center'}}>
            <h4>Linea de acabado liso nº1</h4>
            <div style={{display: 'flex', alignItems:'center'}}>
                <img src={`${PUBLIC_URL}/PlanoPlantaLAL.jpg`} height='400' alt='LAL1'/>
                <div style={{border: '1px solid gray', padding: '10px', alignSelf: 'flex-start', marginTop: '10px', textAlign: 'left'}}>
                    <p>Programa: <b>{LAL1Data.productivity.program}</b></p>
                    <p>Velocidad: <b>{LAL1Data.productivity.speed}%</b></p>
                    <p>Temperatura: <b>{LAL1Data.productivity.temperature}ºC</b></p>
                </div>
            </div>
        </div>
    )
}
