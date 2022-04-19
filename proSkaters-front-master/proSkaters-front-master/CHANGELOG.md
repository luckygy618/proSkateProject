# Change Log

## 2021-07-11

**Project started**

## Before 2021-09-21

### Added

- Begin outlining component structure
- Add SASS
- Add item info

## 2021-09-21

### Added

- Add header component
- Add home page
- Add 404 page
- Add router pathing
- Deploy to heroku

### Fixed

- Gitignore

## 2021-11-15

### Added

- Add product interface (class with no data)
- Add product service
- Add functionality to getProducts in product service
- Add product component
- Connect product component to product service

### Changed

- Change SASS to SCSS

### Fixed

- Edit product interface to match API structure
- SASS syntax to SCSS syntax

## 2021-11-16

### Added

- Add LoggerService
- Add ReplaceLineBreaks pipe
- Add ProductListComponent
- Add CHANGELOG.md

### Changed

- Visuals (HTML, CSS) for header, footer, ProductListComponent, ProductComponent
- Getting data from API instead of a JSON file

## 2021-11-23

### Added

- Add Product-add component
- Add form in Product-add
- Add ProductListComponent

### Changed

- Product-add formatting

## 2021-11-25

### Added

- Add product structure to Product-add .ts

## 2021-12-03

### Added

- Add addProduct, updateProduct, deleteProduct to ProductService

## 2021-12-04

### Added

- Add productForm structure

### Changed

- HTML to match form input requirements
- Product form structure
- Error catching in product service

### Fixed

- API paths in ProductService

## 2021-12-05

### Added

- Add uploadImage

### Changed

- Connect html form to .ts functionality
- API paths in ProductService

## 2021-12-06

### Added

- Add uploadImage
- Add pretty HTML form structure
- Add HTML for validation

### Changed

- Connect image upload to form control
- Break down product image structure into separate sections
- Path style for image upload

### Fixed

- Product paths for image upload
- Upload image file handling
- ImageURL links

## 2021-12-07

### Added

- Add formError component
- Add functional form validation HTML
- Add helper functions to check form strings
- Add form validation check before submitting

### Changed

- Connect error messages from formError component
- Form functionality (no longer lets you submit without required fields)
- Changelog updated

## 2022-01-29

### Added

- Add LoginComponent
- Add login form
- Add LoginComponent compact expanding functionality
- Add AccountInterface
- Add AccountService:
- Add registerAccount
- Add loginToAccount
- Add validateAccount
- Add RegisterComponent

## 2022-01-30

### Added

- Add register form

### Changed

- Update functionality of LoginComponent

### Fixed

- Account interface casing

## 2022-01-31

### Added

- Form validation in login and registration

### Changed

- Added login functionality

## 2022-02-01

### Changed

- Completed form validation in login and registration

### Fixed

- JWT token now stored in local storage
- Fixed bearer header to authenticate
- Instead of localhost now using proskaters backend
- Access token issues
- A bug in form validation

## 2022-02-13

### Added

- Added github actions for simple prettier and lint checking

### Changed

- Put pointer towards the backend API service into the angular environment file

## 2022-02-17

### Added

- Add customer account interface
- Add customer account service and components
- Add CreditCard interface
- Add Address interface
- Add UpdatePaymentInfo component

### Changed

- Improved existing interfaces
- Updated routing with new components
- confirmPassword in Account interface is now optional

## 2022-02-18

### Added

- Add CustomerAccountMenu component

## 2022-02-20

### Added

- Add UI for account info, account settings and password components
- Add IDs to account settings and update password forms
- Add SCSS to prettier commands in package.json
- Add Card number to Payment info form
- Add get to customerAccountService
- Add displaying data in CustomerAccountInfoComponent

### Changed

- Renamed shippingAddress and billingAddress FormGroup getters to shippingAddressForm and billingAddressForm

### Fixed

- Fix bugs with address form getters and HTML
- Fix bug with nested form groups and isFieldValid()

