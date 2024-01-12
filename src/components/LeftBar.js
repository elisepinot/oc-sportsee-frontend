import iconZen from '../assets/icon-zen.svg';
import iconSwim from '../assets/icon-swim.svg';
import iconBicycle from '../assets/icon-bicycle.svg';
import importWeight from '../assets/icon-weight.svg';
function LeftBar() {
  return (
    <aside className='left-bar'>
      <nav>
        <img src={iconZen} alt='icon-zen'></img>
        <img src={iconSwim} alt='icon-swim'></img>
        <img src={iconBicycle} alt='icon-bicycle'></img>
        <img src={importWeight} alt='icon-weight'></img>
      </nav>
      <p>Copiryght, SportSee 2023</p>
    </aside>
  );
}

export default LeftBar;
