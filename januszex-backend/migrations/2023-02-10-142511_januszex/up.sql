-- Your SQL goes here
PRAGMA foreign_keys = ON;

CREATE TABLE users (
	id					INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name	 			TEXT NOT NULL,
	surname 			TEXT NOT NULL,
	email 				TEXT NOT NULL,
	login 				TEXT UNIQUE,
	password 			TEXT,
	drivingLicense 		TEXT NOT NULL,
	licCategoryNumber 	TEXT NOT NULL,
	role		INTEGER default NULL,
	CONSTRAINT fk_role
		FOREIGN KEY (role) 
		REFERENCES roles(id)
		ON DELETE SET NULL
);

CREATE TABLE roles (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name	 				TEXT NOT NULL,
	canManageOwnAccount 	BOOLEAN NOT NULL,
	canViewHarmonogram 		BOOLEAN NOT NULL,
	canEditHarmonogram 		BOOLEAN NOT NULL,
	canViewCarsToRepair 	BOOLEAN NOT NULL,
	canViewBalance	 		BOOLEAN NOT NULL,
	canGetCarTransporter 	BOOLEAN NOT NULL,
	canConfirmCarStatus 	BOOLEAN NOT NULL,
	canManageManagers 		BOOLEAN NOT NULL,
	canManageCars 			BOOLEAN NOT NULL,
	canManageReservations 	BOOLEAN NOT NULL,
	canGenerateBalance 		BOOLEAN NOT NULL,
	canManagePermissions 	BOOLEAN NOT NULL,
	salary 					REAL
);

CREATE TABLE reservations (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	rentDate				DATETIME NOT NULL,
	returnDate				DATETIME NOT NULL,
	deliveryAddress			TEXT NOT NULL,
	valid					BOOLEAN NOT NULL,
	carID					INTEGER NOT NULL
    REFERENCES cars(id)
    ON DELETE CASCADE,

	userID					INTEGER NOT NULL
	REFERENCES users(id)
	ON DELETE CASCADE
);

CREATE TABLE cars (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	howManySeats			INTEGER NOT NULL,
	color					TEXT NOT NULL,
	distanceCovered			REAL NOT NULL,
	comfortScale			CHAR NOT NULL,
	brand					TEXT NOT NULL,
	model					TEXT NOT NULL,
	price					INTEGER NOT NULL,
	isATruck				BOOLEAN NOT NULL,
	pictureURL				TEXT NOT NULL
);

CREATE TABLE damages (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	description				TEXT NOT NULL
);

CREATE TABLE feedbacks (
	id						INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	description				TEXT NOT NULL
);

insert into roles 
(name, canManageOwnAccount, canViewHarmonogram, canEditHarmonogram, canViewCarsToRepair, canViewBalance, canGetCarTransporter,
canConfirmCarStatus, canManageManagers, canManageCars, canManageReservations, canGenerateBalance, canManagePermissions, salary)
values
("user", true, false, false, false, false, false, false, false, false, false, false, false, 0.0);

insert into cars 
(howManySeats, color, distanceCovered, comfortScale, brand, model, price, isATruck, pictureURL)
values
(5, "cherry", 1337.2, 'H', "Mercedes", "Supreme", 420, false, "https://www.spa4car.pl/files/realizacje/mercedes_560sec/74956E60-77C6-4F09-92C0-C9D76C2770B5.jpeg"),
(6, "redZone", 56900.4, 'M', "kałdi", "aBieda", 1500190, false, "https://bidfax.info/uploads/posts/2019-06/25/audi-s3-premium-2015-waubfgff3f1079708-img1.jpg"),
(5, "pearl White", 123123.0, 'L', "Wolsvagen", "T5", 100, true, "https://otoklasyki.pl/Upload/posters/volkswagen-t3-westfalia-161575376680.jpeg"),
(4, "green", 1337.2, 'M', "Fiat", "125p", 420, false, "https://i.pinimg.com/564x/78/00/0d/78000d694214eb174fe3de5994ec6259.jpg"),
(5, "green", -8000, 'H', "Fiat", "multipla", 18, false, "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Fiat_Multipla_front_20080825.jpg/1200px-Fiat_Multipla_front_20080825.jpg"),
(1, "black", 200000, 'M', "Batman sp.zo.o.", "Batmobil", 999999, false, "https://i.iplsc.com/batmobil-wystawiony-na-sprzedaz/00032QW20JRA3MVI-C122-F4.jpg")
