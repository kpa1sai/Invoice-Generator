import React from 'react';

interface HeaderProps {
  logo: string | null;
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
  return (
    <header className="App-header">
      {logo && <img src={logo} alt="Company Logo" className="App-logo" />}
      <h1>Invoice Generator</h1>
    </header>
  );
};

export default Header;
