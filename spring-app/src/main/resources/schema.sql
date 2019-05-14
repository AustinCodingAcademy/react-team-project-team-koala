create table clients (
	id integer PRIMARY KEY AUTOINCREMENT,
	name varchar(255),
	phone_number varchar(255),
	address varchar(255)
);

create table pets (
	id integer PRIMARY KEY AUTOINCREMENT,
	name varchar(255),
	gender varchar(255),
	altered boolean,
	client_id integer,
	FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE appointments(
    id integer PRIMARY KEY AUTOINCREMENT,
    pet_id integer REFERENCES pets(id),
    date DATE,
		reason varchar(255),
		FOREIGN KEY (pet_id) REFERENCES pets(id)
);

create table users (
	id integer PRIMARY KEY AUTOINCREMENT,
	username varchar(255),
	encoded_password varchar(255),
	role varchar(255)
);

insert into users values (null, 'admin', 'password', 'SUPER_ADMIN');
