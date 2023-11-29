CREATE VIEW PatientAppointmentDoctorView
AS
SELECT
    A.appointment_date,
    A.appointment_status,
    A.appointment_reason,
    A.appointment_comments,
    P.patient_fname,
    P.patient_lname,
    P.patient_birth,
    P.patient_gender,
    P.patient_phone,
    D.doctor_fname,
    D.doctor_lname,
    D.doctor_specialization,
    D.doctor_phone,
    DP.department_name,
    DP.department_location
FROM dbo.Appointment A
JOIN dbo.Patient P ON A.patient_id = P.patient_id
JOIN dbo.Doctor D ON A.doctor_id = D.doctor_id
JOIN dbo.Department DP ON D.department_id = DP.department_id;