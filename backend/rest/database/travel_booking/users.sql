create table users
(
    id         int auto_increment
        primary key,
    username   varchar(255)                          not null,
    email      varchar(255)                          not null,
    password   varchar(255)                          not null,
    full_name  varchar(255)                          null,
    phone      varchar(50)                           null,
    role       varchar(50)                           null,
    created_at timestamp default current_timestamp() not null,
    updated_at timestamp default current_timestamp() not null on update current_timestamp(),
    constraint email
        unique (email),
    constraint username
        unique (username)
);

