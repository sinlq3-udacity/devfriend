SELECT Table_Name, 
    Column_Name
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_CATALOG = '%${table}%'
   AND COLUMN_NAME LIKE '%${column}%';