import './Main.scss'
import Navbar from "./Navbar";
import BusinessCard from "./BusinessCard";
import Footer from "./Footer";

export default function App(){
    return (
        <div>
            <Navbar/>
                <BusinessCard/>
            <Footer/>
        </div>
    )
}