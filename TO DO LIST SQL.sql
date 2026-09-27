-- ==========================================================
-- TODO SMART ALERTS - CONSOLIDATED SCHEMA
-- ==========================================================

CREATE DATABASE TodoSmartAlerts;


USE TodoSmartAlerts;


-- 1. USERS
CREATE TABLE Users
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(200) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(20) NULL,
    Password VARCHAR(255) NOT NULL,
    LastLatitude FLOAT NULL,
    LastLongitude FLOAT NULL,
    LastLocationUpdatedAt DATETIME NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    IsActive BIT NOT NULL DEFAULT 1
);


-- 2. USER SETTINGS
CREATE TABLE UserSettings
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    NotificationEnabled BIT NOT NULL DEFAULT 1,
    DarkModeEnabled BIT NOT NULL DEFAULT 0,
    SnoozeMinutes INT NOT NULL DEFAULT 5,
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_UserSettings_User
        FOREIGN KEY (UserId)
        REFERENCES Users(Id)
        ON DELETE CASCADE
);


-- 3. USER LOCATIONS
CREATE TABLE UserLocations
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    Latitude DECIMAL(10,7) NOT NULL,
    Longitude DECIMAL(10,7) NOT NULL,
    Accuracy DECIMAL(10,2) NULL,
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_UserLocations_User
        FOREIGN KEY (UserId)
        REFERENCES Users(Id)
        ON DELETE CASCADE
);


-- 4. GROUPS
CREATE TABLE GroupsUser
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(150) NOT NULL,
    CreatedBy INT NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_GroupsUser_CreatedBy
        FOREIGN KEY (CreatedBy)
        REFERENCES Users(Id)
);


-- 5. GROUP MEMBERS
CREATE TABLE GroupMembers
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    GroupId INT NOT NULL,
    UserId INT NULL,
    Name VARCHAR(150) NULL,
    Phone VARCHAR(20) NULL,
    Role VARCHAR(10) NOT NULL DEFAULT 'Member'
        CHECK (Role IN ('Admin','Member')),
    AddedAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_GroupMembers_Group
        FOREIGN KEY (GroupId)
        REFERENCES GroupsUser(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_GroupMembers_User
        FOREIGN KEY (UserId)
        REFERENCES Users(Id)
);


-- 6. TASKS
CREATE TABLE Tasks
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title VARCHAR(300) NOT NULL,
    Description VARCHAR(MAX) NULL,
    IsTimeBased BIT NOT NULL DEFAULT 1,
    DueDate DATE NULL,
    DueTime TIME NULL,
    GroupId INT NULL,
    CreatedBy INT NOT NULL,
    AssignedTo INT NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'Pending'
        CHECK (Status IN ('Pending','Done','Snoozed','Cancelled')),
    Latitude DECIMAL(10,7) NULL,
    Longitude DECIMAL(10,7) NULL,
    GeofenceRadiusMeters INT NOT NULL DEFAULT 200,
    GeofenceEnabled BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Tasks_Group
        FOREIGN KEY (GroupId)
        REFERENCES GroupsUser(Id)
        ON DELETE SET NULL,

    CONSTRAINT FK_Tasks_CreatedBy
        FOREIGN KEY (CreatedBy)
        REFERENCES Users(Id),

    CONSTRAINT FK_Tasks_AssignedTo
        FOREIGN KEY (AssignedTo)
        REFERENCES Users(Id)
);


-- 7. TASK RESPONSES
CREATE TABLE TaskResponses
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    TaskId INT NOT NULL,
    UserId INT NOT NULL,
    Response VARCHAR(20) NOT NULL
        CHECK (Response IN ('Picked','Ignored')),
    RespondedAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_TaskResponses_Task
        FOREIGN KEY (TaskId)
        REFERENCES Tasks(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_TaskResponses_User
        FOREIGN KEY (UserId)
        REFERENCES Users(Id),

    CONSTRAINT UQ_TaskResponses
        UNIQUE (TaskId, UserId)
);


-- 8. TASK MENTIONS
CREATE TABLE TaskMentions
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    TaskId INT NOT NULL,
    MentionedUserId INT NOT NULL,
    MentionedBy INT NOT NULL,
    MentionedAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_TaskMentions_Task
        FOREIGN KEY (TaskId)
        REFERENCES Tasks(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_TaskMentions_MentionedUser
        FOREIGN KEY (MentionedUserId)
        REFERENCES Users(Id),

    CONSTRAINT FK_TaskMentions_MentionedBy
        FOREIGN KEY (MentionedBy)
        REFERENCES Users(Id),

    CONSTRAINT UQ_TaskMention
        UNIQUE (TaskId, MentionedUserId)
);


-- 9. NOTIFICATIONS
CREATE TABLE Notifications
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    TaskId INT NOT NULL,
    UserId INT NOT NULL,
    SenderId INT NULL,
    Message VARCHAR(MAX) NULL,
    Type VARCHAR(30) NULL,
    IsRead BIT NOT NULL DEFAULT 0,
    SentAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Notifications_Task
        FOREIGN KEY (TaskId)
        REFERENCES Tasks(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Notifications_User
        FOREIGN KEY (UserId)
        REFERENCES Users(Id),

    CONSTRAINT FK_Notifications_Sender
        FOREIGN KEY (SenderId)
        REFERENCES Users(Id)
);


-- 10. FORWARDED TASKS
CREATE TABLE ForwardedTasks
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    OriginalTaskId INT NOT NULL,
    ForwardedBy INT NOT NULL,
    ForwardedTo INT NOT NULL,
    ForwardedAt DATETIME NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Forwarded_Task
        FOREIGN KEY (OriginalTaskId)
        REFERENCES Tasks(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Forwarded_By
        FOREIGN KEY (ForwardedBy)
        REFERENCES Users(Id),

    CONSTRAINT FK_Forwarded_To
        FOREIGN KEY (ForwardedTo)
        REFERENCES Users(Id)
);


-- 11. SNOOZE LOGS
CREATE TABLE SnoozeLogs
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    TaskId INT NOT NULL,
    UserId INT NOT NULL,
    SnoozedAt DATETIME NOT NULL DEFAULT GETDATE(),
    WakeAt DATETIME NOT NULL,

    CONSTRAINT FK_Snooze_Task
        FOREIGN KEY (TaskId)
        REFERENCES Tasks(Id)
        ON DELETE CASCADE,

    CONSTRAINT FK_Snooze_User
        FOREIGN KEY (UserId)
        REFERENCES Users(Id)
);
