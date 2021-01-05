import './Main.scss'
import Navbar from "./components/Navbar";
import BusinessCard from "./components/BusinessCard";
import Footer from "./components/Footer";

export default function App(){
    return (
        <div>
            <Navbar/>
                <BusinessCard/>
            <Footer/>
        </div>
    )
}