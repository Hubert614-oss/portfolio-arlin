
import { Routes, Route } from 'react-router-dom';
import Home from './components/sections/Home';
import Competences from './components/sections/Competences';
import Contact from './components/sections/Contact';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/accueil" element={<Home />} />
      <Route path="/competences" element={<Competences />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/projets" element={<Projects />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;