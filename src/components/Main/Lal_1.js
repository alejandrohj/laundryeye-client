import React from 'react'
import {PUBLIC_URL} from '../../config';


export default function Lal_1(props) {
    let estado;
    let color;
    const LALData = props.LAL1Data;
    const LALData_RT = LALData[LALData.length-1]
    const statusUIManagement = (stat) =>{
        switch(stat){
            case 'operating': estado = 'Operando'; color = '#4287f5'; break;
            case 'non-operating': estado = 'No operando'; color = '#4a576b';break;
            case 'waiting': estado = 'Esperando'; color = '#d65600'; break;
            case 'emergency': estado = 'Emergencia'; color = '#e30400'; break;
            case 'off': estado = 'Apagada'; color = '#787778'; break;
            default: estado = 'No definido'; color = '#787778'; break;
        }
    }
    if(!LALData) return <p>Loading...</p>
    statusUIManagement(LALData_RT.status);
    return (
        <div style={{margin: '40px', width: '500px', textAlign: 'center'}}>
            <h4>Linea de acabado liso Nº1</h4>
            <div style={{display: 'flex', alignItems:'center'}}>
                <img className="lalImg" src={`${PUBLIC_URL}/PlanoPlantaLAL.jpg`} alt='LAL1'/>
                <div style={{border: '1px solid gray', padding: '10px', alignSelf: 'flex-start', marginTop: '10px', textAlign: 'left'}}>
                    <p>Estado:<b style={{color: color}}>{estado}</b></p>
                    {
                    LALData_RT.status !== 'off'?(<>
                        <p>Programa: <b>{LALData_RT.productivity.program}</b></p>
                        <p>Velocidad: <b>{LALData_RT.productivity.speed}%</b></p>
                        <p>Temperatura: <b>{LALData_RT.productivity.temperature}ºC</b></p>
                        </>
                    ):('')
                    }
                    
                </div>
            </div>
        </div>
    )
}
