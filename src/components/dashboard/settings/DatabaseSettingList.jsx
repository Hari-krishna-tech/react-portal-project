import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DatabaseSettingList.css";

const DatabaseSettingList = () => {
  const [databaseSettings, setDatabaseSettings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [settingToDelete, setSettingToDelete] = useState(null);

  const fetchDatabaseSettings = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:10000/database-settings/list"
      );
      console.log(response.data);
      setDatabaseSettings(response.data);
    } catch (error) {
      console.error("Failed to fetch database settings:", error);
    }
  }, []);

  useEffect(() => {
    fetchDatabaseSettings();
  }, [fetchDatabaseSettings]);

  const handleDeleteClick = (id) => {
    setShowModal(true);
    setSettingToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:10000/database-settings/${settingToDelete}`
      );
      setDatabaseSettings(
        databaseSettings.filter((setting) => setting.id !== settingToDelete)
      );
      console.log("Database setting deleted successfully");
    } catch (error) {
      console.error("Failed to delete database setting:", error);
    } finally {
      setShowModal(false);
      setSettingToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSettingToDelete(null);
  };

  return (
    <div className="database-setting-list">
      <div className="container">
        <h1 className="page-title">Database Settings</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Setting Name</th>
                <th>Database URL</th>
                <th>Database Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {databaseSettings.map((setting) => (
                <tr key={setting.id}>
                  <td>{setting.databaseSettingName}</td>
                  <td>{setting.databaseUrl}</td>
                  <td>{setting.databaseName}</td>
                  <td>{setting.databaseUsername}</td>
                  <td>{setting.databasePassword}</td>
                  <td>
                    {setting.createdAt == null ? "N/A" : setting.createdAt}
                  </td>
                  <td className="actions">
                    <Link
                      to={`/settings/update-database-settings/${setting.id}`}
                    >
                      <button
                        className="edit-btn"
                        aria-label="Edit database setting"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>
                  </td>
                  {/*
                                        <button className="delete-btn" onClick={() => handleDeleteClick(setting.id)} aria-label="Delete database setting">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td> */}
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
      <p>Are you sure? This database setting will be removed permanently!</p>
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

export default DatabaseSettingList;
