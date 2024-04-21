INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address)
VALUES ('John', 'Doe', 'john.doe@example.com', '$2a$10$iwRji5mPlwatlHuKkof20Ot/pQfuUIqrpEviIRk4gMGdeH1XWaavm', '1990-01-01', 'male', 'USER', 'photo.jpg', 'avatar.jpg', '123 Main Street');

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address)
VALUES ('Alice', 'Smith', 'alice.smith@example.com', '$2a$10$7nnuayAu1EP9DnxjSYzwYuqtN4D8rcO0NSsvnS8jxPLDLgw6wysxG', '1985-05-15', 'female', 'USER', 'alice.jpg', 'avatar.jpg', '456 Elm Street');

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address)
VALUES ('Bob', 'Johnson', 'bob.johnson@example.com', '$2a$10$YyQEGCym7XcBy.qlR.vAXu7KL4EyriKFeiyE3x/f43zvT5z/FXS0S', '1978-10-30', 'male', 'USER', 'bob.jpg', 'avatar.jpg', '789 Oak Avenue');

INSERT INTO chat (created_date, last_modified_date)
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO chat_user (chat_id, user_id)
VALUES ('1', '1');

INSERT INTO chat_user (chat_id, user_id)
VALUES ('1', '2');

INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-04-21 20:27:59.391846', '2024-04-21 20:27:59.391846', 'TEXT', 'Hello Alice Smith!', '1', '1', 'SENT');

INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-04-21 20:28:01.393836', '2024-04-21 20:28:01.393836', 'TEXT', 'Hello John Doe!', '2', '1', 'SENT');

INSERT INTO message (created_date, last_modified_date, content_type, content, sender_id, chat_id, status)
VALUES ('2024-04-21 20:28:03.39483', '2024-04-21 20:28:03.39483', 'TEXT', 'How are u, Alice Smith?', '1', '1', 'SENT');

