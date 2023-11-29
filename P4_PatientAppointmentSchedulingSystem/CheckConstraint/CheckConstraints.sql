-- Table level CHECK constraints

--Patient Age Check
ALTER TABLE dbo.Patient
ADD CONSTRAINT CHK_Patient_Age CHECK (DATEDIFF(year, CONVERT(datetime, patient_birth, 120), GETDATE()) BETWEEN 0 AND 120);

-- Appointment Status Check
ALTER TABLE dbo.Appointment
ADD CONSTRAINT CHK_Appointment_Status CHECK (appointment_status IN ('Scheduled', 'Done', 'Canceled'));

-- Billing Amount Check
ALTER TABLE dbo.Billing
ADD CONSTRAINT CHK_Billing_Amount CHECK (billing_amount > 0);

