import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestPage = () => {
    const [tests, setTests] = useState([]);
    const [reports, setReports] = useState([]);
    const [formData, setFormData] = useState({
        report_id: '',
        test_name: '',
        test_date: '',
        test_result: '',
        part_of: ''
    });
    const [selectedTestId, setSelectedTestId] = useState(null);

    useEffect(() => {
        fetchReports();
        fetchTests();
    }, []);

    const fetchReports = () => {
        axios.get('http://127.0.0.1:5000/report')
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));
    };

    const fetchTests = () => {
        axios.get('http://127.0.0.1:5000/test')
            .then(response => setTests(response.data))
            .catch(error => console.error('Error fetching tests:', error));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = selectedTestId ? 
            `http://127.0.0.1:5000/test/${selectedTestId}` : 
            'http://127.0.0.1:5000/test';
        const method = selectedTestId ? 'put' : 'post';

        axios[method](url, formData)
            .then(() => {
                fetchTests();
                resetForm();
            })
            .catch(error => console.error('Error submitting form:', error));
    };

    const handleEdit = (test) => {
        setSelectedTestId(test.test_id);
        setFormData({ ...test });
    };

    const handleDelete = (testId) => {
        axios.delete(`http://127.0.0.1:5000/test/${testId}`)
            .then(() => fetchTests());
    };

    const resetForm = () => {
        setSelectedTestId(null);
        setFormData({ report_id: '', test_name: '', test_date: '', test_result: '', part_of: '' });
    };

    return (
        <div>
            <h2>Test Management</h2>
            <form onSubmit={handleSubmit}>
                <select name="report_id" value={formData.report_id} onChange={handleInputChange}>
                    <option value="">Select a Report</option>
                    {reports.map(report => (
                        <option key={report.report_id} value={report.report_id}>
                            {report.report_description} (ID: {report.report_id})
                        </option>
                    ))}
                </select>

                <input type="text" name="test_name" placeholder="Test Name" value={formData.test_name} onChange={handleInputChange} />
                <input type="date" name="test_date" placeholder="Test Date" value={formData.test_date} onChange={handleInputChange} />
                <input type="text" name="test_result" placeholder="Test Result" value={formData.test_result} onChange={handleInputChange} />
                <input type="text" name="part_of" placeholder="Part Of" value={formData.part_of} onChange={handleInputChange} />

                <button type="submit">{selectedTestId ? 'Update' : 'Create'}</button>
                
            </form>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Report ID</th>
                        <th>Test Name</th>
                        <th>Test Date</th>
                        <th>Test Result</th>
                        <th>Part Of</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map(test => (
                        <tr key={test.test_id}>
                            <td>{test.test_id}</td>
                            <td>{test.report_id}</td>
                            <td>{test.test_name}</td>
                            <td>{test.test_date}</td>
                            <td>{test.test_result}</td>
                            <td>{test.part_of}</td>
                            <td>
                                <button onClick={() => handleEdit(test)}>Edit</button>
                                <button onClick={() => handleDelete(test.test_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestPage;
