import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrescriptionPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [reports, setReports] = useState([]);
    const [formData, setFormData] = useState({
        report_id: '',
        medication_name: '',
        dosage: '',
        start_date: '',
        end_date: ''
    });
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);

    useEffect(() => {
        fetchReports();
        fetchPrescriptions();
    }, []);

    const fetchReports = () => {
        axios.get('http://127.0.0.1:5000/report')
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));
    };

    const fetchPrescriptions = () => {
        axios.get('http://127.0.0.1:5000/prescription')
            .then(response => setPrescriptions(response.data))
            .catch(error => console.error('Error fetching prescriptions:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = selectedPrescriptionId ? 
            `http://127.0.0.1:5000/prescription/${selectedPrescriptionId}` : 
            'http://127.0.0.1:5000/prescription';
        const method = selectedPrescriptionId ? 'put' : 'post';

        axios[method](url, formData)
            .then(() => {
                fetchPrescriptions();
                resetForm();
            })
            .catch(error => console.error('Error submitting form:', error));
    };

    const handleEdit = (prescription) => {
        setSelectedPrescriptionId(prescription.prescription_id);
        setFormData({ ...prescription });
    };

    const handleDelete = (prescriptionId) => {
        axios.delete(`http://127.0.0.1:5000/prescription/${prescriptionId}`)
            .then(() => fetchPrescriptions());
    };

    const resetForm = () => {
        setSelectedPrescriptionId(null);
        setFormData({ report_id: '', medication_name: '', dosage: '', start_date: '', end_date: '' });
    };

    return (
        <div>
            <h2>Prescription Management</h2>
            <form onSubmit={handleSubmit}>
                <select name="report_id" value={formData.report_id} onChange={handleInputChange}>
                    <option value="">Select a Report</option>
                    {reports.map(report => (
                        <option key={report.report_id} value={report.report_id}>
                            {report.report_description} (ID: {report.report_id})
                        </option>
                    ))}
                </select>

                <input type="text" name="medication_name" placeholder="Medication Name" value={formData.medication_name} onChange={handleInputChange} />
                <input type="number" name="dosage" placeholder="Dosage" value={formData.dosage} onChange={handleInputChange} />
                <input type="date" name="start_date" placeholder="Start Date" value={formData.start_date} onChange={handleInputChange} />
                <input type="date" name="end_date" placeholder="End Date" value={formData.end_date} onChange={handleInputChange} />

                <button type="submit">{selectedPrescriptionId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Report ID</th>
                        <th>Medication Name</th>
                        <th>Dosage</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map(prescription => (
                        <tr key={prescription.prescription_id}>
                            <td>{prescription.prescription_id}</td>
                            <td>{prescription.report_id}</td>
                            <td>{prescription.medication_name}</td>
                            <td>{prescription.dosage}</td>
                            <td>{prescription.start_date}</td>
                            <td>{prescription.end_date}</td>
                            <td>
                                <button onClick={() => handleEdit(prescription)}>Edit</button>
                                <button onClick={() => handleDelete(prescription.prescription_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrescriptionPage;
