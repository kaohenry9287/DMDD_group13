ALTER TABLE dbo.Patient
ADD patient_age AS dbo.CalculateAge(patient_birth);