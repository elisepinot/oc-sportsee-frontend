import PropTypes from 'prop-types';

function FoodIndicator({ icon, title, value, className }) {
  return (
    <div className={`food-indicator ${className}`}>
      <div className='food-indicator-icon-container'>
        <img src={icon} alt={`${className}-icon`} />
      </div>
      <div className='text-content'>
        <p className='indicator-value'>{value}</p>
        <p className='indicator-title'>{title}</p>
      </div>
    </div>
  );
}

export default FoodIndicator;

FoodIndicator.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string.isRequired,
};
