CREATE TABLE PERSON
(
    U_ID INT(4) PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    user_headline VARCHAR(20),
    about_me VARCHAR(200),
    -- Leaving some of the extras as optional for now.
    profile_pic URL,
    resume_url URL,
    skills INT(4) REFERENCES SKILL(SKILL_ID)
)

CREATE TABLE SKILL
(
    SKILL_ID INT(4) PRIMARY KEY,
    Skill VARCHAR(20) NOT NULL
)

CREATE TABLE PREVIOUS_PROJECT
(
    PREV_PROJ_ID INT(4) PRIMARY KEY,
    U_ID INT(4) REFERENCES PERSON(U_ID),
    title VARCHAR(40),
    company VARCHAR(20),
    about_project VARCHAR(200),
)

CREATE TABLE WORK_EXPERIENCE
(
    WORK_ID INT(4) PRIMARY KEY,
    U_ID INT(4) REFERENCES PERSON(U_ID),
    Project_Role VARCHAR(20),
    COMPANY_ID INT(4) REFERENCES COMPANY(COMPANY_ID),
    Location VARCHAR(20),
    -- Making these Datetime, let me know if this won't work.
    Start_Day DATETIME,
    End_Day DATETIME,
    -- Media File
    work_description VARCHAR(200)
)

CREATE TABLE EDUCATION
(
    EDUCATION_ID INT(4) PRIMARY KEY,
    U_ID INT(4) REFERENCES PERSON(U_ID),
    Institution VARCHAR(30),
    Grad_date DATETIME,
    GPA VARCHAR(5),
    Degree VARCHAR(5),
    Major VARCHAR(20),
    Minor VARCHAR(20),
)

CREATE TABLE COMPANY
(
    -- Since it's separate from work experience, this info shouldn't be really seen.
    COMPANY_ID INT(4) PRIMARY KEY,
    Company_Name VARCHAR(20),
    Logo URL,
    company_headline VARCHAR(200),
    company_location VARCHAR(30),
    industry VARCHAR(20),
)