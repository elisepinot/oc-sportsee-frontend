import logo from '../assets/logo.svg';

function TopBar() {
  return (
    <header className='top-bar'>
      <div className='logo'>
        <img src={logo} alt='logo'></img>
      </div>
      <nav className='menu'>
        <ul>
          <li>Accueil</li>
          <li>Profil</li>
          <li>Réglage</li>
          <li>Communauté</li>
        </ul>
      </nav>
    </header>
  );
}

export default TopBar;
