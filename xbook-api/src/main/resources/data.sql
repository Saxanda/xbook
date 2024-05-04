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

INSERT INTO chat (created_date, last_modified_date)
VALUES ('2024-04-21 20:25:59.391846', '2024-04-21 20:25:59.391846');

INSERT INTO chat (created_date, last_modified_date)
VALUES ('2024-05-01 10:12:19.391846', '2024-05-01 10:12:19.391846');

INSERT INTO chat_user (chat_id, user_id)
VALUES ('1', '1');
INSERT INTO chat_user (chat_id, user_id)
VALUES ('1', '2');

INSERT INTO chat_user (chat_id, user_id)
VALUES ('2', '1');
INSERT INTO chat_user (chat_id, user_id)
VALUES ('2', '3');

INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-04-21 20:27:59.391846', '2024-04-21 20:27:59.391846', 'TEXT', 'Hello Alice Smith!', '1', '1', 'SENT');
INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-04-21 20:28:02', '2024-04-21 20:28:02', 'TEXT', 'How are u?', '1', '1', 'SENT');
INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-04-21 20:30:01.393836', '2024-04-21 20:30:01.393836', 'TEXT', 'Hello John Doe!', '2', '1', 'SENT');
INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-04-21 20:30:03.39483', '2024-04-21 20:30:03.39483', 'TEXT', 'I`m OK', '2', '1', 'SENT');
INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-04-21 20:32:22.39483', '2024-04-21 20:32:22.39483', 'TEXT', 'And how are u?', '2', '1', 'SENT');
INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-04-21 20:37:59.391846', '2024-04-21 20:37:59.391846', 'TEXT', 'I`m perfect!', '1', '1', 'SENT');

INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-05-01 10:15:22.391846', '2024-05-01 10:15:22.391846', 'TEXT', 'Hello Bob Johnson!', '1', '2', 'SENT');
INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-05-01 10:17:22.391846', '2024-05-01 10:17:22.391846', 'TEXT', 'It`s been a long time since we last met...', '1', '2', 'SENT');
INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-05-01 10:26:22.391846', '2024-05-01 10:26:22.391846', 'TEXT', 'Let`s go for a walk tomorrow))', '1', '2', 'SENT');
INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-05-01 10:32:32.391846', '2024-05-01 10:32:32.391846', 'TEXT', 'Hello John Doe!', '3', '2', 'SENT');
INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-05-01 10:35:32.391846', '2024-05-01 10:35:32.391846', 'TEXT', 'Yeah, we can meet tomorrow at 6pm', '3', '2', 'SENT');


