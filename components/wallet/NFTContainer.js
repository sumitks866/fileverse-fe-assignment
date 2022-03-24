import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import { useState, useEffect } from 'react'
import uuid from 'react-uuid';
import NFT from './nft';

function NFTContainer({account, chainId}) {

  // const addr = '0x7a7b02561263974d7903bde44d481c8ac6de4b5b';

  const [nftMeta, setNftMeta] = useState([])
  const [totalNFTs, setTotalNFTs] = useState(0)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(30)
  const [loading, setLoading] = useState(false)

  const Web3Api = useMoralisWeb3Api();

  const fetchNFTs = async () => {

    setLoading(true)

    const options = {
      chain: `0x${chainId}`,
      address: account,
      limit,
      offset,
    };

    const nfts = await Web3Api.account.getNFTs(options);
    let data = nfts.result.map((r)=>JSON.parse(r.metadata))
    setTotalNFTs(nfts.total)

    for(let i = 0; i<data.length; i++) {
      if(data[i] && data[i].image) {
        let imgurl = data[i].image
        let arr = [];
        if(imgurl.includes('ipfs://')) {
          arr = imgurl.split('/')
        } else {
          continue;
        }
        let url = "";
        for (let i in arr){
          if (!arr[i].includes("ipfs") && arr[i].length !== 0){
            url+=arr[i]+"/";
          }
        }
        url = "https://ipfs.io/ipfs/" + url ; 
        data[i].image = url
      }
    }

    setNftMeta([...nftMeta,...data])
    setLoading(false)

  };

  useEffect(() => {
    fetchNFTs();
  }, [chainId,offset])
  
  return (
    <div className='w-10/12 mb-10'>
      <div className='mb-5 rounded-xl bg-white p-4'>Total NFTs: <b>{totalNFTs}</b></div> 
      <div className='grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 w-full'>
        {nftMeta.map((n)=><NFT key={uuid()} nft = {n}/>)}
      </div>

      {loading && <div>Loading NFTS...</div>}

      { nftMeta.length < totalNFTs && 
      <button onClick={()=>setOffset(offset+limit)}
        className='place-self-start py-1 mt-5 text-mid text-amber-500 font-semibold text-white border-2 border-amber-500 rounded-full w-full bg-white hover:bg-amber-500 hover:text-white'>
        Load More
      </button>}
     

    </div>
  )
}

export default NFTContainer