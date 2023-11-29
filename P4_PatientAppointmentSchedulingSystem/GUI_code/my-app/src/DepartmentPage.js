import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentPage = () => {
    const [departments, setDepartments] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [formData, setFormData] = useState({ 
        hospital_id: '', 
        department_name: '', 
        department_description: '',
        department_location: '' 
    });
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

    useEffect(() => {
        fetchHospitals();
        fetchDepartments();
    }, []);

    const fetchHospitals = () => {
        axios.get('http://127.0.0.1:5000/hospital')
            .then(response => setHospitals(response.data))
            .catch(error => console.error('Error fetching hospitals:', error));
    };

    const fetchDepartments = () => {
        axios.get('http://127.0.0.1:5000/department')
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching departments:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDepartmentId) {
            axios.put(`http://127.0.0.1:5000/department/${selectedDepartmentId}`, formData)
                .then(() => {
                    fetchDepartments();
                    resetForm();
                });
        } else {
            axios.post('http://127.0.0.1:5000/department', formData)
                .then(() => {
                    fetchDepartments();
                    resetForm();
                });
        }
    };

    const handleEdit = (department) => {
        setSelectedDepartmentId(department.department_id);
        setFormData({ ...department });
    };

    const handleDelete = (departmentId) => {
        axios.delete(`http://127.0.0.1:5000/department/${departmentId}`)
            .then(() => fetchDepartments());
    };

    const resetForm = () => {
        setSelectedDepartmentId(null);
        setFormData({ hospital_id: '', department_name: '', department_description: '', department_location: '' });
    };

    return (
        <div>
            <h2>Department Management</h2>
            <form onSubmit={handleSubmit}>
                <select name="hospital_id" value={formData.hospital_id} onChange={handleInputChange}>
                    <option value="">Select a Hospital</option>
                    {hospitals.map(hospital => (
                        <option key={hospital.hospital_id} value={hospital.hospital_id}>
                            {hospital.hospital_name}
                        </option>
                    ))}
                </select>

                <input type="text" name="department_name" placeholder="Department Name" value={formData.department_name} onChange={handleInputChange} />
                <input type="text" name="department_description" placeholder="Department Description" value={formData.department_description} onChange={handleInputChange} />
                <input type="text" name="department_location" placeholder="Department Location" value={formData.department_location} onChange={handleInputChange} />
                
                <button type="submit">{selectedDepartmentId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hospital ID</th>
                        <th>Department Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department => (
                        <tr key={department.department_id}>
                            <td>{department.department_id}</td>
                            <td>{department.hospital_id}</td>
                            <td>{department.department_name}</td>
                            <td>{department.department_description}</td>
                            <td>{department.department_location}</td>
                            <td>
                                <button onClick={() => handleEdit(department)}>Edit</button>
                                <button onClick={() => handleDelete(department.department_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DepartmentPage;
