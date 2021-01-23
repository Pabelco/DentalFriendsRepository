-- Table: public.pacient

-- DROP TABLE public.pacient;

CREATE TABLE public.pacient
(
    id integer NOT NULL DEFAULT nextval('pacient_id_seq'::regclass),
    id_card_pacient character varying(20) COLLATE pg_catalog."default",
    name_pacient character varying(50) COLLATE pg_catalog."default",
    lastname_pacient character varying(50) COLLATE pg_catalog."default",
    age_pacient integer,
    gender_pacient character(1) COLLATE pg_catalog."default",
    address_pacient character varying(100) COLLATE pg_catalog."default",
    phone_pacient character varying(10) COLLATE pg_catalog."default",
    email_pacient character varying(80) COLLATE pg_catalog."default",
    details_pacient json,
    CONSTRAINT pacient_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.pacient
    OWNER to super_admin;

COMMENT ON COLUMN public.pacient.name_pacient
    IS 'nombre  del paciente';