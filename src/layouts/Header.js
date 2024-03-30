import React from 'react';
import { BsJustify } from 'react-icons/bs';
import '../assets/sass/style.scss';

function Header({type,OpenSidebar}) {
  
    return (
      <header className="header shadow">
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <h3 className="fs-5">Welcome {type}!</h3>
        </div>
      </header>
    );
  };

export default Header;
