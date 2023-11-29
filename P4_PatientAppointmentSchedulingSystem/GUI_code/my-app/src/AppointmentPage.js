import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({ 
        patient_id: '', 
        doctor_id: '', 
        appointment_date: '', 
        appointment_status: '',
        appointment_reason: '',
        appointment_comments: ''
    });
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
        fetchAppointments();
    }, []);

    const fetchPatients = () => {
        axios.get('http://127.0.0.1:5000/patients')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));
    };

    const fetchDoctors = () => {
        axios.get('http://127.0.0.1:5000/doctor')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));
    };

    const fetchAppointments = () => {
        axios.get('http://127.0.0.1:5000/appointment')
            .then(response => setAppointments(response.data))
            .catch(error => console.error('Error fetching appointments:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = selectedAppointmentId ? 
            `http://127.0.0.1:5000/appointment/${selectedAppointmentId}` : 
            'http://127.0.0.1:5000/appointment';
        const method = selectedAppointmentId ? 'put' : 'post';

        axios[method](url, formData)
            .then(() => {
                fetchAppointments();
                resetForm();
            })
            .catch(error => console.error('Error submitting form:', error));
    };

    const handleEdit = (appointment) => {
        setSelectedAppointmentId(appointment.appointment_id);
        setFormData({ ...appointment });
    };

    const handleDelete = (appointmentId) => {
        axios.delete(`http://127.0.0.1:5000/appointment/${appointmentId}`)
            .then(() => fetchAppointments());
    };

    const resetForm = () => {
        setSelectedAppointmentId(null);
        setFormData({ patient_id: '', doctor_id: '', appointment_date: '', appointment_status: '', appointment_reason: '', appointment_comments: '' });
    };

    return (
        <div>
            <h2>Appointment Management</h2>
            <form onSubmit={handleSubmit}>
                <select name="patient_id" value={formData.patient_id} onChange={handleInputChange}>
                    <option value="">Select a Patient</option>
                    {patients.map(patient => (
                        <option key={patient.patient_id} value={patient.patient_id}>
                            {patient.patient_fname} {patient.patient_lname}
                        </option>
                    ))}
                </select>

                <select name="doctor_id" value={formData.doctor_id} onChange={handleInputChange}>
                    <option value="">Select a Doctor</option>
                    {doctors.map(doctor => (
                        <option key={doctor.doctor_id} value={doctor.doctor_id}>
                            {doctor.doctor_fname} {doctor.doctor_lname}
                        </option>
                    ))}
                </select>

                <input type="date" name="appointment_date" placeholder="Date" value={formData.appointment_date} onChange={handleInputChange} />
                <input type="text" name="appointment_status" placeholder="Status" value={formData.appointment_status} onChange={handleInputChange} />
                <input type="text" name="appointment_reason" placeholder="Reason" value={formData.appointment_reason} onChange={handleInputChange} />
                <input type="text" name="appointment_comments" placeholder="Comments" value={formData.appointment_comments} onChange={handleInputChange} />

                <button type="submit">{selectedAppointmentId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient ID</th>
                        <th>Doctor ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Reason</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.appointment_id}>
                            <td>{appointment.appointment_id}</td>
                            <td>{appointment.patient_id}</td>
                            <td>{appointment.doctor_id}</td>
                            <td>{appointment.appointment_date}</td>
                            <td>{appointment.appointment_status}</td>
                            <td>{appointment.appointment_reason}</td>
                            <td>{appointment.appointment_comments}</td>
                            <td>
                                <button onClick={() => handleEdit(appointment)}>Edit</button>
                                <button onClick={() => handleDelete(appointment.appointment_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentPage;
