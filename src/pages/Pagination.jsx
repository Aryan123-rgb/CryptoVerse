import React, { useContext, useState } from 'react'
import PaginationImage from "../assets/pagination-arrow.svg"
import { Pagination } from '@mui/material'
import { CryptoContext } from '../context/CryptoContext';

function Paginations() {
  const totalNumber = 100;

  const {setPage , page , cryptoData} = useContext(CryptoContext);

  const handlePageChange = (event,value) => {
    setPage(value);
  }

  if(cryptoData && cryptoData.length > 1){
    return (
      <div className='flex items-center'>
        <Pagination count={totalNumber} color="primary" page={page} onChange={handlePageChange}/>
          {/* <ul className='flex items-center justify-end text-sm'>
              <li className='flex items-center'><button className='w-8 outline-0'>
              <img src={PaginationImage} className='h-full w-auto rotate-180' alt="" /></button></li>
              <li><button>...</button></li>
              <li><button>1</button></li>
              <li><button>2</button></li>
              <li><button>3</button></li>
              <li><button>...</button></li>
              <li><button>100</button></li>
              <li><img src={PaginationImage} className='h-full w-auto' alt="" /></li>            
          </ul> */}
      </div>
    )
  }
  else{
    return null;
  }

}

export default Paginations