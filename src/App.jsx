import Header from './Components/Header';
import './index.css';
import ActivityForm from './Components/ActivityForm/ActivityForm';
import ActivityList from './Components/ActivityList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditActivity from './Components/EditActivity/EditActivity ';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ActivityList />} />
        <Route path="/add-activity" element={<ActivityForm />} />
        <Route path="/edit-activity/:id" element={<EditActivity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
