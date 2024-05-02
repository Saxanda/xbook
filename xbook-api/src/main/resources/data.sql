INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('John', 'Doe', 'sorukv@gmail.com', '$2a$10$iwRji5mPlwatlHuKkof20Ot/pQfuUIqrpEviIRk4gMGdeH1XWaavm', '1990-01-01', 'male', 'USER', 'photo.jpg', 'avatar.jpg', '123 Main Street', true);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Alice', 'Smith', 'alice.smith@example.com', '$2a$10$7nnuayAu1EP9DnxjSYzwYuqtN4D8rcO0NSsvnS8jxPLDLgw6wysxG', '1985-05-15', 'female', 'USER', 'alice.jpg', 'avatar.jpg', '456 Elm Street', true);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Bob', 'Johnson', 'bob.johnson@example.com', '$2a$10$YyQEGCym7XcBy.qlR.vAXu7KL4EyriKFeiyE3x/f43zvT5z/FXS0S', '1978-10-30', 'male', 'USER', 'bob.jpg', 'avatar.jpg', '789 Oak Avenue', true);

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


