import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InsurancePage = () => {
    const [insurances, setInsurances] = useState([]);
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({ 
        patient_id: '', 
        policy_num: '', 
        expiration_date: '', 
        insurance_company_name: '' 
    });
    const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);

    useEffect(() => {
        fetchPatients();
        fetchInsurances();
    }, []);

    const fetchPatients = () => {
        axios.get('http://127.0.0.1:5000/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));
    };

    const fetchInsurances = () => {
        axios.get('http://127.0.0.1:5000/insurance')
            .then(response => setInsurances(response.data))
            .catch(error => console.error('Error fetching insurances:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedInsuranceId) {
            axios.put(`http://127.0.0.1:5000/insurance/${selectedInsuranceId}`, formData)
                .then(() => {
                    fetchInsurances();
                    resetForm();
                });
        } else {
            axios.post('http://127.0.0.1:5000/insurance', formData)
                .then(() => {
                    fetchInsurances();
                    resetForm();
                });
        }
    };

    const handleEdit = (insurance) => {
        setSelectedInsuranceId(insurance.insurance_id);
        setFormData({ ...insurance });
    };

    const handleDelete = (insuranceId) => {
        axios.delete(`http://127.0.0.1:5000/insurance/${insuranceId}`)
            .then(() => fetchInsurances());
    };

    const resetForm = () => {
        setSelectedInsuranceId(null);
        setFormData({ patient_id: '', policy_num: '', expiration_date: '', insurance_company_name: '' });
    };

    return (
        <div>
            <h2>Insurance Management</h2>
            <form onSubmit={handleSubmit}>
                {/* Dropdown for selecting patient */}
                <select name="patient_id" value={formData.patient_id} onChange={handleInputChange}>
                    <option value="">Select a Patient</option>
                    {patients.map(patient => (
                        <option key={patient.patient_id} value={patient.patient_id}>
                            {patient.patient_fname} {patient.patient_lname} (ID: {patient.patient_id})
                        </option>
                    ))}
                </select>

                <input type="text" name="policy_num" placeholder="Policy Number" value={formData.policy_num} onChange={handleInputChange} />
                <input type="text" name="expiration_date" placeholder="Expiration Date" value={formData.expiration_date} onChange={handleInputChange} />
                <input type="text" name="insurance_company_name" placeholder="Insurance Company" value={formData.insurance_company_name} onChange={handleInputChange} />
                
                <button type="submit">{selectedInsuranceId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient ID</th>
                        <th>Policy Number</th>
                        <th>Expiration Date</th>
                        <th>Insurance Company</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {insurances.map(insurance => (
                        <tr key={insurance.insurance_id}>
                            <td>{insurance.insurance_id}</td>
                            <td>{insurance.patient_id}</td>
                            <td>{insurance.policy_num}</td>
                            <td>{insurance.expiration_date}</td>
                            <td>{insurance.insurance_company_name}</td>
                            <td>
                                <button onClick={() => handleEdit(insurance)}>Edit</button>
                                <button onClick={() => handleDelete(insurance.insurance_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InsurancePage;
