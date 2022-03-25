import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import { useState, useEffect } from 'react'

function Balance({account, chainId}) {
  const Web3Api = useMoralisWeb3Api();
  const [balance, setbalance] = useState(0)

  const fetchNativeBalance = async () => {
    const options = {
      chain: `0x${chainId.toString(16)}`,
      address: account,
    };
    //console.log(account);
    const _balance = await Web3Api.account.getNativeBalance(options);
    let b = parseFloat(_balance.balance)/1e18;
    setbalance(b.toFixed(4))
    //console.log(_balance);
  };

  useEffect(()=>{
    fetchNativeBalance();
  },[chainId])

  return (
    <div>Balance: <b>{balance} ETH</b></div>
  )
}

export default Balance