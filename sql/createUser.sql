-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id SERIAL,
    user_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    active boolean NOT NULL,
    id_details integer,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to super_admin;