import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HolidayPage = () => {
    const [holidays, setHolidays] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({ doctor_id: '', holiday_date: '' });
    const [selectedHoliday, setSelectedHoliday] = useState({ doctor_id: null, holiday_date: '' });

    useEffect(() => {
        fetchDoctors();
        fetchHolidays();
    }, []);

    const fetchDoctors = () => {
        axios.get('http://127.0.0.1:5000/doctor')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));
    };

    const fetchHolidays = () => {
        axios.get('http://127.0.0.1:5000/holiday')
            .then(response => setHolidays(response.data))
            .catch(error => console.error('Error fetching holidays:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = selectedHoliday.doctor_id ? 
            `http://127.0.0.1:5000/holiday/${selectedHoliday.doctor_id}/${selectedHoliday.holiday_date}` : 
            'http://127.0.0.1:5000/holiday';
        const method = selectedHoliday.doctor_id ? 'put' : 'post';

        axios[method](url, formData)
            .then(() => {
                fetchHolidays();
                resetForm();
            })
            .catch(error => console.error('Error submitting form:', error));
    };

    const handleEdit = (holiday) => {
        setSelectedHoliday({ doctor_id: holiday.doctor_id, holiday_date: holiday.holiday_date });
        setFormData({ ...holiday });
    };

    const handleDelete = (holiday) => {
        axios.delete(`http://127.0.0.1:5000/holiday/${holiday.doctor_id}/${holiday.holiday_date}`)
            .then(() => fetchHolidays());
    };

    const resetForm = () => {
        setSelectedHoliday({ doctor_id: null, holiday_date: '' });
        setFormData({ doctor_id: '', holiday_date: '' });
    };

    return (
        <div>
            <h2>Holiday Management</h2>
            <form onSubmit={handleSubmit}>
                <select name="doctor_id" value={formData.doctor_id} onChange={handleInputChange}>
                    <option value="">Select a Doctor</option>
                    {doctors.map(doctor => (
                        <option key={doctor.doctor_id} value={doctor.doctor_id}>
                            {doctor.doctor_fname} {doctor.doctor_lname}
                        </option>
                    ))}
                </select>
                <input type="date" name="holiday_date" placeholder="Holiday Date" value={formData.holiday_date} onChange={handleInputChange} />
                <button type="submit">{selectedHoliday.doctor_id ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Doctor ID</th>
                        <th>Doctor Name</th>
                        <th>Holiday Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {holidays.map(holiday => (
                        <tr key={`${holiday.doctor_id}_${holiday.holiday_date}`}>
                            <td>{holiday.doctor_id}</td>
                            <td>{doctors.find(doc => doc.doctor_id === holiday.doctor_id)?.doctor_fname} {doctors.find(doc => doc.doctor_id === holiday.doctor_id)?.doctor_lname}</td>
                            <td>{holiday.holiday_date}</td>
                            <td>
                                <button onClick={() => handleEdit(holiday)}>Edit</button>
                                <button onClick={() => handleDelete(holiday)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HolidayPage;
