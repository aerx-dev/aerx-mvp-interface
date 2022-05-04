-- Turn on automatic inflection of type names
comment on schema public is '@graphql({"inflect_names": true})';

create table profile(
    id serial primary key,
    hobbys text,
    token_id text not null,
    username text,
    fullname text,
    about_me text,
    city text,
    country text,
    avatar_url text,
    extra text,
    created_at timestamp not null,
    updated_at timestamp not null
);

create table account(
    id serial primary key,
    address text not null,
    email varchar(255) not null,
    created_at timestamp not null,
    updated_at timestamp not null
);

create table post(
    id serial primary key,
    owner_id integer not null references account(id),
    title varchar(255) not null,
    description varchar(255),
    created_at timestamp not null,
    updated_at timestamp not null
);

create type post_nft_status as enum ('PENDING', 'POSTED');

create table post_nft(
    id uuid not null default uuid_generate_v4() primary key,
    post_id integer not null references post(id),
    title varchar(255) not null,
    media varchar(255),
    media_hash varchar(255),
    media_type varchar(255),
    totalCharged float,
    extra varchar(10000),
    status post_nft_status not null,
    created_at timestamp not null,
    updated_at timestamp not null
);

-- This builds the GQL Schema on Supabase
-- Our Schema gen script will then pull the schema from supabase
-- Rebuild the GraphQL Schema Cache
select graphql.rebuild_schema();
