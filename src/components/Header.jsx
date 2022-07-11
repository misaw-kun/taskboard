import { Navbar, Container, Dropdown, Image } from "react-bootstrap";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck } from "react-bootstrap-icons";

export default function Header({ user }) {
  const navigate = useNavigate();

  async function logout() {
    await auth.signOut();
    navigate("/");
  }
  return (
    <Navbar bg="light" variant="light" expand="sm" fixed="top">
      <Container>
        <Navbar.Brand
          href="/dashboard"
          style={{ fontFamily: "monospace", fontSize: "2rem" }}
        >
          {" "}
          <ClipboardCheck /> _task_board
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ fontFamily: "monospace" }}>
            Signed in as:{" "}
            <Dropdown>
              <Dropdown.Toggle variant="dark">
                <Image
                  src={`https://picsum.photos/id/${Math.floor(
                    Math.random() * 100
                  )}/32/32`}
                  roundedCircle
                />{" "}
                {user?.email}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="light">
                <Dropdown.Item onClick={logout}>{"Sign Out"}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
