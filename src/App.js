import Navbar from "./Navbar";
import './Main.scss'
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