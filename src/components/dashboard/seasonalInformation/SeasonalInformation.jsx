import React, { useState, useEffect, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import "./SeasonalInformation.css";




const SeasonalInformation = () => {
  const [seasonalInfo, setSeasonalInfo] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const products = [
    {value: 'dw', label: 'DW'},
    {value: 'ofi direct', label: 'OFI Direct'}
  ]

  const fetchSeasonalInfo = useCallback(async (product) => {
    try {
      const response = await axios.get(`http://localhost:9081/seasonal-info/list/${product}`);
      setSeasonalInfo(response.data);
    } catch (error) {
      console.log("Failed to fetch seasonal information:", error);
    }
  }, []);


 
    




  useEffect(() => {
    fetchSeasonalInfo(selectedProduct);
   
  }, [fetchSeasonalInfo, selectedProduct]);

  const formattedDate = (isoString) => format(parseISO(isoString), 'ppPP');

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <div className="seasonal-information">
      <div className="container">
        <h1 className="page-title">Seasonal Information List</h1>

        <div className="product-selector">
          <label htmlFor="product-select">Select Product:</label>
          <select 
            id="product-select" 
            value={selectedProduct} 
            onChange={handleProductChange}
            className="product-dropdown"
          > 
             <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.value} value={product.value}>
                {product.label}
              </option>
            ))}
          </select>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Origin</th>
                <th>Commodity</th>
                <th>Operating Group</th>
                <th>Region</th>
                <th>Season From</th>
                <th>Season To</th>
                <th>Reminder Date</th>
              </tr>
            </thead>
            <tbody>
              {seasonalInfo.map((info) => (
                <tr key={info.id}>
                  <td>{info.origin.origin}</td>
                  <td>{info.origin.commodity}</td>
                  <td>{info.entity.name}</td>
                  <td>{info.region}</td>
                  <td>{info.seasonFrom}</td>
                  <td>{info.seasonTo}</td>
                  <td>{formattedDate(info.reminderDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeasonalInformation;