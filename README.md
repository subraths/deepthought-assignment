# Api documentation


#### Base URL: http://localhost:5000/api/v3/app


## Object Data Model of an Event

* **uid** (mongdb userId): unique userId of the user that creates the event, user doesnot need to provide it, the should be logged-in to create an event.
* **type** ("event"): takes string value to specify the type of nudge, by default it takes values: "event" only, more can be added as needed.
* **name** (String): name of the event. takes minimum of 3 characters and maximum of 20 characters.
* **tagline** (String): tagline of the event. takes minimum of 3 characters and maximum of 20 characters.
* **schedule** (Date + Time): Date and time of the event.
* **description** (String): description of the event, takes minimum of 6 characters and maximum of 50 characters.
* **image** (file): takes and image file of any format.
* **moderator** (String): take name of the moderator.
* **category** (String): category name.
* **subcategory** (String): subcategory name.
* **rigor_rank** (Number): takes interger value from 1 to 10.
* **attendees** (String): takes a list of attendees name seperated by ",".

## Object Data Model of an User

* **username** (String): unique username field, This field cannot be changed once created.
                         minlength: 3 character,
                         maxlength: 20 characters
* **name** (String): takes full name of an  user
                         minlength: 3 characters,
                         maxlength: 20
* **email** (String): email address
* **password** (String): take password and hashes it and store it in database

## API Endpoints

### 1. **Register User**
    Creates a new user

**Request**
* Method: **`POST`**
* Endpoint: **`/register`**
