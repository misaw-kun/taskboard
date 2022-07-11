import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./components/Dashboard";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import NotFound from "./components/NotFound";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
