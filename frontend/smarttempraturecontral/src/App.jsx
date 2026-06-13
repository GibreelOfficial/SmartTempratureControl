import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Security from './pages/Security';
import Statistics from './pages/Statistics';

const queryClient = new QueryClient();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Dashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/security" element={<Security isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/statistics" element={<Statistics isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;