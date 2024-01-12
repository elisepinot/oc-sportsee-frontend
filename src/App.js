import './styles/main.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './pages/userDashboard';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// import LeftBar from './components/LeftBar.js';
// import TopBar from './components/TopBar.js';
// import Dashboard from './components/dashboard.js';

// function App() {
//   return (
//     <div className='App'>
//       <TopBar />
//       <section className='content'>
//         <LeftBar />
//         <Dashboard />
//       </section>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={UserDashboard} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
