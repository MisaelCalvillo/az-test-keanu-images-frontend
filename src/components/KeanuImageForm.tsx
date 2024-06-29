import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { KeanuImageParams, KeanuImageData } from '../types';

import './KeanuImageForm.css';

const GET_KEANU_IMAGE = gql`
  query GetKeanuImage($width: Int!, $height: Int!, $young: Boolean!, $grayscale: Boolean!) {
    fetchKeanuImage(width: $width, height: $height, young: $young, grayscale: $grayscale)
  }
`;

const KeanuImageForm: React.FC = () => {
  const [params, setParams] = useState<KeanuImageParams>({
    width: 300,
    height: 200,
    young: false,
    grayscale: false,
  });

  const [getImage, { loading, error, data }] = useLazyQuery<KeanuImageData, KeanuImageParams>(GET_KEANU_IMAGE);

  console.log(data)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getImage({ variables: params });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : parseInt(value, 10),
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="width">Width:</label>
          <input
            type="number"
            id="width"
            name="width"
            value={params.width}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            name="height"
            value={params.height}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="young">Young Keanu:</label>
          <input
            type="checkbox"
            id="young"
            name="young"
            checked={params.young}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="grayscale">Grayscale:</label>
          <input
            type="checkbox"
            id="grayscale"
            name="grayscale"
            checked={params.grayscale}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Get Keanu Image</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <img
            className="keanu-image"
            src={`data:image/svg+xml;base64, ${data.fetchKeanuImage}`}
            alt="Keanu Reeves"
        />
      )}
    </div>
  );
};

export default KeanuImageForm;