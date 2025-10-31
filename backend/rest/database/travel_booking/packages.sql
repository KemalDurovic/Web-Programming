create table packages
(
    id              int auto_increment
        primary key,
    destination_id  int                                               not null,
    name            varchar(255)                                      not null,
    category        enum ('Adventure', 'Beach', 'Cultural', 'Luxury') null,
    duration_days   int                                               not null,
    duration_nights int                                               not null,
    what_includes   text                                              null,
    price           decimal(10, 3)                                    not null,
    tags            enum ('Best Seller', 'Premium', 'Exclusive')      null,
    created_at      timestamp default current_timestamp()             not null,
    updated_at      timestamp default current_timestamp()             not null on update current_timestamp(),
    constraint packages_ibfk_1
        foreign key (destination_id) references destinations (id)
            on delete cascade
);

create index idx_packages_destination
    on packages (destination_id);

