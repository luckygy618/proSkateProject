## API endpoints

### - `/products` GET - get a list of products

output:

```
[
    {
        "product_id":"B000001",
        "product_name":"Flying Eagle Skate Carrier Movement Backpack",
        "image":"FE-Large-Backpack-Movement.jpg",
        "price":59.97,
        "stock_amount":0,
        "sku":"FE-A-MOVE",
        "brand":"Flying Eagle",
        "intro":"The Flying Eagle Movemement Backpacks are an excellent choice for carrying your skates around, commuting, school, and everyday use. External skate carriers zip away to be hidden when not in use. The back panel has an embroidered Flying Eagle logo and zippers on both sides that result in two separate storage pockets. Padded shoulder straps, laptop storage and simple elegance have made this bag a clear favourite.",
        "description":"Colours: Blue, Purple, and Grey\rSizes : Grey – Large, Blueand Purple – Medium",
        "stock_status":"In Stock",
        "rating":5
    },
    ...
],
```

error (404):

```
{
    "error": "op_failed"
}
```

### - `/products/add` POST - add a product

intake:

```
{
  product_id: Joi.string().required(),
  product_name: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  stock_amount: Joi.number().required(),
  sku: Joi.string().allow('', null),
  brand: Joi.string().allow('', null),
  intro: Joi.string().allow('', null),
  description: Joi.string().allow('', null),
  stock_status: Joi.string().allow('', null),
  rating: Joi.number().required(),
}
```

output:

```
{
    "product_id": "B000001",
}
```

error:

validation error (404):

```
{
    "error": "validate_failed"
}
```

duplication error (404):

```
{
    "error": "op_failed"
}
```

### - `/products/:product_id` PUT - update a product

intake:

```
{
  product_id: Joi.string().required(),
  product_name: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  stock_amount: Joi.number().required(),
  sku: Joi.string().allow('', null),
  brand: Joi.string().allow('', null),
  intro: Joi.string().allow('', null),
  description: Joi.string().allow('', null),
  stock_status: Joi.string().allow('', null),
  rating: Joi.number().required(),
}
```

output:

```
"success"
```

error:

validation error (404):

```
{
    "error": "validate_failed"
}
```

id not found error (404):

```
{
    "error": "op_failed"
}
```

### - `/products/:product_id` DEL - delete a product

output:

```
"success"
```

error (404):

```
{
    "error": "op_failed"
}
```

### - `/products/:product_id` GET - get a product

output:

```
{
    "product_id":"B000001",
    "product_name":"Flying Eagle Skate Carrier Movement Backpack",
    "image":"FE-Large-Backpack-Movement.jpg",
    "price":59.97,
    "stock_amount":0,
    "sku":"FE-A-MOVE",
    "brand":"Flying Eagle",
    "intro":"The Flying Eagle Movemement Backpacks are an excellent choice for carrying your skates around, commuting, school, and everyday use. External skate carriers zip away to be hidden when not in use. The back panel has an embroidered Flying Eagle logo and zippers on both sides that result in two separate storage pockets. Padded shoulder straps, laptop storage and simple elegance have made this bag a clear favourite.",
    "description":"Colours: Blue, Purple, and Grey\rSizes : Grey – Large, Blueand Purple – Medium",
    "stock_status":"In Stock",
    "rating":5
},
```

error:

authentication error (403):

```
{
    "error": "auth_failed"
}
```

id not found error (404):

```
{
    "error": "op_failed"
}
```

### - `/account/register` POST - register an account

intake:

```
{
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'ca'],
      },
    })
    .min(10)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
  confirmPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
}
```

output:

```
{
    "id": 3
}
```

error:

validation error (404):

```
{
    "error": "validate_failed"
}
```

duplication error (404):

```
{
    "error": "op_failed"
}
```

### - `/account/login` POST - authenticate an account

intake:

```
{
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'ca'],
      },
    })
    .min(10)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
}
```

output:

```
{
    "email": "timrlai@gmail.com",
    "token": "1928371kldjsf8912734914u1oi4j234lkmkldfjslkj"
}
```

error:

validation error (404):

```
{
    "error": "validate_failed"
}
```

incorrect email/password error (404):

```
{
    "error": "op_failed"
}
```

### - `/account/payment` PUT - save a payment method for an account

intake:

```
{
    "type": "card",
    "card": {
      "number": "4242424242424242",
      "exp_month": 2,
      "exp_year": 2023,
      "cvc": "314"
    }
}
```

output:

```
{
     "email": "ragnarokatz@gmail.com",
     "token": "pm_1KUdlJJj3couD402rbpi2BHt"
}
```

error:

validation error (404):

```
{
    "error": "validate_failed"
}
```

authentication error (403):

```
{
    "error": "auth_failed"
}
```

