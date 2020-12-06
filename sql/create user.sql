create or replace function create_user (
  user_name_sp varchar, password_sp varchar(100), email_sp varchar(100)
) RETURNS VOID
	language plpgsql
as $$
begin 
	INSERT INTO public.users(user_name, email, password, active)
		VALUES (user_name_sp, email_sp, crypt(password_sp, gen_salt('bf')), FALSE);	
end;$$
  

