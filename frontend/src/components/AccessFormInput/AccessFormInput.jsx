import React from "react";

function AccessFormInput({id, type, labelText, value, onChange, errorText}) {
  return <div>
    <label htmlFor={id}
           className="text-white block mb-1">{labelText}</label>
    <input className="w-full bg-[#050409] text-white p-1 border border-zinc-700"
           value={value}
           type={type} id={id}
           onChange={onChange}/>
    {errorText ? <span className="text-red-500">{errorText}</span> : <></>}
  </div>;
}

export default AccessFormInput;