import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientLanding from './pages/ClientLanding';
import Portfolio from './pages/Portfolio/index';
import BusinessLanding from './pages/BusinessLanding';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<ClientLanding />} />
          <Route path="/business" element={<BusinessLanding />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
