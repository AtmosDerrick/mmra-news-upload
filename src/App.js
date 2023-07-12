import "./App.css";
import HomePage from "./pages/HomePage";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateNews from "./pages/CreateNews";
import EditNews from "./pages/EditNews";

function App() {
    return ( <
        div className = "w-full xl:w-3/4 xl:mx-auto px-8 " >
        <
        Nav / >

        <
        Routes >
        <
        Route index element = { < HomePage / > }
        /> <
        Route path = "/mainpage"
        element = { < MainPage / > }
        /> <
        Route path = "/createNews"
        element = { < CreateNews / > }
        /> <
        Route path = "/edit"
        element = { < EditNews / > }
        />

        <
        Route path = "/"
        element = { < HomePage / > }
        /> < /
        Routes > <
        /div>
    );
}

export default App;