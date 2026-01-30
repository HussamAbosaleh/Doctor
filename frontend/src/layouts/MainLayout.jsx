import Header from '../components/Header';
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
   return (
    <>
      <Header />
      <main className="flex-fill pt-5 pb-4">
        <Outlet />  
      </main>
      <Footer />   
    </>
  );
}

export default MainLayout;
