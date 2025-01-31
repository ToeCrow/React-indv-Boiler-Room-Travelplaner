import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

const App= () => {
  return (
    <>
      <Header />
      <Outlet /> {/* Här laddas de olika sidorna */}
      <Footer />
    </>
  );
};

export default App;