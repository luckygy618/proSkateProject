/* create table */
DROP TABLE IF EXISTS product_list;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
    product_id varchar(10) PRIMARY KEY,
    product_name varchar(80) NOT NULL,
    image varchar(80) NOT NULL,
    price double precision NOT NULL,
    stock_amount int NOT NULL DEFAULT 0,
    sku varchar(20),
    brand varchar(30),
    intro text,
    description text,
    stock_status varchar(20),
    rating int NOT NULL DEFAULT 0
);


/* insert data */
INSERT INTO products (product_id, product_name, image, price, stock_amount, sku, brand, intro, description)
    VALUES ('S000001', 'CITYBUG ES315D e-Scooter', 'ES315D-0.jpg', 398.79, 29, 'ES315D', 'CITYBUG', 'CITYBUG ES315D is the most elegant with aerodynamic and modern design eScooter. Equipped with durable and quiet brushless direct current hub motor. It is the perfect way to get from point A to point B, to commute, or just to have a fun ride! It is easy to fold and will fit any size car trunk.This electrical scooter features a quick react acceleration with max speed up to 25km/h and an extremely intuitive thumb control design with just one press then you are good to go. It has 3 riding modes for any skill level.', '* The headlight(as on the photos) is not included@* *Due to the current regulations, this product can be shipped only Groundand only within North America!@Technical details :@Weight: 13.2 kg@Motor : 250W / 36V@Battery : 36V 5.6Ah@Driving distance : Approx. 20km@Max speed : 25km / hr@Brake : e - brake with lever control & fender brake@Wheels : 8” solid tires@Charging time : ~2.8hr');

INSERT INTO products (product_id, product_name, image, price, sku, brand, intro, description, stock_status, rating)
    VALUES ('B000001', 'Flying Eagle Skate Carrier Movement Backpack', 'FE-Large-Backpack-Movement.jpg', 59.97, 'FE-A-MOVE', 'Flying Eagle', 'The Flying Eagle Movemement Backpacks are an excellent choice for carrying your skates around, commuting, school, and everyday use. External skate carriers zip away to be hidden when not in use. The back panel has an embroidered Flying Eagle logo and zippers on both sides that result in two separate storage pockets. Padded shoulder straps, laptop storage and simple elegance have made this bag a clear favourite.', 'Colours: Blue, Purple, and Grey@Sizes : Grey – Large, Blueand Purple – Medium', 'In Stock', 5);

INSERT INTO products (product_id, product_name, image, price, sku, brand, stock_amount, stock_status, intro, description)
    VALUES ('F000001', 'Kizer Soulframe 68 Frames', '800050_36751_Soulframe_68_SZ4.jpeg', 225.97, '800050', 'Kizer', 6, 'In Stock', 'After the success of the USD Aeon skate, we took a close look at its design in the development of the new Kizer Soulframe 68. We wanted to lower the center of gravity whilst increasing the direct feeling of grinding. It is completely made out of aluminum for maximum energy transfer, faster grinds, and designed specifically for the high-speed park- or bowl skating and coping grinds. Like the Aeon it is a non-UFS unibody soul plate with an integrated frame, to achieve the lowest center of gravity and widest split for flat setups, making it lighter and stronger whilst using fewer parts.Plate and frame are made out of 6061 aircraft aluminum, CNC machined to perfection, and coming with the new Element II aluminum H-block. The Soulframe has predrilled and recessed mounting holes which are compatible fit most USD skates and also Salomons. The 68 version is designed specifically for 68mm and 64mm flat setups, making the Soulframe 68 one of the fastest and most stable flat setups available in modern aggressive skating.', 'Sold in pairs.@Wheels Setup : 4x65mm with UFS mounting or 4x68mm with soulframe mounting@Mount : UFS@Sizes : XL = 276mm@Material : AL 6061 aircraft@Included Accessories : AL spacer, mounting screws, does not incl.mounting antirivets');

