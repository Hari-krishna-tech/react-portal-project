import React, { useState, useEffect, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import "./SeasonalInformation.css";

// add dummy data
const fakeSeasonalInfo = [
  {
    id: 1,
    origin: 'USA',
    commodity: 'Corn',
    operating_group: 'Agriculture',
    season_from: 'March',
    season_to: 'May',
    reminder_date: '2023-03-01'
  },
  {
    id: 2,
    origin: 'Canada',
    commodity: 'Wheat',
    operating_group: 'Agriculture',
    season_from: 'June',
    season_to: 'August',
    reminder_date: '2023-06-01'
  },
  {
    id: 3,
    origin: 'Brazil',
    commodity: 'Soybeans',
    operating_group: 'Agriculture',
    season_from: 'September',
    season_to: 'November',
    reminder_date: '2023-09-01'
  },
  {
    id: 4,
    origin: 'Australia',
    commodity: 'Barley',
    operating_group: 'Agriculture',
    season_from: 'December',
    season_to: 'February',
    reminder_date: '2023-12-01'
  },
  {
    id: 5,
    origin: 'India',
    commodity: 'Rice',
    operating_group: 'Agriculture',
    season_from: 'July',
    season_to: 'September',
    reminder_date: '2023-07-15'
  },
  {
    id: 6,
    origin: 'Argentina',
    commodity: 'Beef',
    operating_group: 'Livestock',
    season_from: 'Year-round',
    season_to: 'Year-round',
    reminder_date: '2023-01-10'
  },
  {
    id: 7,
    origin: 'China',
    commodity: 'Tea',
    operating_group: 'Agriculture',
    season_from: 'March',
    season_to: 'May',
    reminder_date: '2023-04-20'
  },
  {
    id: 8,
    origin: 'Mexico',
    commodity: 'Avocado',
    operating_group: 'Agriculture',
    season_from: 'June',
    season_to: 'August',
    reminder_date: '2023-08-05'
  }
];

const SeasonalInformation = () => {
  const [seasonalInfo, setSeasonalInfo] = useState(fakeSeasonalInfo);
  // const [activeTab, setActiveTab] = useState('info');

  const fetchSeasonalInfo = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/seasonal-info");
      setSeasonalInfo(response.data);
    } catch (error) {
      console.log("Failed to fetch seasonal information:", error);
    }
  }, []);



  useEffect(() => {
    fetchSeasonalInfo();
   
  }, [fetchSeasonalInfo]);

  const formattedDate = (isoString) => format(parseISO(isoString), 'PP');

  return (
    <div className="seasonal-information">
      <div className="container">
        <h1 className="page-title">Seasonal Information List</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Origin</th>
                <th>Commodity</th>
                <th>Operating Group</th>
                <th>Season From</th>
                <th>Season To</th>
                <th>Reminder Date</th>
              </tr>
            </thead>
            <tbody>
              {seasonalInfo.map((info) => (
                <tr key={info.id}>
                  <td>{info.origin}</td>
                  <td>{info.commodity}</td>
                  <td>{info.operating_group}</td>
                  <td>{info.season_from}</td>
                  <td>{info.season_to}</td>
                  <td>{formattedDate(info.reminder_date)}</td>
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