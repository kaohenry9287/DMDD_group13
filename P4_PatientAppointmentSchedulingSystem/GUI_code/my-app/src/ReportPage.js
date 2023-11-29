import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportPage = () => {
    const [reports, setReports] = useState([]);
    const [formData, setFormData] = useState({ report_description: '', report_date: '' });
    const [selectedReportId, setSelectedReportId] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = () => {
        axios.get('http://127.0.0.1:5000/report')
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = selectedReportId ? 
            `http://127.0.0.1:5000/report/${selectedReportId}` : 
            'http://127.0.0.1:5000/report';
        const method = selectedReportId ? 'put' : 'post';

        axios[method](url, formData)
            .then(() => {
                fetchReports();
                resetForm();
            })
            .catch(error => console.error('Error submitting form:', error));
    };

    const handleEdit = (report) => {
        setSelectedReportId(report.report_id);
        setFormData({ ...report });
    };

    const handleDelete = (reportId) => {
        axios.delete(`http://127.0.0.1:5000/report/${reportId}`)
            .then(() => fetchReports());
    };

    const resetForm = () => {
        setSelectedReportId(null);
        setFormData({ report_description: '', report_date: '' });
    };

    return (
        <div>
            <h2>Report Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="report_description" placeholder="Description" value={formData.report_description} onChange={handleInputChange} />
                <input type="date" name="report_date" placeholder="Date" value={formData.report_date} onChange={handleInputChange} />
                <button type="submit">{selectedReportId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report => (
                        <tr key={report.report_id}>
                            <td>{report.report_id}</td>
                            <td>{report.report_description}</td>
                            <td>{report.report_date}</td>
                            <td>
                                <button onClick={() => handleEdit(report)}>Edit</button>
                                <button onClick={() => handleDelete(report.report_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportPage;
