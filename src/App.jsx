import Login from "./pages/Login";
import FoldrPage from "./pages/FoldrPage";

function App() {

  const path = window.location.pathname;

  if (path === "/folders") {
    return <FoldrPage />;
  }

  return <Login />;
}

export default App;