-- Table: public.appointment

-- DROP TABLE public.appointment;

CREATE TABLE public.appointment
(
    id SERIAL,
    state boolean NOT NULL,
    date date NOT NULL,
    id_user integer REFERENCES users ON DELETE CASCADE,
    details json,
    id_pacient integer,
    CONSTRAINT appointment_pkey PRIMARY KEY (id)
)
 
 