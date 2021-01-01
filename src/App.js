import Navbar from "./Navbar";
import './Main.scss'
import BusinessCard from "./BusinessCard";

export default function App(){
    let centerContent = {display: "flex", justifyContent: "center"}
    let mainContainer = { margin: "8vh 2vw 0", width: "100%", maxWidth: "1200px"}

    return (
        <div style={centerContent}>
            <Navbar/>
            <main style={mainContainer}>
                <BusinessCard/>
            </main>
        </div>
    )
}