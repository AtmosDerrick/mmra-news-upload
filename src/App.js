import "./App.css";
import HomePage from "./pages/HomePage";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreateNews from "./pages/CreateNews";
import EditNews from "./pages/EditNews";
import { AuthContextProvider } from "./context/Auth";
import CreateTips from "./pages/CreateTips";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="w-full xl:w-3/4 xl:mx-auto px-0 lg:px-8 ">
      <AuthContextProvider>
        <Nav />
        <Routes>
          <Route index element={<HomePage />} />
          <Route exact path="/" element={<PrivateRoute />}>
            {" "}
            <Route path="/mainpage" element={<MainPage />} />{" "}
            <Route path="/createNews" element={<CreateNews />} />
            <Route path="/createtips" element={<CreateTips />} />{" "}
            <Route path="/edit" element={<EditNews />} />
            <Route path="/" element={<HomePage />} />{" "}
          </Route>
        </Routes>{" "}
      </AuthContextProvider>
    </div>
  );
}

export default App;
