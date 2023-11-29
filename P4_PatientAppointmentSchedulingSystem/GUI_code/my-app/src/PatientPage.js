import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientPage = () => {
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({ patient_fname: '', patient_lname: '', patient_birth: '', patient_gender: '', patient_phone: '', emergency_Contact_Name: '' , emergency_Contact_Num: ''  });
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = () => {
        axios.get('http://127.0.0.1:5000/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedPatientId) {
            axios.put(`http://127.0.0.1:5000/patients/${selectedPatientId}`, formData)
                .then(() => {
                    fetchPatients();
                    resetForm();
                });
        } else {
            axios.post('http://127.0.0.1:5000/patients', formData)
                .then(() => {
                    fetchPatients();
                    resetForm();
                });
        }
    };

    const handleEdit = (patient) => {
        setSelectedPatientId(patient.patient_id);
        setFormData({ ...patient });
    };

    const handleDelete = (patientId) => {
        axios.delete(`http://127.0.0.1:5000/patients/${patientId}`)
            .then(() => fetchPatients());
    };

    const resetForm = () => {
        setSelectedPatientId(null);
        setFormData({ patient_fname: '', patient_lname: '', patient_birth: '', patient_gender: '', patient_phone: '', emergency_Contact_Name: '' , emergency_Contact_Num: ''  });
    };

    return (
        <div>
            <h2>Patient Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="patient_fname" placeholder="First Name" value={formData.patient_fname} onChange={handleInputChange} />
                <input type="text" name="patient_lname" placeholder="Last Name" value={formData.patient_lname} onChange={handleInputChange} />
                <input type="text" name="patient_birth" placeholder="Birth Date" value={formData.patient_birth} onChange={handleInputChange} />
                <input type="text" name="patient_gender" placeholder="Gender" value={formData.patient_gender} onChange={handleInputChange} />
                <input type="text" name="patient_phone" placeholder="Phone" value={formData.patient_phone} onChange={handleInputChange} />
                <input type="text" name="emergency_Contact_Name" placeholder="Emergency Contact" value={formData.emergency_Contact_Name} onChange={handleInputChange} />
                <input type="text" name="emergency_Contact_Num" placeholder="Emergency Phone" value={formData.emergency_Contact_Num} onChange={handleInputChange} />
                <button type="submit">{selectedPatientId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Emergency Contact Name</th>
                        <th>Emergency Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.patient_id}>
                            <td>{patient.patient_id}</td>
                            <td>{patient.patient_fname}</td>
                            <td>{patient.patient_lname}</td>
                            <td>{patient.patient_birth}</td>
                            <td>{patient.patient_gender}</td>
                            <td>{patient.patient_phone}</td>
                            <td>{patient.emergency_Contact_Name}</td>
                            <td>{patient.emergency_Contact_Num}</td>
                            <td>
                                <button onClick={() => handleEdit(patient)}>Edit</button>
                                <button onClick={() => handleDelete(patient.patient_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientPage;
