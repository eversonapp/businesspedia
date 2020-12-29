import Navbar from "./Navbar";
import './Main.scss'
import BusinessCard from "./BusinessCard";

export default function App(){
    let centerContent = {display: "flex", justifyContent: "center"}
    let mainContainer = { margin: "10vh 2vw", width: "100%", maxWidth: "960px"}

    return (
        <div style={centerContent}>
            <Navbar/>
            <main style={mainContainer}>
                <BusinessCard/>
            </main>
        </div>
    )
}