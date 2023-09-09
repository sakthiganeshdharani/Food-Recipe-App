
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Add = ()=>{
    const[fd,chfd]=useState("");
    const[title,chtitle] = useState("");
    const store=(e)=>{
        e.preventDefault();
        let obj = {fd,title};
        fetch("http://localhost:3000/food",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(obj)
        }).then((res)=>{
            toast.success("Stored");
        }).catch((err)=>{
            toast.error("Failed"+err.message);
        })
    }
    return(
        <div className="form-container">
  <form onSubmit={store}>
    <h1> Add your Recipe </h1>
    <label>Title:</label>
    <input type="text" value={title} onChange={(e) => chtitle(e.target.value)} />
    <br />
    <label>Description:</label>
    <textarea value={fd} onChange={(e) => chfd(e.target.value)}></textarea>
    <br />
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  <br />
  <Link to={"/"} className="btn btn-success">next</Link>
</div>

    )
}

export default Add;