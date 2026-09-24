import axios from "axios";
import { useState } from "react"

function App() {

  const [fullname , setFullname] = useState("");
  const [email , setEmail ] = useState("");
  const [mobile , setMobile] = useState();
  const [password , setPassword ] = useState("")

  function submit(e){
    e.preventDefault();
    var obj ={
      fullname,
      email,
      mobile,
      password
    }

    axios.post("http://localhost:3000/api/register",obj).then((res)=>{
      console.log(res)
    })



  }

  return (
    <>
    <h1>React API</h1>
    <br />
    <form onSubmit={submit}>
      <input type="text" onChange={(event)=>setFullname(event.target.value)}/> <br /><br />
      <input type="text" onChange={(event)=>setEmail(event.target.value)}/><br /><br />
      <input type="text" onChange={(event)=>setMobile(event.target.value)}/><br /><br />
      <input type="text" onChange={(event)=>setPassword(event.target.value)}/><br /><br />
      <button>submit</button>
    </form>
    </>
  )}

export default App
