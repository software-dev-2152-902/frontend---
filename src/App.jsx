import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Planning from './pages/Planning';
import Credits from './pages/Credits';
import IoTMonitoring from './pages/IoTMonitoring';
import { DataProvider } from './context/DataContext';
import Education from './pages/Education';

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="planning" element={<Planning />} />
            <Route path="credits" element={<Credits />} />
            <Route path="monitoring" element={<IoTMonitoring />} />
            <Route path="education" element={<Education />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;