## 2022-02-21

### Added

- Add PaymentMethod form
- Add populating accountSettingsForm with account data
- Add put method to CustomerAccountService
- Add updatePassword method to AccountService
- Add passwordsDiffer method to updatePasswordComponent

### Changed

- Update input types in payment HTML
- Update error logs in account services

### Fixed

- Fix casing bug
- Fix conditional for showing register form
- Fix update password form validation

## 2022-02-22

### Added

- Complete functionality of update payment form
- Add displaying payment info in payment form and account info page

### Fixed

- Customer account components are now hidden for logged out users

## 2022-03-18

### Added

- Add CartItem, ShoppingCart and Receipt interfaces
- Add CartItemComponent, ShoppingCartComponent, CheckoutComponent and ReceiptComponent

## 2022-03-19

### Added

- Add ShoppingCartService
- Added ShoppingCartComponent, CheckoutComponent and ReceiptComponent to AppRoutingModule Routes
- Added add to cart form to ProductComponent

### Changed

- Changed environment apiURL to point to https://proskaters-backend.herokuapp.com

## 2022-03-21

### Added

- Added lineTotal to CartItem
- Added totalQuantity and subTotal to ShoppingCart
- Added FormsModule to AppModule
- Added HTML to CartItemComponent template
- Added HTML to ShoppingCartComponentComponent template
- Added ReversePipe
- Added getter and setter methods to ShoppingCartService

### Changed

- Saved ShoppingCart to localStorage using methods in ShoppingCartService

### Fixed

- Fixed updateQuantity method

## 2022-03-22

### Added

- Added success and error messages to ShoppingCartComponent

## 2022-03-23

### Added

- Added ViewCartComponent
- Added UI for CheckoutComponent
- Added RegisterPageComponent
- Added login and register forms to CheckoutComponent when user is logged out
- Added RegisterPageComponent to AppRoutingModule Routes

### Changed

- Updated RegisterComponent to only include the form to make it reusable
- Removed RegisterComponent from AppRoutingModule Routes

## 2022-03-24

### Added

- Added OrderConfirmationComponent
- Added OrderConfirmationComponent to AppRoutingModule Routes
- Added OrderConfirmation UI
- Added alerts when shipping and payment info is not set

### Changed

- Disabled Place Order buttons if shipping or payment info is blank
- Hid shipping and payment info in CheckoutComponent if not set
- Removed ReceiptComponent from AppRoutingModule Routes

### Fixed

- Fixed bugs with hiding address information

## 2022-03-25

### Added

- Added Purchase and PurchaseItem interfaces
- Added UpdatePaymentFormComponent
- Added PurchaseFailedComponent
- Added CartNavComponent
- Added makePurchase method to CustomerAccountService
- Added createPurchase method to CheckoutComponent
- Added createReceipt method to CheckoutComponent

### Changed

- Updated UpdatePaymentInfoComponent to use reuseable UpdatePaymentFormComponent
- Updated HeaderComponent to include CartNavComponent

### Fixed

- Set empty return values for getters which access account data in case account is undefined
- Cleared messages from ShoppingCartComponent on destroy
- Rouned decimals of prices to 2 decimal places in CheckoutComponent and ReceiptService

## 2022-04-07

### Added

- Added OrderService methods
- Added members to interfaces
- Added interfaces, service and components

### Changed

- Moved code from OrderConfirmationComponent to ReceiptComponent

## 2022-04-10

### Added

- Added template layout for PurchaseHistoryComponent

## 2022-04-16

### Added

- Added navigation tabs
- Added search bar

## 2022-04-17

### Added

- Added CustomerAccountNav
- Added OrderComponent

### Changed

- Updated navigation
- Updated navigation buttons
- Removed dist folders

## 2022-04-18

### Added

- Added null bodies for put methods in OrderService

### Changed

- Removed types from put methods in OrderService
- Displayed and filtered order data in PurchaseHistoryComponent

### Fixed

- Fixed typos in cancel order functions
