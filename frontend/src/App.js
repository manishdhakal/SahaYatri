import React, {useState} from 'react';
import axios from 'axios'
import url from './djangoURL'
import cookie from 'react-cookies'


function App() {
  const [text, setText] = useState('')
  const [id,setId] = useState('')
  
  const api =  ()=> {
    axios.get(url+'/new-user')
    .then((resp) => setText(resp.data))
    .catch((err) => console.log(err))
  }

  const saveCookie = ()=> {
    cookie.save('userID', '563255', {path:'/'})
  }


  const getCookie = ()=> {
    setId(cookie.load('userID'))
  }

  return (
    <div>
      <button onClick={ api}>press me</button>
      <p>{text}</p>
      <button onClick={ saveCookie }>set cookie</button>
      <button onClick={ getCookie }>get cookie</button>
      <p>{ id }</p>
    </div>
  );
}

export default App;
