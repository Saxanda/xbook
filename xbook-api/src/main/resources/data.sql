INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('John', 'Doe', 'john.doe@example.com', '$2a$10$iwRji5mPlwatlHuKkof20Ot/pQfuUIqrpEviIRk4gMGdeH1XWaavm', '1990-01-01', 'male', 'USER', 'photo.jpg', 'avatar.jpg', '123 Main Street', TRUE);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Alice', 'Smith', 'alice.smith@example.com', '$2a$10$7nnuayAu1EP9DnxjSYzwYuqtN4D8rcO0NSsvnS8jxPLDLgw6wysxG', '1985-05-15', 'female', 'USER', 'alice.jpg', 'avatar.jpg', '456 Elm Street', TRUE);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Bob', 'Johnson', 'bob.johnson@example.com', '$2a$10$YyQEGCym7XcBy.qlR.vAXu7KL4EyriKFeiyE3x/f43zvT5z/FXS0S', '1978-10-30', 'male', 'USER', 'bob.jpg', 'avatar.jpg', '789 Oak Avenue', TRUE);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Emma', 'Wilson', 'emma.wilson@example.com', '$2a$10$LsMoYoPSERjDjZ2bCJelI.0M9en97EdWLgwFjV3A0XOotPBTJVsD6', '1992-03-18', 'female', 'USER', 'emma.jpg', 'avatar.jpg', '234 Pine Street', TRUE);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Michael', 'Brown', 'michael.brown@example.com', '$2a$10$FQ42xq1RXH6.HOyW1mBeMOMk1e4ThKEdrSzvRLjURaD6oHLPpzyam', '1988-07-27', 'male', 'USER', 'michael.jpg', 'avatar.jpg', '345 Maple Avenue', TRUE);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Olivia', 'Taylor', 'olivia.taylor@example.com', '$2a$10$P1q9mJiyEk1jU4Vs5F3esewZ9W0o0tD1zj03fVwNKGHRvDK/2NCq6', '1995-09-12', 'female', 'USER', 'olivia.jpg', 'avatar.jpg', '456 Oak Street', TRUE);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('William', 'Jones', 'william.jones@example.com', '$2a$10$R3p3g1sv9aWSP8hRJKwHBeWkf3Cceh0ktHJg9P6eKJUb68tj6.3mi', '1980-12-05', 'male', 'USER', 'william.jpg', 'avatar.jpg', '567 Cedar Avenue', TRUE);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Sophia', 'Garcia', 'sophia.garcia@example.com', '$2a$10$w1rNnQawEUWbO8fGyAed1Olu/U.gOQCKkCFrVWs5VWZq5eizR2upu', '1998-01-30', 'female', 'USER', 'sophia.jpg', 'avatar.jpg', '678 Elm Street', TRUE);

INSERT INTO friends (user_id, friend_id, status) VALUES (1, 3, 'PENDING');
INSERT INTO friends (user_id, friend_id, status) VALUES (2, 3, 'PENDING');
INSERT INTO friends (user_id, friend_id, status) VALUES (1, 2, 'ACCEPTED');
INSERT INTO friends (user_id, friend_id, status) VALUES (2, 1, 'ACCEPTED');
INSERT INTO friends (user_id, friend_id, status) VALUES (1, 4, 'ACCEPTED');
INSERT INTO friends (user_id, friend_id, status) VALUES (4, 1, 'ACCEPTED');
INSERT INTO friends (user_id, friend_id, status) VALUES (1, 5, 'ACCEPTED');
INSERT INTO friends (user_id, friend_id, status) VALUES (5, 1, 'ACCEPTED');
INSERT INTO friends (user_id, friend_id, status) VALUES (1, 6, 'ACCEPTED');
INSERT INTO friends (user_id, friend_id, status) VALUES (6, 1, 'ACCEPTED');
INSERT INTO friends (user_id, friend_id, status) VALUES (1, 7, 'ACCEPTED');
INSERT INTO friends (user_id, friend_id, status) VALUES (7, 1, 'ACCEPTED');


