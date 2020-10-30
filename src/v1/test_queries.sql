-- Query One: Basic query
-- Shows all Companies and their industries in a table.

SELECT Company_Name, Industry FROM COMPANY;

-- Query Two: Join three or more tables
-- Shows the Institutions where people have studied for each company.

Select CO.Company_Name, Ed.Institution
FROM Work_Experience as We, Education as Ed, Person as Pe, Company as CO
WHERE We.U_ID = Pe.U_ID and Ed.U_ID = Pe.U_ID and We.C_ID = CO.C_ID;


-- Query Three: Contains subquery
-- Finds the person with or people tied for the lowest gpa.

SELECT Pe.first_name, Pe.last_name, Ed.GPA
FROM Person as Pe, Education as Ed
WHERE Pe.U_ID = Ed.U_ID AND GPA = (SELECT MIN(GPA) FROM EDUCATION);

-- Query Four: group by...having clause
-- Shows all jobs with more than three people in that role across all companies.

SELECT Work_role, COUNT(*)
FROM Work_Experience
GROUP BY Work_role
HAVING COUNT(*) > 3;

-- Query Five: Complex search criterion.
-- Window function that compares the total average University GPA against people from each University.

SELECT Institution, AVG(GPA) OVER() AS Average_GPA, GPA - AVG(GPA) OVER() as GPA_Difference
FROM EDUCATION;