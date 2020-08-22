import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [doc, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [fetched, setFetched] = useState([]);

  const handleSubmit = async () =>{

    const filedata = new FormData();
    filedata.append('docs', doc);
    filedata.append('name', name);
    filedata.append('email', email);

    console.log(filedata);

    await axios.post("http://localhost:4000/upload",filedata)
    .then(res =>{
      setMsg("File Uploaded");
      console.log(res);
      console.log(msg);
      alert(msg);
      setName('');
      setEmail('');
      setFile('');
    })
    .catch(err =>{
      setMsg("Please enter name or upload file");
      console.log(err);
      console.log(msg);
      alert(msg);
    });
   
  }

  useEffect(() => {
    async function fetchData() {
       await axios.post("http://localhost:4000/getprofile")
      .then(res =>{
        console.log(res);
        setFetched(res.data);
      })
      .catch(err =>{
        console.log(err);
      });
      // ...
    }
    fetchData();
  }, []);

  return (
    <div className="App">
     <div className="contact-card">
       <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} placeholder="enter your name" />
       <input type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="enter your email" />
       <input type="file" name="docs"  onChange={(e) => {
         setFile( e.target.files[0]);
       }} 
       />
       <button type="button" onClick={handleSubmit}>Submit</button>
     </div>
     <div className="show-cards">
       <table>
         <thead>
           <tr>
             <th>Name</th>
             <th>Email</th>
             <th>Photos</th>
             <th>File Name</th>
           </tr>
         </thead>
         <tbody>
         {
         fetched.map(data=>{
         return <tr><td>{data.name}</td><td>{data.email} </td><td><img  src={data.file_url} alt={data.file_orgname} /></td><td>{data.file_orgname}</td></tr>
         })
       }
       </tbody>
       </table>
     </div>
    </div>
  );
}

export default App;
