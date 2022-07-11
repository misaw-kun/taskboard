import { Container } from "react-bootstrap";

import "./contain.scoped.css";

export default function Contain({ children }) {
  return (
    <Container
      className="d-flex align-items-center justify-content-center contain"
      fluid
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        {children}
      </div>
    </Container>
  );
}
