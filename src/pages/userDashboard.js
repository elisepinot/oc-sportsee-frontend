import LeftBar from '../components/LeftBar.js';
import TopBar from '../components/TopBar.js';
import Dashboard from '../components/dashboard.js';

function UserDashboard() {
  return (
    <div className='App'>
      <TopBar />
      <section className='content'>
        <LeftBar />
        <Dashboard />
      </section>
    </div>
  );
}
export default UserDashboard;
