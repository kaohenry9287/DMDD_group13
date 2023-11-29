USE Hospital
GO

CREATE PROCEDURE CreatePatientWithInsurance
    @patient_fname VARCHAR(20),
    @patient_lname VARCHAR(20),
    @patient_birth VARCHAR(20),
    @patient_gender VARCHAR(20),
    @patient_phone VARCHAR(20),
    @emergency_Contact_Name VARCHAR(20),
    @emergency_Contact_Num VARCHAR(20),
    @policy_num VARCHAR(50),
    @expiration_date VARCHAR(50),
    @insurance_company_name VARCHAR(50),
    @new_patient_id INT OUTPUT,
    @new_insurance_id INT OUTPUT,
    @error_message VARCHAR(255) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Start a transaction
        BEGIN TRANSACTION;

        -- Insert data into dbo.Patient
        INSERT INTO dbo.Patient (patient_fname, patient_lname, patient_birth, patient_gender, patient_phone, emergency_Contact_Name, emergency_Contact_Num)
        VALUES (@patient_fname, @patient_lname, @patient_birth, @patient_gender, @patient_phone, @emergency_Contact_Name, @emergency_Contact_Num);

        -- Get the newly inserted patient_id
        SET @new_patient_id = SCOPE_IDENTITY();

        -- Insert data into dbo.Insurance
        INSERT INTO dbo.Insurance (patient_id, policy_num, expiration_date, insurance_company_name)
        VALUES (@new_patient_id, @policy_num, @expiration_date, @insurance_company_name);

        -- Get the newly inserted insurance_id
        SET @new_insurance_id = SCOPE_IDENTITY();

        -- Commit the transaction
        COMMIT;
        SET @error_message = NULL; -- No error
    END TRY
    BEGIN CATCH
        -- Rollback the transaction in case of an error
        ROLLBACK;
        SET @new_patient_id = NULL;
        SET @new_insurance_id = NULL;
        SET @error_message = ERROR_MESSAGE();
    END CATCH;
END;


-- Execute 
DECLARE @new_patient_id INT;
DECLARE @new_insurance_id INT;
DECLARE @error_message VARCHAR(255);

EXEC CreatePatientWithInsurance
    @patient_fname = 'John',
    @patient_lname = 'Doe',
    -- Add other input parameters here...
    @new_patient_id = @new_patient_id OUTPUT,
    @new_insurance_id = @new_insurance_id OUTPUT,
    @error_message = @error_message OUTPUT;

-- Check the output parameters
PRINT 'New Patient ID: ' + ISNULL(CONVERT(VARCHAR, @new_patient_id), 'NULL');
PRINT 'New Insurance ID: ' + ISNULL(CONVERT(VARCHAR, @new_insurance_id), 'NULL');
PRINT 'Error Message: ' + ISNULL(@error_message, 'NULL');
