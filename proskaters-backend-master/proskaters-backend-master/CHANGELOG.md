# Change Log

## 2021-04-17

### Added

- orders table keeping track of all purchases performed by users
- orderlogs table keeping track of all state changes done to an order
- ability to modify an order's state (refunding, canceled, shipped, and delivered)
- ability to see all information of an order
- ability to get all the orders of a user

### Changed

- moved purchase and order into their own separate controllers due to complex logic

## 2021-03-24

### Added

- the ability to make purchase of a list of products

### Fixed

- allow for the same PaymentMethod object to be used by multiple PaymentIntent object by attaching it to a Customer object

### Changed

- changed the naming of usage of some modules from plural to singular

## 2021-02-21

### Added

- Add routes and controllers for changing a user's password
- Add unit and integration test cases to support

### Fixed

- fixed numerous bugs in updating account information as well as update password route
- enforce proper error throwing in backend

## 2021-02-20

### Added

- Add routes and controllers for updating and getting account info
- Add unit and integration test cases to support `updateAccountInfo` and `getAccountInfo`

### Changed

- Separate `app.js` route functions into their own route files
- Remove `async` from most of the routing functions

### Fixed

- Remove `retrievePaymentInfo`, payment info will be retrieved in the `getAccountInfo` instead

## 2021-02-19

### Added

- Added integration test cases to support avePaymentInfo, and retrievePaymentInfo.

### Changed

- Unified error message returning to the party requesting resources from the API backend service
- Enhance API documentation, stating the method, route, input data, expected output and errors for each endpoint

## 2021-02-18

### Added

- Added unit test cases to support validatePayment.
- Added the sql for create payments table.
- Added payments module to create Stripe PaymentMethod object to save payment information, and retrieve the saved payment information.
- Added routes to listen to the clients' requests to save and retrieve payment information.

## 2021-01-31

### Added

- Added unit test cases to support jwt, account registration, account login
- Added the sql for create account table.
- Added integration test cases to support login and registration

### Changed

- Account registration now returns id
- Fixed a bug causing unmatching passwords in account registration to not throw
- Fixed database connection pool. Now it releases the connection after perform a query.

## 2021-01-23

### Added

- Added authentication module including account.js and utils/jwt.js
- Added ErrorMessageSamples.xlsx file that shows the examples of common error message.

### Changed

- Modified app.js to handle the login and sign-up request using JWT.
- Modified product.js to format the error messages in a same JSON object format.

## 2021-12-16

### Added

- integration testing
- support integration testing on github actions
- testing coverage
- more unit tests

### Changed

- trim down column size in database
- stock_amount and rating are now mandatory columns

### Fixed

- remove extra query in CRUD operations
- correct naming for parameters in CRUD functions

## 2021-12-16

### Added

- add support for local postgres instance
- more unit testing cases for product schema validation
- add .prettierignore to ignore html files from test coverage reports

### Changed

- use debug module for logging for backend, which can be turned on or off
- prettify SQL script

### Fixed

- fix potentially uncaught exception happening with pool.connect()
- wrap image upload function with try and catch

## 2021-12-06

### Added

- add images for sample products into the image folder

### Changed

- change database name from product_list to products per SQL convention
- change image column to contain only filename instead of full url path

## 2021-12-05

### Added

- add route for users to upload images
- images are uploaded to public/images, which is now a statically served folder

### Changed

- Changed API routes.

## 2021-12-04

### Changed

- Changed app.post() functions in server.js to take parameter from req.body.
- Tested using post requests.

## 2021-11-27

### Added

- add addProduct(), updateProduct(), deleteProduct() and findProduct() functions in controllers/product.js to implement CRUD in the database.
- add functions in server.js to handle the post request of calling add, delete, update and find product in the database.

### Changed

- replace Joi.validate() by Joi.attempt() in the validateProduct() function.

## 2021-11-20

### Changed

- replace image links in SQL command

## 2021-11-20

### Changed

- adjust image source being used in database creation script
- adjust formatting of SQL statements in database creation script

## 2021-11-09

### Added

- add the first unit test, ensure jest is capable of being run to do unit testing
- add eslint, ran prettier on all relevant files
- setup github workflow to perform CI on PRs targeting the master branch as merge destination
- create CHANGELOG.md to document all the changes done so far since repo creation

### Changed

- replace newlines with chr(13) in blocked textual data saved in SQL

## 2021-11-08

### Changed

- remove data_service.js containing routes written using sequelize
- use pg.pool for database IO and joi for schema validation
- update readme.md with instructions on dev environment setup
- clean up server.js to only contain the minimally needed routes

### Fixed

- remove secrets from source control
- change environment variable from API_PORT to PORT so heroku will properly deploy

## 2021-11-07

### Added

- setup pg pool to connect to database
- use joi schema validation to define and validate data
- an initial draft of product controller containing calls to database for product related querys and writes
- table creation and test data insertion SQL script has been created for product

### Changed

- update package.json with packages needed for postgresql and server, such as pg, express. also included schema validation module joi, debugging module debug, as well as dotenv for loading secrets using process.env.VAR_NAME
