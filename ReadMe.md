## Requirements

* Node.js
* MySQL v5.6 or higher

## Instalation

1. Node.js
  1. Download and install the newest version of [Node.js](https://nodejs.org/en/download/)

2. MySQL
  1. Download and install MySQL v5.6 or higher (Please remember the user name and password)
  2. Create new schema(database). Example: accedo_db
  3. Create new table **sessions**
  4. Add 3 columns to **sessions**:
    - session_id, Datetype: VARCHAR(45), Primary Key
    - expires, Datetype: INT(11)
    - data, Datetype: LONGTEXT
  5. Create new table **history**
  6. Add 4 columns to **history**:
    - idhistory, Datetype: INT(11), Primary Key
    - session_id, Datetype: VARCHAR(45), Foreign Key -> **sessions**- session_id
    - movie_id, Datetype: VARCHAR(45)
    - created, Datetype: TIMESTAMP, Default Value: CURRENT_TIMESTAMP

3. Run MySQL

4. In file **server.js** replace the *user, password and database* values to yours. Example:
````javascript
var db_options = {
    host: 'localhost',
    //port: 3306,
    user: 'your_db_username',
    password: 'your_db_password',
    database: 'your_db'
};

var optionsss = {
    host: 'localhost',
    //port: 3306,
    user: 'your_db_username',
    password: 'your_db_password',
    database: 'your_db',
    schema: {
        tableName: 'sessions',
        columnNames: {
            sessions_id: 'sessions_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
````
## Application start 
1. In Command line go to your application directory and use `node server.js` to run your server (if you are using LINUX use `sudo node server.js`)

2. Enjoy your application
    