INSERT INTO products (product_id, product_name, image, price, sku, brand, stock_status, intro, description)
    VALUES ('WB0001', 'Rossignol X-8 Men’s Race Classic Nordic Ski Boots Black/Red', 'rik1260_x_8_classic_rgb72dpi_01.jpeg', 194.97, 'RIK1260', 'Rossignol', 'In Stock', 'Train or race. The X8 Classic ski boot is designed for fitness oriented skiers and junior racers. Its race inspired design shares technology with our athlete proven X-ium series to deliver increased precision and power transfer with an accessible flex for fitness and recreational use. The classic specific sole delivers a natural foot roll for an efficient kick, while the locked-in fit and thermo-moldable design provide a precise, enveloped fit to deliver ultimate comfort and control.@Precise Boot Flex, Fit@Dual Core Technology allows targeted boot stiffness for the most responsive feel without a weight penalty@Ski Control, Walkability@The Sport Sole features Tech Grip for comfortable walkingand central insert cleats for maximum precisionand control on the ski@Breathable Warmth@WINTHERM® offers a breathable micro - perforated membrane that reflects heat back towards its source for incredible temperature regulation, comfortand warmth', 'Please note: due to the brand rules this product does not qualify for a price match nor we are able to offer the PSP Rewards.@Weight: 930 g / pair(size 42)@Sizes : 36 – 49EU@Sole : Sport@Lining : Polyester + Win Therm active membrane@Construction Upper Cuff : Performance PVC@Heel : 3D plastic reinforcement Dual Core');

INSERT INTO products (product_id, product_name, image, price, sku, brand, stock_status, intro, description)
    VALUES ('SS00001', 'Powerslide Next Grey Trinity 80', 'PS-Next-Grey-80.jpg', 249.97, '908371', 'Powerslide', 'In Stock', 'With the Powerslide Next Grey 80 you will be ready for action. The city is full of surprises but The Powerslide NEXT Grey 80 won’t let you down in any situation. These skates are featuring the patented TRINITY mounting system known for amazing power transfer and reactivity, additional control, and improved balance as well as less roll vibration that helps to reduce muscle fatigue.@It’s the third generation of NEXT skates coming with heat moldable MYFIT Recall dual fit liners, which provide premium comfort with the extra layer of memory foam padding.This urban 4 - wheel inline skate is made for both, hair raising actionand relaxed cruising.Elite casted aluminum frames combined with fastand grippy Powerslide Spinner 80mm / 88A wheels and Wicked ABEC 9 freespin bearings.The NEXT Grey 80 is a stunning light grey and purple freeskate for skaters who demand only but the best quality.', 'Perfect for Power Skating, Urban, and Fitness@Shell: Polypropylene, Glass - fiber reinforced plastic(GFRP) – GFK@Closures : Upper Strap, Middle micro - adjustable ratchet buckle, laces@Liners : MYFIT Recall Liner, Heat moldable, Dual Fit@Frame : Powerslide Elite TRINITY 243mm 3x110mm@Frame Mount : Trinity with Lower Center Of Gravity@Wheels : Powerslide Spinner 110mm / 88A Black / Turquoise@Bearings : Wicked ABEC9@Brake : not Included.Optional HABS brake@Weight : 1820g(size 41U)');

INSERT INTO products (product_id, product_name, image, price, sku, brand, stock_status, intro, description)
    VALUES ('SS00002', 'FR Skates FR2 310 Black Freeskate', 'FR-Skates-FR2-310.jpg', 298.97, 'FRSK-FR2310-BK', 'FR Skates', 'In Stock', 'The FR Skates FR2 310 is the perfect skate for FReeride. Thanks to the integrated plates, you will gain in stability and precision. The FR2 is a great skate to improve your skills in all skating styles.', 'Perfect for Urban, Freeskating, and City Skating. https://youtu.be/s7UqHXYIExo@Shell: Plastic Shell, 4 Position Plastic Cuff, 7 - hole frame mounting plate@Closures : Metal Buckle Top Lock Strap, Middle Adjustable Strap, and Laces@Cuff Mounting : Cuff buttons adjustable in 4 positions@Liners : Removable with removable shock absorbers@Frame : FR R2 3×110 246mm aluminum@Frame Mount : 165mm / 180mm / 195mm@Wheels : FR Downtown White 110mm / 85A@Bearings : Twincam MW7 Titalium Freeride@Brake : Not Included@Designed and assembled in France@Sizes : 36 - 47 EU');

