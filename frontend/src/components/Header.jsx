import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate("/")}>
            BulSU System
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Button
                  className="nav-link "
                  onClick={() => navigate("/")}
                  variant="outline-primary"
                >
                  Home
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  className="nav-link "
                  onClick={() => navigate("/login")}
                  variant="outline-primary"
                >
                  Login
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  className="nav-link "
                  onClick={() => navigate("/register")}
                  variant="outline-primary"
                >
                  Register
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
