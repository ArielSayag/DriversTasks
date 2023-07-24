import {useState} from "react";

function InputSearch({onChange}:{onChange: any}){

  const [name,setName]=useState("");

  // const handleFormSubmit = (event: any) =>{
  //   event.preventDefault();
  //   onSubmit(name);
  // }

  const handleChange = (event :any) =>{
    event.preventDefault();
    setName(event.target.value);
    onChange( event.target.value);
  }

  return(
    <>
    {/* <form onSubmit={handleFormSubmit}> */}
      <input value={name} placeholder="Filter name.." onInput={handleChange} className="rounded border-solid border-2 border-slate-500 mt-1" />
     {/* </form> */}
    </>
  )

}

export default InputSearch