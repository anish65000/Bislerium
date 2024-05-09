import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './Component/RegiterPage';
import BlogList from './Component/GetBlog';
import HomePage from './Component/HomePage';
import LoginPage from './Component/LoginPage';
import CreateBlog from './Component/PostBlog';

function App() {
  return (
    <div className="App">
    
        <BrowserRouter>
          <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/BlogList" element={<BlogList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Homepage" element={<HomePage />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />

          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
