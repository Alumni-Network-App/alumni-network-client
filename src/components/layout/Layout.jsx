import Footer from "../footer/Footer";
import Nav from "../nav/Nav";

const Layout = ({ children }) => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Nav />

      {children}
      <Footer />
    </div>
  );
};

export default Layout;
