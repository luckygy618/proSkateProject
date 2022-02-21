# Change Log #

## 2021-07-11 ##

**Project started**

## Before 2021-09-21 ##

### Added ###

- Begin outlining component structure
- Add SASS
- Add item info

## 2021-09-21 ##

### Added ###

- Add header component
- Add home page
- Add 404 page
- Add router pathing
- Deploy to heroku

### Fixed ###

- Gitignore

## 2021-11-15 ##

### Added ###

- Add product interface (class with no data)
- Add product service
- Add functionality to getProducts in product service
- Add product component
- Connect product component to product service

### Changed ###

- Change SASS to SCSS

### Fixed ###

- Edit product interface to match API structure
- SASS syntax to SCSS syntax


## 2021-11-16 ##

### Added ###

- Add LoggerService
- Add ReplaceLineBreaks pipe
- Add ProductListComponent
- Add CHANGELOG.md

### Changed ###

- Visuals (HTML, CSS) for header, footer, ProductListComponent, ProductComponent
- Getting data from API instead of a JSON file

## 2021-11-23 ##

### Added ###

- Add Product-add component
- Add form in Product-add
- Add ProductListComponent

### Changed ###

- Product-add formatting

## 2021-11-25 ##

### Added ###

- Add product structure to Product-add .ts

## 2021-12-03 ##

### Added ###

- Add addProduct, updateProduct, deleteProduct to ProductService

## 2021-12-04 ##

### Added ###

- Add productForm structure

### Changed ###

- HTML to match form input requirements
- Product form structure
- Error catching in product service

### Fixed ###
- API paths in ProductService

## 2021-12-05 ##

### Added ###

- Add uploadImage

### Changed ###

- Connect html form to .ts functionality
- API paths in ProductService

## 2021-12-06 ##

### Added ###

- Add uploadImage
- Add pretty HTML form structure
- Add HTML for validation

### Changed ###

- Connect image upload to form control
- Break down product image structure into separate sections
- Path style for image upload

### Fixed ###

- Product paths for image upload
- Upload image file handling
- ImageURL links

## 2021-12-07 ##

### Added ###

- Add formError component
- Add functional form validation HTML
- Add helper functions to check form strings
- Add form validation check before submitting

### Changed ###

- Connect error messages from formError component
- Form functionality (no longer lets you submit without required fields)
- Changelog updated

## 2022-01-29 ##

### Added ###

- Add LoginComponent
- Add login form
- Add LoginComponent compact expanding functionality
- Add AccountInterface
- Add AccountService:
 - Add registerAccount
 - Add loginToAccount
 - Add validateAccount
- Add RegisterComponent

## 2022-01-30 ##

### Added ###

 - Add register form

### Changed ###

- Update functionality of LoginComponent

### Fixed ###

- Account interface casing

## 2022-01-31 ##

### Added ###

- Form validation in login and registration

### Changed ###

- Added login functionality

## 2022-02-01 ##

### Changed ###

- Completed form validation in login and registration

### Fixed ###

- JWT token now stored in local storage
- Fixed bearer header to authenticate
- Instead of localhost now using proskaters backend
- Access token issues
- A bug in form validation