stripe decides the card is invalid error (404):

```
{
    "error": "op_failed"
}
```

### - `/account/info` PUT - update account info for an account

intake: (all of the fields are optional)

```
{
  salutation: Joi.string()
    .regex(/^[a-zA-Z.]*$/)
    .max(6)
    .allow('', null),
  firstName: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .max(20)
    .allow('', null),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .max(20)
    .allow('', null),
  phoneNumber: Joi.string()
    .regex(/^[0-9 -]*$/)
    .max(15)
    .allow('', null),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
}

addressSchema = {
  address1: Joi.string()
    .regex(/^[a-zA-Z0-9 ,.-]*$/)
    .max(40)
    .allow('', null),
  address2: Joi.string()
    .regex(/^[a-zA-Z0-9 ,.-]*$/)
    .max(40)
    .allow('', null),
  city: Joi.string()
    .regex(/^[a-zA-Z ,.-]*$/)
    .max(20)
    .allow('', null),
  province: Joi.string()
    .regex(/^[a-zA-Z ,.-]*$/)
    .max(20)
    .allow('', null),
  country: Joi.string()
    .regex(/^[a-zA-Z ,.-]*$/)
    .max(20)
    .allow('', null),
  postalCode: Joi.string()
    .regex(/^[a-zA-Z0-9 ]*$/)
    .max(7)
    .allow('', null),
}

{
    "salutation": "mr.",
    "firstName": "renaldo",
    "lastName": "Clown",
    "phoneNumber": "426-820-5972",
    "shippingAddress": {
      "address1": "Unit 281, 1237 Apple Lane",
      "city": "Toronto",
      "province": "ON",
      "country": "Canada",
      "postalCode": "M2N 3L2"
    },
    "billingAddress": {
      "address1": "1237 Apple Lane",
      "address2": "Unit 281",
      "city": "Toronto",
      "province": "ON",
      "country": "Canada",
      "postalCode": "M2N 3L2"
    }
  }
```

output:

```
success
```

error:

validation error (404):

```
{
    "error": "validate_failed"
}
```

authentication error (403):

```
{
    "error": "auth_failed"
}
```

other errors (404):

```
{
    "error": "op_failed"
}
```

### - `/account/info` GET - get account info for an account

output: (fields might be null or empty)

if no payment method has been saved:

```
{
    "shippingAddress": {
        "address1": "Unit 281, 1237 Apple Lane",
        "address2": "undefined",
        "city": "Toronto",
        "province": "ON",
        "country": "Canada",
        "postalCode": "M2N 3L2"
    },
    "billingAddress": {
        "address1": "1237 Apple Lane",
        "address2": "Unit 281",
        "city": "Toronto",
        "province": "ON",
        "country": "Canada",
        "postalCode": "M2N 3L2"
    },
    "email": "ragnarokatz@gmail.com",
    "salutation": "mr.",
    "firstName": "renaldo",
    "lastName": "Clown",
    "phoneNumber": "426-820-5972",
    "paymentToken": null
}
```

if payment method has been saved:

```
{
    "shippingAddress": {
        "address1": "Unit 281, 1237 Apple Lane",
        "address2": "undefined",
        "city": "Toronto",
        "province": "ON",
        "country": "Canada",
        "postalCode": "M2N 3L2"
    },
    "billingAddress": {
        "address1": "1237 Apple Lane",
        "address2": "Unit 281",
        "city": "Toronto",
        "province": "ON",
        "country": "Canada",
        "postalCode": "M2N 3L2"
    },
    "email": "ragnarokatz@gmail.com",
    "salutation": "mr.",
    "firstName": "renaldo",
    "lastName": "Clown",
    "phoneNumber": "426-820-5972",
    "paymentToken": "pm_1KV2VuJj3couD402hXhfTBBY",
    "paymentInfo": {
        "id": "pm_1KV2VuJj3couD402hXhfTBBY",
        "object": "payment_method",
        "billing_details": {
            "address": {
                "city": null,
                "country": null,
                "line1": null,
                "line2": null,
                "postal_code": null,
                "state": null
            },
            "email": null,
            "name": null,
            "phone": null
        },
        "card": {
            "brand": "visa",
            "checks": {
                "address_line1_check": null,
                "address_postal_code_check": null,
                "cvc_check": "unchecked"
            },
            "country": "US",
            "exp_month": 2,
            "exp_year": 2023,
            "fingerprint": "xl7bckYkimlOTCZ1",
            "funding": "credit",
            "generated_from": null,
            "last4": "4242",
            "networks": {
                "available": [
                    "visa"
                ],
                "preferred": null
            },
            "three_d_secure_usage": {
                "supported": true
            },
            "wallet": null
        },
        "created": 1645313934,
        "customer": null,
        "livemode": false,
        "metadata": {},
        "type": "card"
    }
}
```

