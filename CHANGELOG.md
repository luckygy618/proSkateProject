# Change Log

## 2021-11-09

### Added

- add the first unit test, ensure jest is capable of being run to do unit testing
- add eslint, ran prettier on all relevant files
- setup github workflow to perform CI on PRs targeting the master branch as merge destination
- create CHANGELOG.md to document all the changes done so far since repo creation

### Changed

- replace newlines with chr(13) in blocked textual data saved in SQL

### Fixed

## 2021-11-08

### Added

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

### Fixed
