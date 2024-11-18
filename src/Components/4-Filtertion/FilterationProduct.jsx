import React from 'react'
import Filteration from './Filtertion'
import Product from '../4-Products/Product';

export default function FilterationProduct() {
  const handleFilterChange = (filters) => {
    // Handle the filter changes here
    console.log('Applied filters:', filters);
    // Update your product list based on filters
  };
  return (
    <div className='flex'>
      < Filteration onFilterChange={handleFilterChange} />
      <Product />

    </div>
  )
}
