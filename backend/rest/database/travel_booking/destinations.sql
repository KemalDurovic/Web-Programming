create table destinations
(
    id          int auto_increment
        primary key,
    name        varchar(255)                                                              not null,
    location    varchar(255)                                                              not null,
    country     varchar(100)                                                              not null,
    description text                                                                      null,
    image_url   varchar(500)                                                              null,
    badge       enum ('Popular', 'Trending', 'Cultural', 'Adventure', 'Winter', 'Safari') null,
    price_from  decimal(10, 3)                                                            null,
    featured    tinyint(1) default 0                                                      null,
    created_at  timestamp  default current_timestamp()                                    not null,
    updated_at  timestamp  default current_timestamp()                                    not null on update current_timestamp()
);

create index idx_destinations_featured
    on destinations (featured);

