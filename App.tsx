import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import PhotoWall from './components/PhotoWall';
import TravelLog from './components/TravelLog';
import TravelAlbum from './components/TravelAlbum';
import Resume from './components/Resume';
import BlogList from './components/BlogList';
import Login from './components/Login';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/photos" element={<PhotoWall />} />
              <Route path="/travel" element={<TravelLog />} />
              <Route path="/travel/:id" element={<TravelAlbum />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;