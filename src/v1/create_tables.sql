CREATE TABLE "PERSON"
(
    U_ID INT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    user_headline VARCHAR(50),
    about_me VARCHAR(400),
    profile_pic TEXT,
    resume_url TEXT,
    skills INT REFERENCES SKILL(S_ID)
);

CREATE TABLE "SKILL"
(
    S_ID INT PRIMARY KEY,
    Skill_Name VARCHAR(20) NOT NULL
);

CREATE TABLE "PERSON_SKILLS"
(
    U_ID INT REFERENCES PERSON(U_ID),
    S_ID INT REFERENCES SKILL
);

CREATE TABLE "PROJECT"
(
    P_ID INT PRIMARY KEY,
    U_ID INT REFERENCES PERSON(U_ID),
    Title VARCHAR(40) NOT NULL,
    Project_Description VARCHAR(200)
);

CREATE TABLE "WORK_EXPERIENCE"
(
    W_ID INT PRIMARY KEY,
    U_ID INT REFERENCES PERSON(U_ID),
    C_ID INT REFERENCES COMPANY(C_ID),
    Work_Role VARCHAR(30),
    Work_location VARCHAR(20),
    Start_day VARCHAR(20) NOT NULL,
    End_day VARCHAR(20) NOT NULL,
    Work_description VARCHAR(300) NOT NULL
);

CREATE TABLE "EDUCATION"
(
    E_ID INT PRIMARY KEY,
    U_ID INT REFERENCES PERSON(U_ID),
    Institution VARCHAR(30) NOT NULL,
    Grad_date VARCHAR(30),
    GPA VARCHAR(5),
    Degree VARCHAR(5) NOT NULL,
    Major VARCHAR(20) NOT NULL,
    Minor VARCHAR(20)
);

CREATE TABLE "COMPANY"
(
    C_ID INT PRIMARY KEY,
    Company_Name VARCHAR(30) NOT NULL,
    Logo URL,
    Headline VARCHAR(200),
    Industry VARCHAR(20)
);