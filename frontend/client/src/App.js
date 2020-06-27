import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [web3,setWeb3] = useState();
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState();
  const [balance, setBalance] = useState();
  return (
    <div className="App">
     <h1> Escrow</h1>

     <div>
       <p> Balance:   <b>wei</b></p>
     </div>
      <div>
        <form>
          <div>
          <label> Deposit</label>
          <input type="number" placeholder="Deposit"></input>
          </div>
          {/* button for form */}
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {/* button to release funds */}
        <button type="submit">Release</button>
      </div>
    </div>
  );
}

export default App;
