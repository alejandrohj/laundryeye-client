import React,{useState, useEffect} from 'react'
import LAL1 from './Lal_1';
import LAL2 from './Lal_2';
import Navbar from './Navbar';
import Footer from './footer';
import axios from 'axios';
import {API_URL} from '../../config';

export default function Main() {
    const [IronsData, setIronsData] = useState(null)
    const [LAL1Data, setLAL1Data] = useState(null)
    const [LAL2Data, setLAL2Data] = useState(null)
    useEffect(()=>{
        axios.get(`${API_URL}/ironsdata`)
            .then((res)=>{
                setIronsData(res.data)
                const lal1Data = res.data.filter((data)=>{
                return data.iron === 1
                })
                const lal2Data = res.data.filter((data)=>{
                    return data.iron === 2
                })
                setLAL1Data(lal1Data)
                setLAL2Data(lal2Data)
                setInterval(loadData,2000)
            })
    },[])
    const loadData = () =>{
        axios.get(`${API_URL}/ironsdata`)
            .then((res)=>{
                setIronsData(res.data)
                const lal1Data = res.data.filter((data)=>{
                return data.iron === 1
                })
                const lal2Data = res.data.filter((data)=>{
                    return data.iron === 2
                })
                setLAL1Data(lal1Data)
                setLAL2Data(lal2Data)
            })
    }
    if(!LAL1Data || !LAL2Data) return <p>Loading...</p>
    return (
        <>
        <Navbar/>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <LAL1 LAL1Data = {LAL1Data}/>
            <LAL2 LAL2Data = {LAL2Data}/>
        </div>
        <Footer/>
        </>
    )
}
