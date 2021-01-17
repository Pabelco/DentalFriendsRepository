-- Table: public.pacient

-- DROP TABLE public.pacient;

CREATE TABLE public.pacient
(
	id SERIAL,
    id_card_pacient character varying(20),
    name_pacient character varying(50),
    lastname_pacient character varying(50),
    age_pacient integer NOT NULL,
    gender_pacient character(1),
    address_pacient character varying(100),
    phone_pacient character varying(10),
    email_pacient character varying(80),
    details_pacient json,
    CONSTRAINT pacient_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.pacient
    OWNER to super_admin;

COMMENT ON COLUMN public.pacient.name_pacient
    IS 'nombre  del paciente';