INSERT INTO products (product_id, product_name, image, price, sku, brand, stock_status, intro, description)
    VALUES ('F000002', 'Endless Blading 80/84/100 Trinity Frame', 'Endless-84-Trinity.jpg', 208.97, 'EBR-FRM-80-TR', 'Endless Blading', 'In Stock', 'The Endless 84 Trinity Frame is a precision machined, multi-setup frame designed specifically to elevate Powerslide TRINITY skates to the highest level of aesthetics and performance. The result is an even more enjoyable skate. This frame is the long-awaited TRINITY version of the original Endless 80 Frame and offers the same acclaimed experience skaters across the world have been buzzing about since Endless launched. We are proud to be the very first brand to create freeskate frames for Powerslide TRINITY urban and recreational skates.', 'One frameset includes: 2 frames and 8 axles@Specs:@Multiple setups : 4×80, 4×84, 3×100@Balanced Rocker for 4 - wheel setups@Flat configuration for 3×100 setup(bullet profile wheels only recommended)@Recommended for all skill levels@Mounting : TRINITY 3 - point@Wheelbase : 255 mm@Brake compatibility :@4×80 : Powerslide Urban Brake Size S(908058 / 1)@4×84 : Powerslide Urban Brake Size M(908058 / 2)@3×100 : Powerslide Urban Brake Size L(908058 / 3)@CNC - machined from 6061 - T6 aluminum@Weight = 256 grams, without spacers and axles');

INSERT INTO products (product_id, product_name, image, price, sku, brand, stock_status, intro, description)
    VALUES ('SS00003', 'Stanley Mini Tank Junior Inline Freeride Skates Size Adjustable', 'Stanley-Mini-Tank-Freeride-Skates-.jpeg', @89.97, 'ST-MINI-TANK', 'Stanley', 'In Stock', 'Mini Tank Freeride Skates are freeride and slalom skates designed for kids based on the Tank Skates. Kids can use it to free skating,urban skating and freestyle slalom.@Mini Tank Freeride is not adjusted by the telescopic boot.The Stanley designers have higher standards for the stability of Mini Tank, so it is used a 3 - in - 1 insole.There are three 3D insoles in the boots.When your feel the skates pinch your feet, you can take out a pair of insoles so that the space inside of boots will become larger.This not only increases the space inside, but also ensures a higher stability of the skates.@The Mini Tank Skates’s boot is a solid hardboot that is sufficient to protect the kids’s feet.The height of the cuff is reduced to suit the kidsand the ankle is more agile.The Mini Tank is equipped with the rockered frameand two milimetric buckle kits.Your kids can easily control the skatesand do a lot of freestyle tricks.', 'Perfect for: Fitness and Freeride Skating@Technical details :@Padding: Neoprene material for maximum comfort@Closure : Middle Flap Adjustable Strap, and Laces@Frames : Stanley Sport 4 x 76mm@Wheels : Stanley 76mm 85A@Bearings : Stanley ABEC - 9@Heel brake is not included@Sizes : EU 37 - 39 EU Size adjustable@Designed and made in China');


/* replace newline separator @ to chr(13) */
UPDATE
    products
SET
    intro = REPLACE(intro, '@', chr(13));

UPDATE
    products
SET
    description = REPLACE(description, '@', chr(13));

