import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";

const App= () => {
  return (
    <>
      <Header />
      <Outlet /> {/* Här laddas de olika sidorna */}
    </>
  );
};

export default App;