import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({ 
        department_id: '', 
        doctor_fname: '', 
        doctor_lname: '', 
        doctor_specialization: '',
        doctor_phone: '',
        doctor_license: '',
        doctor_holiday: ''
    });
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);

    useEffect(() => {
        fetchDepartments();
        fetchDoctors();
    }, []);

    const fetchDepartments = () => {
        axios.get('http://127.0.0.1:5000/department')
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching departments:', error));
    };

    const fetchDoctors = () => {
        axios.get('http://127.0.0.1:5000/doctor')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDoctorId) {
            axios.put(`http://127.0.0.1:5000/doctor/${selectedDoctorId}`, formData)
                .then(() => {
                    fetchDoctors();
                    resetForm();
                });
        } else {
            axios.post('http://127.0.0.1:5000/doctor', formData)
                .then(() => {
                    fetchDoctors();
                    resetForm();
                });
        }
    };

    const handleEdit = (doctor) => {
        setSelectedDoctorId(doctor.doctor_id);
        setFormData({ ...doctor });
    };

    const handleDelete = (doctorId) => {
        axios.delete(`http://127.0.0.1:5000/doctor/${doctorId}`)
            .then(() => fetchDoctors());
    };

    const resetForm = () => {
        setSelectedDoctorId(null);
        setFormData({ department_id: '', doctor_fname: '', doctor_lname: '', doctor_specialization: '', doctor_phone: '', doctor_license: '', doctor_holiday: '' });
    };

    return (
        <div>
            <h2>Doctor Management</h2>
            <form onSubmit={handleSubmit}>
                <select name="department_id" value={formData.department_id} onChange={handleInputChange}>
                    <option value="">Select a Department</option>
                    {departments.map(department => (
                        <option key={department.department_id} value={department.department_id}>
                            {department.department_name}
                        </option>
                    ))}
                </select>

                <input type="text" name="doctor_fname" placeholder="First Name" value={formData.doctor_fname} onChange={handleInputChange} />
                <input type="text" name="doctor_lname" placeholder="Last Name" value={formData.doctor_lname} onChange={handleInputChange} />
                <input type="text" name="doctor_specialization" placeholder="Specialization" value={formData.doctor_specialization} onChange={handleInputChange} />
                <input type="text" name="doctor_phone" placeholder="Phone" value={formData.doctor_phone} onChange={handleInputChange} />
                <input type="text" name="doctor_license" placeholder="License" value={formData.doctor_license} onChange={handleInputChange} />
                <input type="text" name="doctor_holiday" placeholder="Holiday" value={formData.doctor_holiday} onChange={handleInputChange} />

                <button type="submit">{selectedDoctorId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Department ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Specialization</th>
                        <th>Phone</th>
                        <th>License</th>
                        <th>Holiday</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor.doctor_id}>
                            <td>{doctor.doctor_id}</td>
                            <td>{doctor.department_id}</td>
                            <td>{doctor.doctor_fname}</td>
                            <td>{doctor.doctor_lname}</td>
                            <td>{doctor.doctor_specialization}</td>
                            <td>{doctor.doctor_phone}</td>
                            <td>{doctor.doctor_license}</td>
                            <td>{doctor.doctor_holiday}</td>
                            <td>
                                <button onClick={() => handleEdit(doctor)}>Edit</button>
                                <button onClick={() => handleDelete(doctor.doctor_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorPage;
