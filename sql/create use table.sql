 CREATE TABLE public.users
(
    id SERIAL,
    user_name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password TEXT NOT NULL,
	active boolean NOT NULL,
	PRIMARY KEY(user_name)
) 

