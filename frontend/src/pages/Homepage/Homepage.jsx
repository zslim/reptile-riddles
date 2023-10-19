import React from 'react';
import LogoMain from '../../images/logo_big.png';

function Homepage(props) {
  return (
    <>
      <img src={LogoMain} alt={"main_logo"} className={"mx-auto"}/>
    </>
  );
}

export default Homepage;
