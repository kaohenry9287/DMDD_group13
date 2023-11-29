-- Computed Column Based on UDF

CREATE FUNCTION dbo.CalculateAge (@birthDate VARCHAR(20))
RETURNS INT
AS
BEGIN
    RETURN DATEDIFF(year, CONVERT(datetime, @birthDate, 120), GETDATE());
END;


