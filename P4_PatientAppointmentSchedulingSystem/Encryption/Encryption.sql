--
--Encrypting Patient Phone Number

-- Create a master key (created password: Hospitalgroup@12)
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'Hospitalgroup@12';

-- Create a certificate
CREATE CERTIFICATE HospitalCert WITH SUBJECT = 'Patient Data Encryption';

-- Create a symmetric key
CREATE SYMMETRIC KEY PatientPhoneKey
WITH ALGORITHM = AES_256
ENCRYPTION BY CERTIFICATE HospitalCert;


--
-- Encrypt Column Data
-- Add a new column for the encrypted data
ALTER TABLE dbo.Patient
ADD patient_phone_encrypted VARBINARY(MAX);

-- Encrypt existing data (assuming the table is not empty)
OPEN SYMMETRIC KEY PatientPhoneKey
DECRYPTION BY CERTIFICATE HospitalCert;

UPDATE dbo.Patient
SET patient_phone_encrypted = EncryptByKey(Key_GUID('PatientPhoneKey'), patient_phone);

-- Optionally, drop or hide the original column if no longer needed
-- ALTER TABLE dbo.Patient
-- DROP COLUMN patient_phone;

CLOSE SYMMETRIC KEY PatientPhoneKey;

-- SELECT * FROM Patient;
