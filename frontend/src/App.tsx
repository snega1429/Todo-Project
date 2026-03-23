import  { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import "./index.css";


function App() {
  const [step, setStep] = useState("login");
  const [refresh, setRefresh] = useState(false);

    const handleLoginSuccess = () => {
    setStep("signup");
  };

    const handleSignupSuccess = () => {
    setStep("todo"); 
};

  

  const handleCreateTodoSuccess = () => {
    setRefresh(prev => !prev);
  };


  return (
    <div className="container">
      <div className="card"></div>
      <h1>Todo App</h1>

      {step === "login" && (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}

      {step === "signup" && (
        <Signup onSignupSuccess={handleSignupSuccess} />
      )}

      {step === "todo" && (
      <>
        <CreateTodo onCreateTodoSuccess={handleCreateTodoSuccess} />
        <TodoList refresh={refresh} />
      </>

      )}
    </div>
  );
}

export default App;