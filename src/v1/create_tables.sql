CREATE TABLE "PERSON" (
    U_ID INT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    user_headline VARCHAR(50),
    about_me VARCHAR(400),
    profile_pic TEXT,
    resume_url TEXT,
    skills INT REFERENCES SKILL(S_ID),
    searching_for_work BOOLEAN
     -- ppl into graphic design, web development, app development, digital marketing
);
CREATE TABLE "SKILL" (
    S_ID INT PRIMARY KEY,
    Skill_Name VARCHAR(20) NOT NULL
);
CREATE TABLE "PERSON_SKILLS" (
    U_ID INT REFERENCES PERSON(U_ID),
    S_ID INT REFERENCES SKILL
);
CREATE TABLE "PROJECT" (
    P_ID INT PRIMARY KEY,
    U_ID INT REFERENCES PERSON(U_ID),
    Title VARCHAR(40) NOT NULL,
    Project_Description VARCHAR(200)
);
CREATE TABLE "WORK_EXPERIENCE" (
    W_ID INT PRIMARY KEY,
    U_ID INT REFERENCES PERSON(U_ID),
    C_ID INT REFERENCES COMPANY(C_ID),
    Work_Role VARCHAR(30),
    Work_location VARCHAR(20),
    Start_day VARCHAR(20) NOT NULL,
    End_day VARCHAR(20) NOT NULL,
    Work_description VARCHAR(300) NOT NULL
);
CREATE TABLE "EDUCATION" (
    E_ID INT PRIMARY KEY,
    U_ID INT REFERENCES PERSON(U_ID),
    Institution VARCHAR(30) NOT NULL,
    Grad_date VARCHAR(30),
    GPA VARCHAR(5),
    Degree VARCHAR(5) NOT NULL,
    Major VARCHAR(20) NOT NULL,
    Minor VARCHAR(20)
);
CREATE TABLE "COMPANY" (
    C_ID INT PRIMARY KEY,
    Company_Name VARCHAR(30) NOT NULL,
    Logo URL,
    Headline VARCHAR(200),
    Industry VARCHAR(20)
);
CREATE TABLE "BUSINESS" (
    B_ID INT PRIMARY KEY,
    company_name VARCHAR(30) NOT NULL,
    year_founded INT NOT NULL,
    business_location VARCHAR(30) NOT NULL,
    tagline VARCHAR(50),
    business_description VARCHAR(400),
    company_size VARCHAR(400),
    company_stage VARCHAR(10),
    company_logo TEXT,
    company_photo TEXT,
    Industry VARCHAR(20)
)
CREATE TABLE "ANT_PROJECT" (
    A_ID INT PRIMARY KEY,
    Title VARCHAR(40) NOT NULL,
    -- Ongoing means accepting, not ongoing and completed is past project.
    available BOOLEAN,
    previous BOOLEAN,
    project_type VARCHAR(20),
    Project_Description VARCHAR(600),
    introduction VARCHAR(300)
);

CREATE TABLE "PROJECT_ROLES" (
    R_ID INT PRIMARY KEY,
    -- This has been migrated to person_ant_projects if position is filled
    -- U_ID INT REFERENCES PERSON(U_ID),
    A_ID INT REFERENCES ANT_PROJECT(A_ID),
    num_people INT,
    role_name VARCHAR(30) NOT NULL,
    -- role type is a subset of selections within graphic design, web development, app development, digital marketing
    role_type VARCHAR(30),
    role_length VARCHAR(50),
    compensation VARCHAR(20),
    timezone VARCHAR(10),
    industry VARCHAR(20),
    role_description VARCHAR(200)
);

CREATE TABLE "PROJECT_PREFERENCES" (
    P_ID INT PRIMARY KEY,
    U_ID INT REFERENCES PERSON,
    -- these should match the attributes under project_roles
    role_type VARCHAR(30),
    role_length VARCHAR(50),
    compensation VARCHAR(20),
    timezone VARCHAR(10),
);

CREATE TABLE "PROJECT_SKILLS" (
    S_ID INT REFERENCES SKILL,
    R_ID INT REFERENCES PROJECT_ROLES(R_ID)
);

CREATE TABLE "PERSON_ANT_PROJECTS" (
    U_ID INT REFERENCES PERSON(U_ID),
    R_ID INT REFERENCES PROJECT_ROLES(R_ID)
);

CREATE TABLE "BUSINESS_ANT_PROJECTS" (
    B_ID INT REFERENCES BUSINESS(B_ID),
    A_ID INT REFERENCES ANT_PROJECT(A_ID)
);

CREATE TABLE "BUSINESS_SAVED" (
    S_ID INT PRIMARY KEY,
    B_ID INT REFERENCES BUSINESS(B_ID),
    U_ID INT REFERENCES PERSON(U_ID)
);
