import { Redirect, Route, useLocation } from "wouter";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup";
import Index from "./components/Index";
import {
  Button,
  ButtonGroup,
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavbarBrand,
} from "react-bootstrap";
import { axiosClient } from "./utils";
import { useAuthContext } from "./components/useAuthContext";
import ProfileEdit from "./components/ProfileEdit";
import { useState } from "react";

function App() {
  const [location, setLocation] = useLocation();
  const [profileEdit, setProfileEdit] = useState(false);
  const info = useAuthContext();

  async function logout() {
    await axiosClient.get("user/logout");
    setLocation("/login");
  }

  return (
    <div>
      {profileEdit ? (
        <ProfileEdit show={profileEdit} setShow={setProfileEdit}></ProfileEdit>
      ) : null}
      {location == "/" ? (
        <Navbar
          style={{
            zIndex: "100",
            background: "rgba(148, 216, 255, 0.4)",
            padding: "20px",
            backdropFilter: "blur(8px)",
            position: "sticky",
            top: 0,
            left: 0,
          }}
        >
          <Container>
            <Navbar.Brand
              style={{ color: "black", fontWeight: "800", fontSize: "24px" }}
              href="#home"
            >
              monet
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Dropdown as={ButtonGroup}>
                <Button variant="success">{info.user.username}</Button>
                <Dropdown.Toggle
                  split
                  variant="success"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setProfileEdit(true)}>
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={logout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : null}
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
      <Route path="/">
        <Index></Index>
      </Route>
    </div>
  );
}

export default App;
