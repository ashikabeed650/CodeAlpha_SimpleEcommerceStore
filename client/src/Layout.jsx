import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main className="route-page" key={location.key}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;