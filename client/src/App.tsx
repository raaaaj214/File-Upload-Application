import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { userApi } from './redux/api';
import { userExists, userNotExists } from './redux/userSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import FileView from './pages/FileView';
import FileUpload from './pages/FileUpload';

const App = () => {
  const { data, isLoading, isSuccess } = userApi.useGetUserQuery();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (isSuccess && data) {
      if (data.success && data.user) {
        dispatch(userExists(data.user));
      } else {
        dispatch(userNotExists());
      }
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/upload-a-file" element={isLoggedIn ? <FileUpload /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/file/:fileId" element={<FileView />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
