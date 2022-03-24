import React from 'react'

function NFT({nft}) {

  return (
    <div className='xs:w-full sm:w-56 xl:w-64 border-2 p-3 rounded-xl bg-white'>
      <img src={nft?.image || nft?.image_url || nft?.imageUrl} className="w-full rounded-lg"/>
      <div className='font-semibold pt-2 text-sm'>{(nft && nft.name)?nft.name:'N/A'}</div>
    </div>
  )
}

export default NFT