-- FUNCTION: public.login_user(character varying, character varying)

-- DROP FUNCTION public.login_user(character varying, character varying);

CREATE OR REPLACE FUNCTION public.login_user(
	user_name_sp character varying,
	password_sp character varying)
    RETURNS TABLE(ide integer, user_name character varying, email character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
begin
	return query 
	    SELECT us.id, us.user_name, us.email
		FROM users us
		WHERE us.user_name = user_name_sp
		   AND us.password = crypt(password_sp, us.password)
		   AND us.active = TRUE;
end;
$BODY$;

ALTER FUNCTION public.login_user(character varying, character varying)
    OWNER TO super_admin;
