import Home from './pages/Home'
import About from './pages/About';
import Gallery from './pages/Gallery';
import NewsPage from './pages/News';
import Schedule from './pages/Schedule';
import Registration from './pages/registration';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Privacy from "./pages/Privacy";
import Note from "./pages/Note";



function App() {


  return (
    <>
    <BrowserRouter>
    
     <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/gallery" element={<Gallery/>} />
    <Route path="/news" element={<NewsPage/>} />
    <Route path="/schedule" element={<Schedule/>} />
    <Route path="/registration" element={<Registration/>} />
    
  <Route path="/privacy" element={<Privacy />} />
<Route path="/note" element={<Note />} />

    
    </Routes>
    </BrowserRouter>
      </>
  )
}

export default App
