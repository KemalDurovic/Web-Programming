create table user_favorites
(
    user_id        int                                   not null,
    destination_id int                                   not null,
    added_at       timestamp default current_timestamp() not null,
    primary key (user_id, destination_id),
    constraint user_favorites_ibfk_1
        foreign key (user_id) references users (id)
            on delete cascade,
    constraint user_favorites_ibfk_2
        foreign key (destination_id) references destinations (id)
            on delete cascade
);

create index destination_id
    on user_favorites (destination_id);

