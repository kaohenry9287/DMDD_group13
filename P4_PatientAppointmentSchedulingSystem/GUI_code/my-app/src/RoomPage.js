import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomPage = () => {
    const [rooms, setRooms] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [formData, setFormData] = useState({
        appointment_id: '',
        floor_number: ''
    });
    const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);

    useEffect(() => {
        fetchAppointments();
        fetchRooms();
    }, []);

    const fetchAppointments = () => {
        axios.get('http://127.0.0.1:5000/appointment')
            .then(response => setAppointments(response.data))
            .catch(error => console.error('Error fetching appointments:', error));
    };

    const fetchRooms = () => {
        axios.get('http://127.0.0.1:5000/room')
            .then(response => setRooms(response.data))
            .catch(error => console.error('Error fetching rooms:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = selectedRoomNumber ? 
            `http://127.0.0.1:5000/room/${selectedRoomNumber}` : 
            'http://127.0.0.1:5000/room';
        const method = selectedRoomNumber ? 'put' : 'post';

        axios[method](url, formData)
            .then(() => {
                fetchRooms();
                resetForm();
            })
            .catch(error => console.error('Error submitting form:', error));
    };

    const handleEdit = (room) => {
        setSelectedRoomNumber(room.room_number);
        setFormData({ ...room });
    };

    const handleDelete = (roomNumber) => {
        axios.delete(`http://127.0.0.1:5000/room/${roomNumber}`)
            .then(() => fetchRooms());
    };

    const resetForm = () => {
        setSelectedRoomNumber(null);
        setFormData({ appointment_id: '', floor_number: '' });
    };

    return (
        <div>
            <h2>Room Management</h2>
            <form onSubmit={handleSubmit}>
                <select name="appointment_id" value={formData.appointment_id} onChange={handleInputChange}>
                    <option value="">Select an Appointment</option>
                    {appointments.map(appointment => (
                        <option key={appointment.appointment_id} value={appointment.appointment_id}>
                            {`Appointment ID: ${appointment.appointment_id}`}
                        </option>
                    ))}
                </select>

                <input type="number" name="floor_number" placeholder="Floor Number" value={formData.floor_number} onChange={handleInputChange} />

                <button type="submit">{selectedRoomNumber ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Appointment ID</th>
                        <th>Floor Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.room_number}>
                            <td>{room.room_number}</td>
                            <td>{room.appointment_id}</td>
                            <td>{room.floor_number}</td>
                            <td>
                                <button onClick={() => handleEdit(room)}>Edit</button>
                                <button onClick={() => handleDelete(room.room_number)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomPage;
