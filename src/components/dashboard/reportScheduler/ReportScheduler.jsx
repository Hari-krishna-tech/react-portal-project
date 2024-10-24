import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import axios from "axios";
import "./ReportScheduler.css";

/*const fakeJobs = [
  {
    id: 1,
    jobName: "Job 1",
    startDateTime: "2024-01-01T00:00:00",
    endDateTime: "2024-01-01T00:00:00",
    status: "Active"
  },
  {
    id: 2,
    jobName: "Job 2",
    startDateTime: "2024-01-01T00:00:00",
    endDateTime: "2024-01-01T00:00:00",
    status: "Active"
  },
  {
    id: 3,
    jobName: "Job 3",
    startDateTime: "2024-01-01T00:00:00",
    endDateTime: "2024-01-01T00:00:00",
    status: "Active"
  }
];
*/

const ReportScheduler = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:10000/api/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDeleteClick = (id) => {
    setShowModal(true);
    setJobToDelete(id);
  };

  const formattedDate = (isoString) => format(parseISO(isoString), "PPpp");

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:10000/api/jobs/${jobToDelete}`);
      setJobs(jobs.filter((job) => job.id !== jobToDelete));

      console.log("Job deleted successfully");
    } catch (error) {
      console.error("Failed to delete job:", error);
    } finally {
      setShowModal(false);
      setJobToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setJobToDelete(null);
  };

  return (
    <div className="report-scheduler">
      <div className="container">
        <h1 className="page-title">Job List</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.jobName}</td>
                  <td>{formattedDate(job.startDateTime)}</td>
                  <td>{formattedDate(job.endDateTime)}</td>
                  <td>{job.status}</td>
                  <td className="actions">
                    <Link to={`/reportscheduler/update-job/${job.id}`}>
                      <button className="edit-btn" aria-label="Edit job">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteClick(job.id)}
                      aria-label="Delete job"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Confirm Deletion</h3>
      <p>Are you sure? It will be removed permanently!</p>
      <div className="modal-actions">
        <button className="delete-btn" onClick={onConfirm}>
          Yes, Delete
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default ReportScheduler;
