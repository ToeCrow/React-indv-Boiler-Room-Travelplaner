import Header from './Components/Header';
import './index.css';
import ActivityForm from './Components/ActivityForm/ActivityForm';
import ActivityList from './Components/ActivityList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ActivityList />} />
        <Route path="/add-activity" element={<ActivityForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
