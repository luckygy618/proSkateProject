# Group18

Members
| Member Name | GitHub Account | Email |
| ------------- | ------------- | ----- |
| Oleksandra Romanova | sirinoks | oromanova2@myseneca.ca |
| GuoYu (Kris) Cao | luckygy618 | gcao4@myseneca.ca |
| Tim Lai | timrlai | trlai@myseneca.ca |

# Project Description

The goal of this project is to develop an ecommerce website for the company, ProSkaters Place. ProSkaters Place sells roller skates, roller blades, skateboards scooters, skis and associated equipment and accessories. Here is a more detailed description from ProSkaters Place:

> ProSkaters Place is the Canadian #1 shop specializing in quality rollerblades, roller skates, kick scooters, electric scooters & skateboards, skateboards, protective equipment, inline wheels, bearings, various parts, and accessories. Our shop offers the leading brands in the world such as Powerslide, FR Skates, SEBA, Flying Eagle, Adapt, Chaya, Rio Roller, Twincam, Gyro, Matter, CATS Bearings, and many more…

ProSkaters Place has an existing website. However, this website is outdated, bloated and difficult to maintain and scale. It is built with WordPress. As a result, it is reliant on a WordPress theme and several WordPress plugins. This theme and these plugins are not necessarily well maintained and can even conflict with each other. This makes the site difficult to maintain and to keep efficient. Our goal is to redesign the existing site using more modern and flexible technologies which will make the site more maintainable, more efficient and more scalable.

# Project Details

###### The project tasks can be divided by two core modules. Product e-commerce system and account system. 

**Product system** includes: showcasing the product in multiple products view, in solo product view, in cart/order view and other extra list views. It should be possible to assign the product names, tags, descriptions and various characteristics that can be used for search. It should be possible for the client to perform operations like searching, browsing, adding to card or removing from cart. 

The **account system** divides website functionality into mainly 2 modes. 1 is creation mode and 1 is view mode. A view mode is for a registered, or an unregistered customer. They should be able to access data that they are allowed to access, such as product information and their own account information. The creation mode is for admins and moderators. They are able to create, edit and delete products, as well as manage other user's accounts if necessairy. 

Together the two modules create a working system of an e-commerce website. This is the base level of completion we expect to be done with in a year. Besides that we can divide our project into many independent parts that have to be functioning to complete the system. The database; the api; the website; the payment system (probably is an already existing one we just need to connect to); the shipping system (also just needs to be connected). Besides those, we also need to host the necessary systems somewehere. We need to reasearch possible technology to use for each system and then implement it.


#### List of technologies selected/considered:
###### Items in ~~strikethrough notation~~ mean technologies that have not been finalized on yet
<ul>

<li>Database: AWS aurora (mySQL)</li>
<li>Database hosting: AWS RDS</li>
<br />
<li>Website front-end: Angular + <strike>Angular material</strike> + <strike>SCSS</strike></li>
<li>Website back-end: Node.js express</li>
<br />
<li>API: ???</li>
<li>Payment system: Braintree</li>
</ul>
___

# Project Extras

Besides the main features our plan includes many extra modules that are needed to finalize the fully functional e-commerce website, however, not needed in its core. These feaures are not considered to be our goal, however, the more we get done, the more professional and final our project will look like. In the end, to be fully implemented as an actual business website, we have to add those features. 

#### List of extras:
* Payment system - As we have not yet reasearched how difficult is this task, we cannot be fully sure to put it in as either core, or extra functionality
* CAD/US prices change
* Contact us page
* Fast built-in email form for questions
* Re-designed header
* Re-designed footer
* Physical store address on a google map module
* New/featured products (might be implemented as automatically assigning a *new* tag to every newly added product)
* Email notification system (registering a new account, comfirming an order, contacting customer support)
* Wishlist
___

# Research topics

* Payment system
* Transfering from a WordPress database to an ORM-based database
* Hosting pricing / technology
* Node.js frameworks
* Cyber security (could be solved with Node.js frameworks)
* Css framework

___

# Client expectations/wants
###### We will soon have a meeting with the client to discuss their expectations. We will add points to this list once we know.
