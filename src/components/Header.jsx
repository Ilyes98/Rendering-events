import React from 'react';

const Header = ({ formattedDate }) => {
  return (
    <div className="header">
      <div className="today">Aujourd'hui</div>
      <div className="formatted-date">{formattedDate}</div>
    </div>
  );
};

export default Header;
