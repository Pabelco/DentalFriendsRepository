-- Table: public.appointment

-- DROP TABLE public.appointment;

CREATE TABLE public.appointment
(
    id integer NOT NULL DEFAULT nextval('appointment_id_seq'::regclass),
    state boolean NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    id_user integer,
    details json,
    id_pacient integer,
    CONSTRAINT appointment_pkey PRIMARY KEY (id),
    CONSTRAINT appointment_id_user_fkey FOREIGN KEY (id_user)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.appointment
    OWNER to super_admin;