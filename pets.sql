DROP DATABASE IF EXISTS petweather;
CREATE DATABASE petweather;

\c petweather;

CREATE TABLE public.pets (  id SERIAL PRIMARY KEY, 
						  name VARCHAR, 
						  type VARCHAR, 
						  breed VARCHAR, 
						  location VARCHAR,
						  latitude VARCHAR,
						 longitude VARCHAR);

INSERT INTO public.pets( name, type, breed, location, latitude, longitude)VALUES ('Ajaxis','Dog','Beogle','n/a','22.5726','88.3639');
INSERT INTO public.pets( name, type, breed, location, latitude, longitude)VALUES ('Banshee','Dog','Brittany','n/a','50.445211','-104.618894');
INSERT INTO public.pets( name, type, breed, location, latitude, longitude)VALUES ('Cosmo','Cat','Balinese','n/a','40.712775','-74.005973');
INSERT INTO public.pets( name, type, breed, location, latitude, longitude)VALUES ('Daredevil','Dog','Pointer','n/a','23.810332','90.412518');
INSERT INTO public.pets( name, type, breed, location, latitude, longitude)VALUES ('Groot','Cat','Sphynx','n/a','43.653226','-79.383184');
INSERT INTO public.pets( name, type, breed, location, latitude, longitude)VALUES ('Hydra','Dog','Shiba','n/a','50.445211','-104.618894');
