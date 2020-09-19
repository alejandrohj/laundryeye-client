import React from 'react'
import LAL1 from './Lal_1';
import Navbar from './Navbar';
import Footer from './footer';

export default function Main(props) {
    return (
        <div>
        <Navbar/>
        <LAL1 IronsData = {props.IronsData}/>
        <Footer/>
        </div>
    )
}
