import  { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";


function App() {
  const [step, setStep] = useState("login");

    const handleLoginSuccess = () => {
    console.log("Step changed to Signup");
    setStep("signup");
  };

  const handleSignupSuccess = () => {
    setStep("todo");
  };

  const handleCreateTodoSuccess = () => {
    setStep("todo");
  };

  return (
    <div>
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
        <TodoList />
      </>

      )}
    </div>
  );
}

export default App;