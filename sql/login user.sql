create or replace function login_user (
  user_name_sp varchar, password_sp varchar
) 
	returns table ( id int, user_name varchar(100), email varchar(100)) 
	language plpgsql
as $$
begin
	return query 
	    SELECT us.id, us.user_name, us.email
		FROM users us
		WHERE us.user_name = user_name_sp
		   AND us.password = crypt(password_sp, us.password)
		   AND us.active = TRUE;
end;$$

select login_user('23', 'dasdsa'); 