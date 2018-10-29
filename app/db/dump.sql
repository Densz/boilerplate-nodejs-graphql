CREATE TABLE accounts(
  id serial PRIMARY KEY,
  uuid CHAR (36) NOT NULL,
  firstname VARCHAR (50) NOT NULL,
  lastname VARCHAR (50) NOT NULL,
  password VARCHAR (355) NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP NOT NULL,
  last_login TIMESTAMP
);

CREATE TABLE posts(
  id serial PRIMARY KEY,
  uuid CHAR (36) NOT NULL,
  account_id INT NOT NULL,
  image_url VARCHAR (355) NOT NULL,
  title VARCHAR (355) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP NOT NULL
);

CREATE TABLE likes(
  id serial PRIMARY KEY,
  uuid CHAR (36) NOT NULL,
  account_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP NOT NULL
);

CREATE TABLE comments(
  id serial PRIMARY KEY,
  uuid CHAR (36) NOT NULL,
  account_id INT NOT NULL,
  post_id INT NOT NULL,
  comment VARCHAR (355) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP NOT NULL
);
