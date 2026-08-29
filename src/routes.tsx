
import { Routes, Route } from 'react-router-dom';
import Home from './components/sections/Home';
import Technologies from './components/sections/Competences';
import Contact from './components/sections/Contact';
import Projects from './components/sections/Projects';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/competences" element={<Technologies />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projets" element={<Projects />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;