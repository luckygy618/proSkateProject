# Use Cases

## Sign-Up For Account
1. Author: Tim Lai
2. Short Description: The Customer signs up for an account
3. Actor(s): Customer
4. Preconditions: 
   1. The customer has navigated to the sign-up page.
   2. The customer has a valid email address.
   3. The customer does not already have an account. 
5. Post Conditions:
   1. A new account is successfully added to the database with the Customer's information.
   2. An email is sent to the Customer's email address confirming the creation of their account.
6. Business Rules:
   1. The Customer must enter a valid username, email address, password, their name and their address.
   2. The Customer's username and email address must not match an existing username or email address in the database.
   3. The Customer's password must be at least 8 characters long.
   4. The Customer's password must include at least one uppercase letter, one lowercase letter, one number and one symbol.
   5. The Customer must enter their password twice and the passwords must match.
   7. If the Customer chooses to user two-factor authentication then the authentication code they enter must match the one they were sent by text message.
   6. If the Customer chooses to user two-factor authentication then the cell-phone number they enter must not match an existing number in the database.
7. Main Flow
    | # | Customer | System |
    | - | -------- | ------ |
    | 1 | Navigate to "Sign-Up" page. | Display "Sign-Up" page with form with fields for username, email address, password and password confirmation. |
    | 2 | Enter username, email address, password and password confirmation. | If the username and email address do not exist in the system and the password and the password confirmation match, then save the information to the database and send the Customer a confirmation email. The Customer is then asked if they wish to enable Two-Factor Authentication. (\*1)(\*2)(\*3) |
    | 3 | Choose to enable Two-Factor Authentication. | Prompt the Customer to enter their cell-phone number. (\*4) |
    | 4 | Enter cell-phone number. | If the cell-phone number does not exist in the system then send the user a temporary authentication code by text message and display a form for the user to enter the temporary authentication code. (\*5) |
    | 5 | Enter the temporary authentication code received by text message. | If the temporary authentication code matches the one sent by text message then the phone number is saved to the database and a success message is displayed. The Customer is then asked if they wish to add their shipping information. (\*6) |
    | 6 | Choose to add shipping information. | If the Customer chooses to add shipping information, prompt the them to enter their full name, billing address and shipping address. (\*7) |
    | 7 | Enter full name, billing address and shipping address. | Save the Customer's full name, billing address and shipping address to the database and present the Customer with a success message indicating that their account was created successfully. |
8. Alternate Flows
    | # | Alternate Flow | Description |
    | - | ------ | ------ |
    | A1 | Enter username, email address, password and password confirmation. | If the username exists in the system then notify the user that the username already exists in the system and prompt them to re-enter the username. |
    | A2 | Enter username, email address, password and password confirmation. | If the email address exists in the system then notify the user that the username already exists in the system and prompt them to re-enter the email address. |
    | A3 | Enter username, email address, password and password confirmation. | If the password and password confirmation do not match then prompt the user to re-enter the password and password confirmation. |
    | A4 | Choose not to enable Two-Factor Authentication. | If the cell-phone number already exists in the system, then prompt the user to re-enter the cell-phone number. |
    | A5 | Enter cell-phone number. | If the cell-phone number already exists in the system, then prompt the user to re-enter the cell-phone number. |
    | A6 | Enter the temporary authentication code received by text message. | If the entered authentication code and the one sent in the text message do not match, then prompt the user to click a button to re-send the temporary confirmation code. |
    | A7 | Choose not to add shipping information at this time. | If the Customer chooses not to add shipping information at this time, show them a success message indicating that their account has successfully been created and provide a link to a page where they can add shipping information at a later time. |

## Add Product
1. Author: GuoYu Cao
2. Short Description: Content Editor adds a product
3. Actor(s): Content Editor
4. Preconditions:
   1. The Content Editor signed in.
   2. The Content Editor opens the Add Product page.
   3. The unique product ID is created and approved.
5. Post Conditions:
   1. The product is successfully added and stored into the database.
6. Business Rules:
   1. The Content Editor must get approval before starting to add products.
   2. The Content Editor must verify the entered data to make sure the data is correct.
   3. The Content Editor must ensure not to add duplicated products.
   4. The Content Editor must have the unique product ID created and approved.
7. Main Flow
   | # | Content Editor | System |
   | - | ----------- | ------ |
   | 1 | The Content Editor reaches the Add Product page. | The system displays a form to requir the Content Editor input data. |
   | 2 | The Content Editor enters the product ID.  | The system checks if the product ID is already existing in the database. If the product ID is existing, see Alternate A1. |
   | 3 | The Content Editor enters the product name. | The system holds the entered product name in the text field of the form. |
   | 4 | The Content Editor enters the Product Introduction of the product. | The system holds the entered words in the text field of the form. |
   | 5 | The Content Editor enters the Product Description. | The system holds the entered words in the text field of the form. |
   | 6 | The Content Editor enters the Additional Information. | The system holds the entered words in the text field of the form. |
   | 7 | The Content Editor clicks Add Size Option button to add the size options of the products. | The system shows a pop-up text field to allow the Content editor enters the size option.|
   | 8 | The Content Editor enters the size option and click Save button. | The system receives the entered size option and displays the entered size option on the form.|
   | 9 |  The Content Editor repeats the step 7 to 8 to add size options. If the Content Editor needs to delete the size option added in step 7 to 8 see A2.  | The system repeats step 7  to 8 to receive the entered size options. If the Content Editor needs to delete the size option added in step 7 to 8 see A2.|
   | 10 | The Content Editor enters the price of the product. | The system holds the entered number in the text field of the form. |
   | 11 | The Content Editor select the avalibiility status of the product by clicking the in-stock radio button or out-of-stock radio button. | The system receives the selected option.|
   | 12 | The Content Editor clicks Add Sizing Chart button to upload the size chart picture of the product if the product needs a size chart diagram, then click Save button.| The system pop-up a text filed to allow the Content editor enter the size chart picture's root link. Then the system receives the entered link and displays the picture on the form. |
   | 13 | The Content Editor clicks Add Product Photo button to upload the photo of the product, then click Save button. | The system pop-up a text filed to allow the Content editor enter the size chart picture's root link. Then the system receives the entered link and displays the picture on the form. |
   | 14 | The Content Editor repeats the step 14 to add more Product Photos if needed. | The system repeats the step 14 to receive more Product Photos.|
   | 15 | The Content Editor enters the Brand Tag of the Product. | The system  receives the entered data and holds it in the text field.|
   | 16 | The Content Editor clicks Add Category Tags button to add Category Tag of the Product. Then the Content Editor enters the category for the product in the test filed. | The system pop a text field to allow the Content Editor to enter the category then the system holds and displays the entered data on the form. |
   | 17 | The Content Editor repeats the step 16 to add more Category Tags if needed. | The system repeats the step 16 to receive more Category Tags.|
   | 18 | The Content Editor clicks Submit button on the form to submit the entered data. | The system get the information from the form and store the entered data into the database. Then the system displays a pop-up window to show a confirmation message "The Product is added". |
