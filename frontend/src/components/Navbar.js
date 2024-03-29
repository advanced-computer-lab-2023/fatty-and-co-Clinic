import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  NavbarBrand,
} from "reactstrap";

function CustomNavbar() {
  return (
    <Navbar className="my-2" color="dark" dark>
      <NavbarBrand href="/" style={{ fontWeight: "bold" }}>
        {/* <img
          alt="logo"
          src="/logo-white.svg"
          style={{
            height: 40,
            width: 40,
          }}
        /> */}
        Fatty Clinic
      </NavbarBrand>
    </Navbar>
  );
}

export default CustomNavbar;
