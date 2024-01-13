import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to={"/"}>
        <h3>İş Takip</h3>
      </Link>
      <nav>
        <NavLink to={"/"}>İş Listesi</NavLink>
        <NavLink to={"/add"}>İş Ekle</NavLink>
      </nav>
    </header>
  );
};

export default Header;
