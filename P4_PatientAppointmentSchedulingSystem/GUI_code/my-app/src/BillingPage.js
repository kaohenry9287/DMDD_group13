import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillingPage = () => {
    const [billings, setBillings] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [formData, setFormData] = useState({
        appointment_id: '',
        billing_date: '',
        billing_amount: '',
        payment_status: ''
    });
    const [selectedBillingId, setSelectedBillingId] = useState(null);

    useEffect(() => {
        fetchAppointments();
        fetchBillings();
    }, []);

    const fetchAppointments = () => {
        axios.get('http://127.0.0.1:5000/appointment')
            .then(response => setAppointments(response.data))
            .catch(error => console.error('Error fetching appointments:', error));
    };

    const fetchBillings = () => {
        axios.get('http://127.0.0.1:5000/billing')
            .then(response => setBillings(response.data))
            .catch(error => console.error('Error fetching billings:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = selectedBillingId ? 
            `http://127.0.0.1:5000/billing/${selectedBillingId}` : 
            'http://127.0.0.1:5000/billing';
        const method = selectedBillingId ? 'put' : 'post';

        axios[method](url, formData)
            .then(() => {
                fetchBillings();
                resetForm();
            })
            .catch(error => console.error('Error submitting form:', error));
    };

    const handleEdit = (billing) => {
        setSelectedBillingId(billing.billing_id);
        setFormData({ ...billing });
    };

    const handleDelete = (billingId) => {
        axios.delete(`http://127.0.0.1:5000/billing/${billingId}`)
            .then(() => fetchBillings());
    };

    const resetForm = () => {
        setSelectedBillingId(null);
        setFormData({ appointment_id: '', billing_date: '', billing_amount: '', payment_status: '' });
    };

    return (
        <div>
            <h2>Billing Management</h2>
            <form onSubmit={handleSubmit}>
                <select name="appointment_id" value={formData.appointment_id} onChange={handleInputChange}>
                    <option value="">Select an Appointment</option>
                    {appointments.map(appointment => (
                        <option key={appointment.appointment_id} value={appointment.appointment_id}>
                            {`Appointment ID: ${appointment.appointment_id}`}
                        </option>
                    ))}
                </select>

                <input type="date" name="billing_date" placeholder="Billing Date" value={formData.billing_date} onChange={handleInputChange} />
                <input type="number" name="billing_amount" placeholder="Amount" value={formData.billing_amount} onChange={handleInputChange} />
                <input type="text" name="payment_status" placeholder="Payment Status" value={formData.payment_status} onChange={handleInputChange} />

                <button type="submit">{selectedBillingId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Appointment ID</th>
                        <th>Billing Date</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {billings.map(billing => (
                        <tr key={billing.billing_id}>
                            <td>{billing.billing_id}</td>
                            <td>{billing.appointment_id}</td>
                            <td>{billing.billing_date}</td>
                            <td>{billing.billing_amount}</td>
                            <td>{billing.payment_status}</td>
                            <td>
                                <button onClick={() => handleEdit(billing)}>Edit</button>
                                <button onClick={() => handleDelete(billing.billing_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillingPage;
