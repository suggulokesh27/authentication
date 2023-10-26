import React from "react";
import SignIn from "./Component/LoginPage";
import SignUp from "./Component/SignUpPage";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Component/Home";
import DetailsForm from "./Component/detailsForm";
import Image from "./Component/image";

const App = () => {

  return(
    <BrowserRouter>
     <Home />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detailsform/:id" element={ <DetailsForm />} />
        <Route path="/image" element={ <Image />} />
      </Routes>
    </BrowserRouter>
  )
};


export default App;