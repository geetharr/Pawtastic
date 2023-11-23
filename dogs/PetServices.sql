create schema pawtasticpoohs;
use pawtasticpoohs;
#ALTER TABLE `pawtasticpoohs`.`userinfo` RENAME TO  `pawtasticpoohs`.`user`;
create table dog_boarding(
	id int not null auto_increment,
    dog_name varchar(50) not null,
    breed varchar(50) not null,
    dog_boarding_date DATETIME not null,
	user_id int not null,
    last_modified DATETIME ,
    primary key (id),
	index(user_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

create table dog_grooming(
	id int not null auto_increment,
    dog_name varchar(50) not null,
    breed varchar(50) not null,
    dog_grooming_service varchar(100) not null,
    dog_grooming_timeslot DATETIME not null,
	user_id int not null,
    last_modified DATETIME ,
    primary key (id),
	index(user_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);
ALTER TABLE dog_grooming    
MODIFY dog_grooming_timeslot varchar(20);  
create table dog_training(
	id int not null auto_increment,
    dog_name varchar(50) not null,
    breed varchar(50) not null,
    age int not null,
    comments varchar(100) not null,
	user_id int not null,
    last_modified DATETIME ,
    primary key (id),
	index(user_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

create table volunteer(
	id int not null auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    age int not null,
    phone int not null,
    reason varchar(100) not null,
    service varchar(50) not null,
    user_id int not null,
    last_modified DATETIME ,
    primary key (id),
	index(user_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

create table dog_adoption(
	id int not null auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(50) not null,
    phone int not null,
    pincode varchar(10) not null,
    address varchar(100) not null,
    user_id int not null,
    last_modified DATETIME ,
    primary key (id),
	index(user_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

use pawtasticpoohs;
create table dog_needs_categories(
	id int not null auto_increment,
    category_name varchar(30) not null,
    last_modified DATETIME,
    primary key (id)
);
create table dog_needs_sub_categories(
	id int not null auto_increment,
    sub_category_name varchar(30) not null,
    category_id int not null,
    last_modified DATETIME,
    primary key (id),
    index(category_id),
	FOREIGN KEY (category_id) REFERENCES dog_needs_categories(id)
);

create table dog_needs_cart(
	id int not null auto_increment,
    user_id int not null,
    sub_category_id int not null,
    last_modified DATETIME,
    primary key (id),
    index(sub_category_id),
    FOREIGN KEY (sub_category_id) REFERENCES dog_needs_sub_categories(id)
);
select * from dog_boarding;
select * from dog_grooming;
select * from dog_training;
select * from volunteer;
select * from user;
delete from user;
select * from dog_needs_categories;
select * from dog_needs_sub_categories ;
select * from dog_needs_sub_categories where category_id = 1;
insert into dog_needs_categories values(1,'dogFood',now());
insert into dog_needs_categories values(2,'dogToys',now());
insert into dog_needs_categories values(3,'dogBeds',now());
insert into dog_needs_categories values(4,'bowls',now());
insert into dog_needs_categories values(5,'cleaningSupplies',now());
UPDATE dog_needs_categories SET category_name = 'dogClothes' WHERE id = 3;
UPDATE dog_needs_categories SET category_name = 'dogGrooming' WHERE id = 5;
select * from dog_needs_sub_categories ;
ALTER TABLE dog_needs_sub_categories
MODIFY sub_category_name varchar(255);
insert into dog_needs_sub_categories values (1, 'Bruno’s Wild Essentials Dry Dog Food, Sunburn - Duck, Turkey, Salmon, 10 kg', 1,now(), 987);
insert into dog_needs_sub_categories values (2, 'Taste Of The Wild Sierra Mountain Roasted Lamb Dog Food 12.2 Kg', 1,now(), 987);
insert into dog_needs_sub_categories values (11, 'Fabled Gentle Giants With Chicken, Turkey & Duck Large Breed Puppy Dog Food 250 gm', 1,now(), 1020.0);
select * from dog_needs_sub_categories where category_id = 1;
insert into dog_needs_sub_categories values (3, 'Rope Toys For Dogs', 2,now(), 452);
insert into dog_needs_sub_categories values (4, 'Chew Toys For Dogs', 2,now(), 774);
insert into dog_needs_sub_categories values (12, 'Fofos Fruity Bites Dispensing Strawberry Treat Toy for Dogs', 2,now(), 1774.0);
select * from dog_needs_sub_categories where category_id = 2;
insert into dog_needs_sub_categories values (5, 'Dog Cushions', 3,now(), 987);
insert into dog_needs_sub_categories values (6, 'Trixie Beany Fleece Blanket (150 × 100 cm) Taupe', 3,now(), 987);
insert into dog_needs_sub_categories values (13, 'Navy Blue Reflective Raincoat Waterproof Suitable For Dogs & Cats (XS)', 3,now(), 1542.0);
select * from dog_needs_sub_categories where category_id = 3;
insert into dog_needs_sub_categories values (7, 'Pawpourri Grey Stainless Steel Feeding Bowl For Dogs & Cats - 1200 ml', 4,now(), 987);
insert into dog_needs_sub_categories values (8, 'Pawpourri Printed Teal Blue Stainless Steel Feeding Bowl For Dogs & Cats - 13 Cm', 4,now(), 750);
insert into dog_needs_sub_categories values (14, 'Slow Feeder Dog Bowl - Dishwasher Safe, Non Slip', 4,now(), 185.00);
select * from dog_needs_sub_categories where category_id = 4;
insert into dog_needs_sub_categories values (9, 'Simple Solution Extreme Stain & Odour Remover for Dogs 500 ml', 5,now(), 23);
insert into dog_needs_sub_categories values (10, 'Beaphar Active Foam Probiotic Stain & Odor Remover for Pets 500 ml', 5,now(), 203);
insert into dog_needs_sub_categories values (15, 'Dogzkart Pet Non Greasy Moisturizing Lotion Sunscreen For Dogs & Cats 50g', 5,now(), 453);
select * from dog_needs_sub_categories where category_id = 5;
desc dog_needs_sub_categories;