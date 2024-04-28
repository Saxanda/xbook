

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address)
VALUES ('Alice', 'Smith', 'alice.smith@example.com', '$2a$10$7nnuayAu1EP9DnxjSYzwYuqtN4D8rcO0NSsvnS8jxPLDLgw6wysxG', '1985-05-15', 'female', 'USER', 'alice.jpg', 'avatar.jpg', '456 Elm Street');

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address)
VALUES ('Bob', 'Johnson', 'bob.johnson@example.com', '$2a$10$YyQEGCym7XcBy.qlR.vAXu7KL4EyriKFeiyE3x/f43zvT5z/FXS0S', '1978-10-30', 'male', 'USER', 'bob.jpg', 'avatar.jpg', '789 Oak Avenue');

INSERT INTO users (name, surname, email, password, date_of_birth, gender, role, photo, avatar, address, is_activated)
VALUES ('John', 'Doe', 'john.doe@example.com', '$2a$10$iwRji5mPlwatlHuKkof20Ot/pQfuUIqrpEviIRk4gMGdeH1XWaavm', '1990-01-01', 'male', 'USER', 'photo.jpg', 'avatar.jpg', '123 Main Street', TRUE);

INSERT INTO posts (user_id, title, body, media, likes, post_id, type, original_post_id)
VALUES    (1, 'My First Post', 'This is my first post on XBook!', 'https://m.media-amazon.com/images/I/71FEBlBJqgL._AC_SL1312_.jpg', 10, 1, 'ORIGINAL', NULL);
