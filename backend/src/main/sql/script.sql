INSERT
  INTO role (id, name)
VALUES (1, 'ROLE_USER');
INSERT INTO user_entity (id, email, password, username)
VALUES (1, 'oliver.oliver@citromail.hu', '$2a$10$fuIOv01b68073fh2SiIQWeWkn4XydLiC6WWa1UWqt75COOadiNyY', 'Oliviero');
INSERT INTO user_entity_roles (user_entity_id, roles_id)
VALUES (1, 1);
INSERT INTO category (id, category_enum)
VALUES (1, 'GENERAL_KNOWLEDGE'),
       (2, 'POP_CULTURE'),
       (3, 'HISTORY'),
       (4, 'SCIENCE'),
       (5, 'NATURE'),
       (6, 'LITERATURE'),
       (7, 'BOOKS'),
       (8, 'GEOGRAPHY'),
       (9, 'TRAVEL'),
       (10, 'ART'),
       (11, 'ARTISTS'),
       (12, 'SPORTS'),
       (13, 'ATHLETICS'),
       (14, 'FOOD'),
       (15, 'CUISINE'),
       (16, 'TECHNOLOGY'),
       (17, 'MUSIC'),
       (18, 'MUSIC_INSTRUMENTS'),
       (19, 'MYTHOLOGY'),
       (20, 'FOLKLORE'),
       (21, 'MOVIES'),
       (22, 'TV_SHOWS'),
       (23, 'LANGUAGE'),
       (24, 'LINGUISTICS'),
       (25, 'HEALTH');
INSERT INTO quiz (id, created_at, is_public, is_valid, modified_at, title, creator_id)
VALUES (1, '2023-11-30 15:47:56.804801', TRUE, TRUE, '2023-11-30 15:58:49.322444', 'Advanced Java Quiz', 1);
INSERT INTO quiz_categories (quiz_id, categories_id)
VALUES (1, 1);
INSERT INTO task (id, created_at, index, modified_at, question, time_limit, quiz_id)
VALUES (1, '2023-11-30 21:56:54.005317', 0, '2023-11-30 21:56:54.005472',
        'What is the default value of the fields in Java?', 30, 1),
       (2, '2023-11-30 21:56:54.005317', 1, '2023-11-30 21:56:54.005472', 'What is the size of a char in Java?', 30, 1),
       (3, '2023-11-30 21:56:54.005317', 2, '2023-11-30 21:56:54.005472',
        'Can a Java project be compiled successfully without a main method?', 30, 1);
INSERT INTO answer (id, created_at, is_correct, modified_at, text, task_id)
VALUES (1, '2023-11-30 21:56:54.102122', FALSE, '2023-11-30 21:56:54.102146', '0', 1),
       (2, '2023-11-30 21:56:54.102122', FALSE, '2023-11-30 21:56:54.102146', 'null', 1),
       (3, '2023-11-30 21:56:54.102122', TRUE, '2023-11-30 21:56:54.102146', 'it depends on the data type of the field',
        1),
       (4, '2023-11-30 21:56:54.102122', FALSE, '2023-11-30 21:56:54.102146', 'fields do not have default values', 1),
       (5, '2023-11-30 21:56:54.102122', TRUE, '2023-11-30 21:56:54.102146', '16 bit', 2),
       (6, '2023-11-30 21:56:54.102122', FALSE, '2023-11-30 21:56:54.102146', '8 bit', 2),
       (7, '2023-11-30 21:56:54.102122', FALSE, '2023-11-30 21:56:54.102146', '3Bit', 2),
       (8, '2023-11-30 21:56:54.102122', FALSE, '2023-11-30 21:56:54.102146', '32 bit', 2),
       (9, '2023-11-30 21:56:54.102122', TRUE, '2023-11-30 21:56:54.102146', 'yes', 3),
       (10, '2023-11-30 21:56:54.102122', FALSE, '2023-11-30 21:56:54.102146', 'no', 3);
