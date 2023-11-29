CREATE VIEW PatientBillingAppointmentView AS
SELECT 
    P.patient_fname,
    P.patient_lname,
    B.billing_date,
    B.billing_amount,
    B.payment_status,
    A.appointment_date,
    A.appointment_status,
    A.appointment_reason,
    A.appointment_comments
FROM Patient AS P
JOIN Appointment AS A ON P.patient_id = A.patient_id
JOIN Billing AS B ON A.appointment_id = B.appointment_id;
