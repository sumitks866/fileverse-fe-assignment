import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import Balance from "../components/wallet/balance"
import { injected } from "../components/wallet/connectors"
import NFTContainer from "../components/wallet/NFTContainer"


export default function Home() {
 
  const { active, account, library, connector, activate, deactivate, chainId } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
      const {ethereum} = window;
      if(!ethereum) {
        throw "You do not have Metamask installed"
      }
      localStorage.setItem('walletConnected', true)
    } catch (err) {
      alert(err)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('walletConnected', false)
    } catch (err) {
      alert(err)
    }
  }

  useEffect(async () => {
    if (localStorage?.getItem('walletConnected') === 'true') {
      try {
        await activate(injected)
        localStorage.setItem('walletConnected', true)
      } catch (err) {
        console.log(err)
        localStorage.setItem('walletConnected', false)
        alert(err)
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center bg-neutral-100 min-h-screen">
    
      {!active && 
      <div className="m-60">
        <button onClick={connect} className="py-2 text-lg font-semibold text-white rounded-lg w-60 bg-amber-500 hover:bg-amber-600">
          Connect to MetaMask
        </button>
      </div>}

      { active && 
      <div className="flex flex-col justify-between mt-10 mb-5 w-10/12 rounded-xl bg-white p-4 sm:flex-row">
        <div className="break-words">
          Account: <b>{account}</b>
          <Balance account={account} chainId={chainId}/>
        </div>
        
        <div>
          <button onClick={disconnect} className="py-2 text-lg font-semibold text-white rounded-lg w-48 bg-amber-500 hover:bg-amber-600">
            Disconnect
          </button>
        </div>

      </div> }

      {active && <NFTContainer account={account} chainId={chainId}/>}
    
    </div>
  )
}
