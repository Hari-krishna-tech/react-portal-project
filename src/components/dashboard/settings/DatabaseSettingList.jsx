import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./DatabaseSettingList.css";

const fakeDatabaseSettings = [
  {
    id: 1,
    databaseSettingName: "Production DB",
    databaseUrl: "jdbc:mysql://prod-server:3306/prod_db",
    databaseName: "prod_db",
    databaseUsername: "prod_user",
    createdAt: "2024-01-01T00:00:00",
    updatedAt: "2024-01-02T00:00:00"
  },
  {
    id: 2,
    databaseSettingName: "Development DB",
    databaseUrl: "jdbc:postgresql://dev-server:5432/dev_db",
    databaseName: "dev_db",
    databaseUsername: "dev_user",
    createdAt: "2024-01-03T00:00:00",
    updatedAt: null
  },
  {
    id: 3,
    databaseSettingName: "Test DB",
    databaseUrl: "jdbc:sqlserver://test-server:1433/test_db",
    databaseName: "test_db",
    databaseUsername: "test_user",
    createdAt: "2024-01-04T00:00:00",
    updatedAt: "2024-01-05T00:00:00"
  }
];

const DatabaseSettingList = () => {
    const [databaseSettings, setDatabaseSettings] = useState(fakeDatabaseSettings);
    const [showModal, setShowModal] = useState(false);
    const [settingToDelete, setSettingToDelete] = useState(null);

    const fetchDatabaseSettings = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:10000/api/database-settings");
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
            await axios.delete(`http://localhost:8080/api/database-settings/${settingToDelete}`);
            setDatabaseSettings(databaseSettings.filter(setting => setting.id !== settingToDelete));
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
                                <th>Created At</th>
                                <th>Updated At</th>
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
                                    <td>{new Date(setting.createdAt).toLocaleString()}</td>
                                    <td>{setting.updatedAt ? new Date(setting.updatedAt).toLocaleString() : 'N/A'}</td>
                                    <td className="actions">
                                        <Link to={`/settings/update-database-settings/${setting.id}`}>
                                            <button className="edit-btn" aria-label="Edit database setting">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        </Link>
                                        <button className="delete-btn" onClick={() => handleDeleteClick(setting.id)} aria-label="Delete database setting">
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
    <div className='modal-overlay'>
        <div className='modal'>
            <h3>Confirm Deletion</h3>
            <p>Are you sure? This database setting will be removed permanently!</p>
            <div className='modal-actions'>
                <button className='delete-btn' onClick={onConfirm}>Yes, Delete</button>
                <button className='cancel-btn' onClick={onCancel}>Cancel</button>
            </div>
        </div>
    </div>
);

export default DatabaseSettingList;