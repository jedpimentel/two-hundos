import React from 'react';
import { useQuery, gql } from '@apollo/client';

const TEST_QUERY = gql`
  query GetHello {
    hello
  }
`;

function TestQuery() {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <div>
    <p>{data.hello}</p>  {/* Display data returned from the server */}
  </div>;
}

export default TestQuery;