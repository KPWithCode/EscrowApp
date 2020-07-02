import React, { useState } from 'react';
import { getWeb3 } from './utils';
import Escrow from './contracts/Escrow.json';

import './App.css';

class App extends Component {
  state = {
    web3: undefined,
    accounts: [],
    currentAccount: undefined,
    contract: undefined,
    balance: undefined
  }

  componentDidMount() {
    const web3 = await getWeb3();
    const accounts = web3.eth.getAccounts();

    const networkId = web3.eth.net.getId();
    const deployedNetwork = Escrow.networks[networkId];
    const contract = new web3.eth.Contract(
      Escrow.abi,
      deployedNetwork && deployedNetwork.address
    )
    this.setState({ web3, accounts, contract}, this.updateBalance)
  }
  update() {
    const { contract } = this.state;
    const balance = await contract.methods.balanceOf().call();
    this.setState({ balance });
  }
  deposit(e) {
    e.preventDefault();
    const { contract, accounts } = this.state;
    await contract.methods.deposit().send({
      from: accounts[0],
      value: e.target.elements[0].value
    });
  }
  render() {
    const { balance } = this.state;
    if(this.state.web3) {
      return <div>Loading....</div>
    }
    return (
      <div className="App">
       <h1> Escrow</h1>
  
       <div>
         <p> Balance:   <b>wei</b></p>
       </div>
        <div>
          <form onSubmit={e => this.deposit(e)}>
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
}

export default App;
