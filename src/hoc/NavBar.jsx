import { Link } from "react-router-dom";

const NavBar = ({ children }) => {
  return (
    <>
      <nav className="nav-container">
        <Link href="/">Home</Link>
        <Link href="/groups/all">Groups</Link>
        <Link href="/topics/all">Topics</Link>
        <Link href="/">Profile</Link>
        <Link href="/">Sign out</Link>
      </nav>
    </>
  );
};
export default NavBar;