error:

authentication error (403):

```
{
    "error": "auth_failed"
}
```

other errors (404):

```
{
    "error": "op_failed"
}
```

### - `/account/password` PUT - update password for an account

intake:

```
{
  currentPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
  newPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
  confirmNewPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
}
```

output:

```
success
```

error:

validation error (404):

```
{
    "error": "validate_failed"
}
```

authentication error (403):

```
{
    "error": "auth_failed"
}
```

other errors (404):

```
{
    "error": "op_failed"
}
```

### - `/account/purchase` PUT - make a purchase

intake:

format:

```
const lineItemSchema = Joi.object({
  product_id: Joi.string().required(),
  quantity: Joi.number().required(),
  lineTotal: Joi.number().precision(2).required(),
});

const purchaseSchema = Joi.object({
  items: Joi.array().items(lineItemSchema).required(),
  totalQuantity: Joi.number().required(),
  subtotal: Joi.number().precision(2).required(),
});
```

example:

```
{
    "items": [
        {
            "product_id": "S000001",
            "quantity": 1,
            "lineTotal": 34.99
        },
        {
            "product_id": "F000001",
            "quantity": 1,
            "lineTotal": 34.99
        }
    ],
    "totalQuantity": 24,
    "subtotal": 12.88
}
```

output:

```
success
```

error:

validation error or insufficient stock amount (404):

```
{
    "error": "validate_failed"
}
```

authentication error (403):

```
{
    "error": "auth_failed"
}
```

invalid payment method or other errors (404):

```
{
    "error": "op_failed"
}
```

### - `/account/orders/:order_id` GET - get information about an order

output:

```
{
    "id": 2,
    "transaction_token": "pi_3KphkkJj3couD4021n59C7tg",
    "email": "ragnarokatz@gmail.com",
    "total_quantity": 100,
    "subtotal": 100.44,
    "status": "refunding",
    "creation_time": "2022-04-17T23:43:40.290Z",
    "last_modified_time": "2022-04-17T23:44:31.867Z",
    "items": [
        {
            "product_id": "F000001",
            "quantity": 1,
            "linetotal": 34.99
        },
        {
            "product_id": "SS00001",
            "quantity": 1,
            "linetotal": 25.99
        },
        {
            "product_id": "SS00002",
            "quantity": 2,
            "linetotal": 88.99
        }
    ]
}
```

error:

authentication error (403):

```
{
    "error": "auth_failed"
}
```

order with given id is not found (404):

```
{
    "error": "op_failed"
}
```

### - `/account/orders` GET - get all orders for a user

output:

if the user has never made any orders:

```
[]
```

if the user has orders:

```
[
    {
        "id": 1,
        "transaction_token": "pi_3KphkRJj3couD4021xmzNAwi",
        "email": "ragnarokatz@gmail.com",
        "total_quantity": 100,
        "subtotal": 100.44,
        "status": "ordered",
        "creation_time": "2022-04-17T23:43:21.427Z",
        "last_modified_time": "2022-04-17T23:43:21.427Z",
        "items": [
            {
                "product_id": "F000001",
                "quantity": 1,
                "linetotal": 34.99
            },
            {
                "product_id": "SS00001",
                "quantity": 1,
                "linetotal": 25.99
            },
            {
                "product_id": "SS00002",
                "quantity": 2,
                "linetotal": 88.99
            }
        ]
    },
    {
        "id": 2,
        "transaction_token": "pi_3KphkkJj3couD4021n59C7tg",
        "email": "ragnarokatz@gmail.com",
        "total_quantity": 100,
        "subtotal": 100.44,
        "status": "refunding",
        "creation_time": "2022-04-17T23:43:40.290Z",
        "last_modified_time": "2022-04-17T23:44:31.867Z",
        "items": [
            {
                "product_id": "F000001",
                "quantity": 1,
                "linetotal": 34.99
            },
            {
                "product_id": "SS00001",
                "quantity": 1,
                "linetotal": 25.99
            },
            {
                "product_id": "SS00002",
                "quantity": 2,
                "linetotal": 88.99
            }
        ]
    }
]
```

error:

authentication error (403):

```
{
    "error": "auth_failed"
}
```

### - `/account/orders/refunding/:order_id` PUT - mark an order as refunding

### - `/account/orders/canceled/:order_id` PUT - mark an order as canceled

### - `/account/orders/shipped/:order_id` PUT - mark an order as shipped

### - `/account/orders/delivered/:order_id` PUT - mark an order as delivered

output:

```
success
```

error:

authentication error (403):

```
{
    "error": "auth_failed"
}
```

### - `/` GET - homepage

### - `/protected` GET - a protected route used for testing

### - `/images/add` POST - upload an image file
