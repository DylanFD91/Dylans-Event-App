import { Container } from "semantic-ui-react"
import NavBar from "./nav/NavBar"
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <NavBar />
      <Container className="main">
        <Outlet />
      </Container>
    </>  
  )
}

export default App
