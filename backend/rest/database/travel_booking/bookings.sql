create table bookings
(
    id               int auto_increment
        primary key,
    user_id          int                                                                                 not null,
    package_id       int                                                                                 not null,
    booking_date     date                                                    default curdate()           null,
    number_of_people int                                                                                 not null,
    total_price      decimal(10, 3)                                                                      not null,
    status           enum ('pending', 'confirmed', 'cancelled', 'completed') default 'pending'           null,
    special_requests text                                                                                null,
    created_at       timestamp                                               default current_timestamp() not null,
    updated_at       timestamp                                               default current_timestamp() not null on update current_timestamp(),
    constraint bookings_ibfk_1
        foreign key (user_id) references users (id)
            on delete cascade,
    constraint bookings_ibfk_2
        foreign key (package_id) references packages (id)
            on delete cascade
);

create index idx_bookings_package
    on bookings (package_id);

create index idx_bookings_status
    on bookings (status);

create index idx_bookings_user
    on bookings (user_id);

