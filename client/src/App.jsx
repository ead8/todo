import axios from 'axios';
import './App.css'
import Auth from './pages/Auth'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import CollectionDetail from './pages/collectionDetail';
import useStore from './store';
import {Toaster} from 'react-hot-toast'
function App() {
  const {token} =useStore()
  axios.defaults.baseURL =  import.meta.env.VITE_REACT_APP_SERVER_URL;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  return (
    <div>
      <Router>
        <Routes>
          {/* Protected homepage: only accessible if logged in */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/collection/:id" element={<ProtectedRoute>
            <CollectionDetail />
            </ProtectedRoute>}/>
          
             <Route path="/login" element={<Auth/>} />
        </Routes>
        <Toaster/>
      </Router>
      </div>
    
  );
}

export default App;
