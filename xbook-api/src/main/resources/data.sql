INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('John', 'Doe', 'john.doe@example.com', '$2a$10$iwRji5mPlwatlHuKkof20Ot/pQfuUIqrpEviIRk4gMGdeH1XWaavm', '1990-01-01', 'male', 'USER', 'photo.jpg', 'avatar.jpg', '123 Main Street', TRUE);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Alice', 'Smith', 'alice.smith@example.com', '$2a$10$7nnuayAu1EP9DnxjSYzwYuqtN4D8rcO0NSsvnS8jxPLDLgw6wysxG', '1985-05-15', 'female', 'USER', 'alice.jpg', 'avatar.jpg', '456 Elm Street', TRUE);

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('Bob', 'Johnson', 'bob.johnson@example.com', '$2a$10$YyQEGCym7XcBy.qlR.vAXu7KL4EyriKFeiyE3x/f43zvT5z/FXS0S', '1978-10-30', 'male', 'USER', 'bob.jpg', 'avatar.jpg', '789 Oak Avenue', TRUE);

INSERT INTO friends (user_id, friend_id, status) VALUES (1, 2, 'PENDING');
INSERT INTO friends (user_id, friend_id, status) VALUES (1, 3, 'PENDING');

