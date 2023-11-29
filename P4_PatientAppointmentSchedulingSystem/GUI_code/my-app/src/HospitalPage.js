import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HospitalPage = () => {
    const [hospitals, setHospitals] = useState([]);
    const [formData, setFormData] = useState({ hospital_name: '', hospital_location: '' });
    const [selectedHospitalId, setSelectedHospitalId] = useState(null);

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = () => {
        axios.get('http://127.0.0.1:5000/hospital')
            .then(response => setHospitals(response.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedHospitalId) {
            axios.put(`http://127.0.0.1:5000/hospital/${selectedHospitalId}`, formData)
                .then(() => {
                    fetchHospitals();
                    resetForm();
                });
        } else {
            axios.post('http://127.0.0.1:5000/hospital', formData)
                .then(() => {
                    fetchHospitals();
                    resetForm();
                });
        }
    };

    const handleEdit = (hospital) => {
        setSelectedHospitalId(hospital.hospital_id);
        setFormData({ ...hospital });
    };

    const handleDelete = (hospitalId) => {
        axios.delete(`http://127.0.0.1:5000/hospital/${hospitalId}`)
            .then(() => fetchHospitals());
    };

    const resetForm = () => {
        setSelectedHospitalId(null);
        setFormData({ hospital_name: '', hospital_location: '' });
    };

    return (
        <div>
            <h2>Hospital Management</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="hospital_name" placeholder="Hospital Name" value={formData.hospital_name} onChange={handleInputChange} />
                <input type="text" name="hospital_location" placeholder="Hospital Location" value={formData.hospital_location} onChange={handleInputChange} />
                <button type="submit">{selectedHospitalId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hospital Name</th>
                        <th>Hospital Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hospitals.map(hospital => (
                        <tr key={hospital.hospital_id}>
                            <td>{hospital.hospital_id}</td>
                            <td>{hospital.hospital_name}</td>
                            <td>{hospital.hospital_location}</td>
                            <td>
                                <button onClick={() => handleEdit(hospital)}>Edit</button>
                                <button onClick={() => handleDelete(hospital.hospital_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HospitalPage;
