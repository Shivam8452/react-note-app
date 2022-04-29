import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/noteState";
import  Alert  from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      tpe:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 5000);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
          
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
