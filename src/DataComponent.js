import React, { useState } from 'react';
import withApiData from './HOC';

function DataComponent({ apiData, loading }) {
  const [filterLetter, setFilterLetter] = useState('');

  const filteredData = apiData.filter(item =>
    item.name.toLowerCase().startsWith(filterLetter.toLowerCase())
  );

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      {/* <h2>API Data</h2> */}
      <div className="flex justify-center">
  <input
    type='text'
    placeholder='Filter data by name...'
    value={filterLetter}
    onChange={e => setFilterLetter(e.target.value)}
    className='px-3 py-1.5 border rounded mb-4 focus:outline-green-200'
  />
</div>
      {loading ? (
        <div className="flex justify-center items-center h-screen -mt-28">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
      ) : (
        <table className='table-auto w-full mt-2'>
          <thead>
            <tr>
              <th className='px-4 py-2 bg-green-200'>ID</th>
              <th className='px-4 py-2 bg-green-300'>Username</th>
              <th className='px-4 py-2 bg-green-200'>Name</th>
              <th className='px-4 py-2 bg-green-300'>Email</th>
            </tr>
          </thead>
          <tbody>
          {filteredData.map((item, index) => (
  <tr
    key={item.id}
    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
  >
    <td className='border px-4 py-2'>{item.id}</td>
    <td className='border px-4 py-2'>{item.username}</td>
    <td className='border px-4 py-2'>{item.name}</td>
    <td className='border px-4 py-2'>{item.email}</td>
  </tr>
))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default withApiData(DataComponent);
