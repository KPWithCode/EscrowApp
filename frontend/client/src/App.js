import React, { Component } from 'react';
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

  async componentDidMount() {
    const web3 = await getWeb3();
    const accounts = web3.eth.getAccounts();

    const networkId =  await web3.eth.net.getId();
    const deployedNetwork = await Escrow.networks[networkId];
    const contract = new web3.eth.Contract(
      Escrow.abi,
      deployedNetwork && deployedNetwork.address
    )
    this.setState({ web3, accounts, contract}, this.update())
  }

  async update() {
    const { contract } = this.state;
    const balance = await contract.methods.balanceOf().call();
    this.setState({ balance });
  }

  async deposit(e) {
    e.preventDefault();
    const { contract, accounts } = this.state;
    await contract.methods.deposit().send({
      from: accounts[0],
      value: e.target.elements[0].value
    });
    this.update()
  }
  async release(e) {
  e.preventDefault();
  const { contract, accounts } = this.state;
  await contract.methods.release().send({
    from: accounts[0]
  });
  this.update()
  }

  render() {
    const { balance } = this.state;
    if(!this.state.web3) {
      return <div>Loading....</div>
    }
    return (
      <div className="App">
       <h1> Escrow</h1>
  
       <div>
         <p> Balance:   <b>{balance}</b>wei</p>
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
          <button onClick={e => this.release(e)} type="submit">Release</button>
        </div>
      </div>
    );
  }
}

export default App;