8. Alternate Flows
   |  | 	Alternate Flow | Description |
   | ----------- | ------ | ------ |
   | A1 | The system pop-up an error message to show "The Product ID is existing." then clears the text field of Product ID. | The system checks if there is same Product ID existing in the database, if the Content Editor entered Product ID is already exist, then the system shows the error message and discard the Content Editor entered data.|
   | A2 | The Content Editor clicks the small Delete button next to the size option to delete added size option. Then the system removes this size option from the form. | The Content Editor deletes the size option by clicking the small Delete button, then the system recieves the delete requirment and remove this size option from the form and discards the data of the removed size option. |
   
   ## Place an order
1. Author: Alex Romanova
2. Short Description: The Customer places an order
3. Actor(s): Customer
4. Preconditions: 
   1. The customer has navigated to the main page.
5. Post Conditions:
   1. An order was successfully added to the queue.
   2. The amount for the order is pre-paid through client's chosen payment system.
   3. An email was sent to the customer's email address with their order details.
6. Business Rules:
   1. The Customer must have a valid, working and non fraud detected payment system.
   2. The order they placed consists of valid and abvailable items.
   3. If the items in the order aren't available, they can be placed on pre-order instead.
   4. The Customer might or might not have an existing account.
7. Main Flow:
   | # | Customer | System |
   | - | ----------- | ------ |
   | 1 | Customer navigates to either a category in the navigation, uses the search bar, or clicks directly on the product from the main page. | The system displays a detailed product page. |
   | 2 | Customer clicks add to cart on the detailed product page. Repeats the process until ready to proceed to checkout.  | The system adds their product in their cart. A notification of that happening is displayed with other items already in cart and an option to proceed to checkout. A cart icon adds +1 to the number of items already in cart. |
   | 3 | Clicks proceed to checkout, or checkout. | If the customer is not logged in, asks if they have an account and would like to log in, or to register a new account. |
   | 4 | Either logs in, registers, or chooses to proceed as guest. | The system starts the checkout process. Shows all the items in the cart. Shows a form to complete asking delivery details. |
   | 5 | Fills out address details. | If the details are correct, proceeds to the next step - payment. Asks to choose a payment type. |
   | 6 | Chooses a payment type. Based on the type selected fills out payment information. | Payment is checked and handled by braintree. Before finalizing shows all order information and asks to proceed. |
   | 7 | Customer confirms their order. | If all is good, shows the payment and full order details. The copy of the receipt is sent to the chosen email. The amount is reserved. The order is placed. |
 8. Alternate Flows
    | # | Alternate Flow | Description |
    | - | ------ | ------ |
    | A1.1a | A customer clicks a category from the main page to find their product. | A search page is displayed, with items that fit the filtered category. |
    | A1.1b | A customer chooses to search of an item from the main page to find their product. | A search page is displayed, with items that fit the information entered in the search bar. |
    | A1.2 | In the search page a customer chooses other filters that they are interested to find their product. | With each search the filter system lists only the products that fit the selected options. |
    | A2 | Customer at any point of shopping decides to view their cart by clicking the cart icon. | The system displays all items already in cart with options to remove each item and proceed to checkout button. |
    | A3 | The customer's shipping information is not in a correct format, or is invalid | The system shows an error message saying what the problem is and doesn't allow to proceed until it's fixed. |
    | A4 | The customer is logged in when they are making an order. | Instead of starting the form from scratch, there is an option to use one of the previously used addresses, or edit them. Same for payment. |
    | A5 | When choosing payment type, the customer is also able to apply a promocode if they have any. | If the promocode is valid, the discount is added to the full calculation, the total price is updated. |
    | A6 | At any point of placing an order (after pressing checkout), a customer can decide to cancel the process. | The system doesn't place any orders, however, saves the cart of this specific guest. |
    | A7 | If a customer has added items to cart, but never proceeded till the last step to make an order (also if they cancelled the process), if they are logged in, then that incomplete order information is sent by an email with a task of reminding them of their order and with an option to let us know if there are any problems they encontered. | When a customer had already been in the middle of the process, they changed their mind for a reason. When a customer has started the process, it is highly likely they will end it, as compared to a customer that hasn't done any steps. Such a system already exists on the actual proSkaters website and it is important to include it on the new website too. |
