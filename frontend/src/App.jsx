import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/authSlice';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Editor from './pages/Editor';
import PublicPortfolio from './pages/PublicPortfolio';

function PrivateRoute({ children }) {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [token, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/editor"
          element={
            <PrivateRoute>
              <Editor />
            </PrivateRoute>
          }
        />
        <Route path="/p/:handle" element={<PublicPortfolio />} />
        <Route path="/portfolio/:handle" element={<PublicPortfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
