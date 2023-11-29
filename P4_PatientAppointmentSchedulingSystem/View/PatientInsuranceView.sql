CREATE VIEW PatientInsuranceView
AS
SELECT
    P.patient_fname,
    P.patient_lname,
    P.patient_phone,
    P.emergency_Contact_Name,
    P.emergency_Contact_Num,
    I.policy_num,
    I.expiration_date,
    I.insurance_company_name
FROM dbo.Patient P
JOIN dbo.Insurance I ON P.patient_id = I.patient_id;