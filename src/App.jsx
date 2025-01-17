import Header from './Components/Header/Header';
import './index.css';
import ActivityForm from './Pages/ActivityForm/ActivityForm';
import ActivityList from './Pages/ActivityList/ActivityList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditActivity from './Pages/EditActivity/EditActivity ';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ActivityList />} />
        <Route path="/add-activity" element={<ActivityForm />} />
        <Route path="/edit-activity/:id" element={<EditActivity />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
