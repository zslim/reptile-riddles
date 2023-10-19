import React from 'react';
import LogoMain from '../../images/logo_big.png';

function Homepage(props) {
  return (
    <>
      <div className={"h-[calc(100%-52px)] fixed flex bg-inherit w-full"}>
        <div className={"max-h-full max-w-full flex mx-auto"}>
          <img src={LogoMain} alt={"main_logo"} className={"mx-auto"}/>
        </div>
      </div>
    </>
  );
}

export default Homepage;
