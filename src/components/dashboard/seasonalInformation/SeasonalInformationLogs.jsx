import React, {useState, useCallback, useEffect} from 'react';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import "./SeasonalInformationLogs.css";

const fakeSeasonalLogs = [
  {
    id: 1,
    origin: 'USA',
    commodity: 'Corn',
    email_send_date: '2023-01-15',
    email_send_status: 'Sent',
    operating_group: 'Agriculture',
    season_from: 'March',
    season_to: 'May',
    email_send_time: '10:00 AM',
    email_subject: 'Corn Seasonal Update',
    email_body: 'This is a reminder for the upcoming corn season.',
    email_to: 'farmer@example.com',
    email_cc: 'manager@example.com'
  },
  {
    id: 2,
    origin: 'Canada',
    commodity: 'Wheat',
    email_send_date: '2023-02-20',
    email_send_status: 'Pending',
    operating_group: 'Agriculture',
    season_from: 'June',
    season_to: 'August',
    email_send_time: '11:30 AM',
    email_subject: 'Wheat Seasonal Update',
    email_body: 'This is a reminder for the upcoming wheat season.This is a reminder for the upcoming wheat season.This is a reminder for the upcoming wheat season.This is a reminder for the upcoming wheat season.This is a reminder for the upcoming wheat season.This is a reminder for the upcoming wheat season.',
    email_to: 'farmer2@example.com',
    email_cc: 'manager2@example.com'
  },
  {
    id: 3,
    origin: 'Brazil',
    commodity: 'Soybeans',
    email_send_date: '2023-03-10',
    email_send_status: 'Failed',
    operating_group: 'Agriculture',
    season_from: 'September',
    season_to: 'November',
    email_send_time: '09:15 AM',
    email_subject: 'Soybeans Seasonal Update',
    email_body: 'This is a reminder for the upcoming soybeans season.',
    email_to: 'farmer3@example.com',
    email_cc: 'manager3@example.com'
  },
  {
    id: 4,
    origin: 'Australia',
    commodity: 'Barley',
    email_send_date: '2023-04-05',
    email_send_status: 'Sent',
    operating_group: 'Agriculture',
    season_from: 'December',
    season_to: 'February',
    email_send_time: '02:00 PM',
    email_subject: 'Barley Seasonal Update',
    email_body: 'This is a reminder for the upcoming barley season.',
    email_to: 'farmer4@example.com',
    email_cc: 'manager4@example.com'
  }
];

const SeasonalInformationLogs = () => {
  const [seasonalLogs, setSeasonalLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);

  const fetchSeasonalLogs = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:9081/seasonal-info/logs");
      
      setSeasonalLogs(response.data);
    } catch (error) {
      console.log("Failed to fetch seasonal logs:", error);
    }
  }, []);

  const returnList = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i].emailId);
    }
    return result.join(", ");
  }

  // date and time should be shown 

  const formattedDate = (isoString) => format(parseISO(isoString), 'PPpp')

  useEffect(() => {
    fetchSeasonalLogs();
  }, [fetchSeasonalLogs]);

  return (
    <div className="seasonal-logs">
      <div className="container">
        <h1 className="page-title">Seasonal Information Logs</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Origin</th>
                <th>Commodity</th>
                <th>Operating Group</th>
                <th>Email Send DateTime</th>
                <th>Season Start's</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {seasonalLogs.map((log) => (
                <tr key={log.id} onClick={() => setSelectedLog(log)}>
                  <td>{log.seasonalInfo.origin?.origin}</td>
                  <td>{log.seasonalInfo.origin?.commodity}</td>
                  <td>
                    {log.seasonalInfo.entity.name}
                  </td>
                  <td>
                    {log.seasonalInfo.seasonFrom}
                  </td>
                  <td>{formattedDate(log.emailSendDateTime)}</td>
                  <td style={{color: `${log.emailSendStatus?"green": "red"}`, textDecoration: "underline"}}>{log.emailSendStatus?"Success": "Failed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {selectedLog && (
          <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Log Details</h3>
              <button className="close-btn" onClick={() => setSelectedLog(null)}>&times;</button>
              <div className="log-details">
                <div className="log-info">
                  
                  
                  
                  <p><strong>Email Send Date Time:</strong> <span>{formattedDate(selectedLog.emailSendDateTime)}</span></p>
                  
                  
                  
                  <p><strong>Email To:</strong> <span>{returnList(selectedLog.seasonalInfo.recipientsTo)}</span></p>
                  <p><strong>Email CC:</strong> <span>{returnList(selectedLog.seasonalInfo.recipientsCc)}</span></p>
                </div>
                <div className="email-body">
                  <h4>Email Body</h4>
                  <div className="email-content">{selectedLog.emailBody}</div>
                </div>
              </div>
              <div className="modal-actions">
                <button className="modal-btn secondary" onClick={() => setSelectedLog(null)}>Close</button>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonalInformationLogs;