CREATE TRIGGER InsertInsuranceOnPatient
ON Patient
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert corresponding row into Insurance table for each new row in Patient table
    INSERT INTO Insurance (patient_id, policy_num, expiration_date, insurance_company_name)
    SELECT
        patient_id,
        'DefaultPolicy' AS policy_num,
        '2025-01-01' AS expiration_date,
        'DefaultInsurance' AS insurance_company_name
    FROM inserted;
END;
