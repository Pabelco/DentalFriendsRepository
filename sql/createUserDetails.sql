-- Table: public.user_details

-- DROP TABLE public.user_details;

CREATE TABLE public.user_details
(
    id_details integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 2147483647 CACHE 1 ),
    identity_card character varying(25) default '',
    address character varying(300) default '',
    speciality character varying(150) default '',
    details json ,
    picture_url character varying(300) default '',
    CONSTRAINT user_details_pkey PRIMARY KEY (id_details)
)

TABLESPACE pg_default;

ALTER TABLE public.user_details
    OWNER to super_admin;