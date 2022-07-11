import { Navigate } from "react-router-dom";
import Header from "./Header";
import Taskboard from "./Taskboard/Taskboard";

export default function Dashboard({ user }) {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header user={user} />
      <Taskboard user={user} />
    </>
  );
}
