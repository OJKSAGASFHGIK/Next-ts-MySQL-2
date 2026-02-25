import Navbar from "./navbar/page";
import Footer from "./footer/page";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <>
        <Navbar/>
            {children}
        <Footer/>
      </>
    );
}

export default Layout;
