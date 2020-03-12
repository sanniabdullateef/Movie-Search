import React, {useState} from 'react';
import axios from 'axios';

import Search from './component/Search';  
import Results from './component/Results'
import Popup from './component/Popup';


function App() {
  const [state, setState] = useState({
    s:"",
    results: [],
    selected: {}
  });

  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=18e7ac8f";

  const search = (e) => {
    if (e.key === "Enter"){
      axios (apiurl + "&s=" + state.s).then(({data}) => {
        let results = data.Search;

        setState(prevState => {
          return {...prevState, results: results}
        });
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;
 
    setState(prevState => {
      return {...prevState, s: s}
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      setState(prevState => {
        return { ...prevState, selected: result}
      });
    });
  }

  const closePopup = ()=> {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  return (
    <div className="App">
      <header>
      <h1>Welcome to Movies Search</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected = {state.selected} closePopup={closePopup} /> :false}
      </main>
    </div>
  );
}

export default App;
