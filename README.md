
This application is built upon lightweight framework (Express in node.js and backend as Postgres) and is providing RESTful JSON Api endpoints to store and manage a data store of Pets. Along with that there are apis by which anyone can validate of latitude and longitude, can retrieve location information and weather forecasting information based latitude and longitude. 

## Setup
        1.	Clone or download the repo, then change to the directory
        2.	Install PostGresSQL 10 on local machine.
        3.	Open psql Shell command and connect to the server
        4.	Run - `psql -U postgres -f pets.sql`
        5.	Configure database connection string in config/default.json
        6.	Install dependencies  $npm install
        7.	Start the service $npm start

## EndPoints

These are api endpoints :
  1.	GET /api/pets : Returns list of all pets from database
  2.	GET /api/pets/{id} : Returns a specific pet’s info.
  
                                      {
                                      "status": "success",
                                       "data": {
                                              "id": 49,
                                               "name": "Ajaxis",
                                               "type": "Dog",
                                               "breed": "Brittany",
                                               "location": "n/a",
                                               "latitude": "22.5726",
                                               "longitude": "43.4545"
                                             },
                                    "message": "Get Single pet data"
                                    }
                                    
3.	GET /api/pets/{name}/{breed} : Return result of existence of any data which has same pet name and breed. 

                            {
                                "status": "success",
                                  "data": {
                                        "case": "0"
                                    } 
                              }

4.	GET /api/services/weather/{lat}/{lon} : This will call third party weather forecasting api (DarkSkyApi) to retrieve current weather information. Here,
                      i.	message : returns the brief summary of the weather.
                      ii.	Icon: returns icon name of the weather.
                      
                      {
                          "status": "success",
                          "message": "\"Clear\"",
                          "icon": "\"clear-night\""
                      }


5.	GET /api/services/isvalidloc/{lat}/{lon} : Return range validation result of latitude and longitude. A latitude valid range is -90 to +90  and longitude valid range is -180 to + 180.
                      {
                          "status": "success",
                          "message": "valid"
                      }
                                       Or  
                      {
                          "status": "fail",
                          "error": "Invalid longitude -214.618894"
                      } 
                      
6.	GET /api/services/location/{lat}/{lon} : This will retrieve location information based on latitude and longitude.

                               {
                                  "status": "success",
                                  "message": {
                                      "address_components": [
                                           {
                                              "long_name": "Toronto City Hall",
                                              "short_name": "Toronto City Hall",
                                              "types": [
                                                  "city_hall",
                                                  "establishment",
                                                  "local_government_office",
                                                  "point_of_interest",
                                                  "premise"
                                              ]
                                          }
                                      ],
                                     .....
                              }

7.	POST /api/pets :  Adds a new pet to the database. The post parameters are:

                    I.	name: the name of the pet
                    II.	type: the type of the pet
                    III.	breed: the breed of the pet
                    IV.	location: the city/state information of the pet's location
                    V.	latitude: the latitude coordinate of the pet's location( between -90 and +90) 
                    VI.	longitude: the longitude coordinate of the pet's location( between -180 and +180 )
                    
      At the time of insertion, we need to add header “Content-Type” = “application/json”
      
                        {
                                "name": "Cosmo1",
                                "type": "Cat",
                                "breed": "Braittany",
                                "location": "Loc2",
                                "latitude": "57.8267",
                                "longitude": "-122.4233"
                            }

8.	PUT /api/pets/{id}: Returns updated pet data from database based on specific pet id. At the time  of insertion, we need to add header “Content-Type” = “application/json”.

                            {
                              "status": "success",
                              "message": "Updated pet"
                            }
          
9.	DELETE /api/pets/{id}: Remove data from database based on specific pet id. 

                                {
                                     "status": "success",
                                     "message": "Removed 1 pet"
                                 }

