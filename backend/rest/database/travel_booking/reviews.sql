create table reviews
(
    id             int auto_increment
        primary key,
    user_id        int                                    not null,
    destination_id int                                    not null,
    package_id     int                                    null,
    rating         int                                    not null
        check (`rating` >= 1 and `rating` <= 5),
    title          varchar(255)                           null,
    comment        text                                   null,
    is_verified    tinyint(1) default 1                   null,
    created_at     timestamp  default current_timestamp() not null,
    updated_at     timestamp  default current_timestamp() not null on update current_timestamp(),
    constraint reviews_ibfk_1
        foreign key (user_id) references users (id)
            on delete cascade,
    constraint reviews_ibfk_2
        foreign key (destination_id) references destinations (id)
            on delete cascade,
    constraint reviews_ibfk_3
        foreign key (package_id) references packages (id)
            on delete set null
);

create index idx_reviews_destination
    on reviews (destination_id);

create index idx_reviews_user
    on reviews (user_id);

create index package_id
    on reviews (package_id);

