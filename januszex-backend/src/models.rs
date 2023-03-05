#![allow(non_snake_case)]

use diesel::prelude::*;
use crate::schema::{
    users,
    damages,
    feedbacks,
    reservations
};

use chrono::naive::NaiveDateTime;

use rocket::serde::{Serialize, Deserialize};


#[derive(Insertable, Deserialize, Default, Clone)]
#[diesel(table_name = users)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct UserNew {
    pub name: String,
    pub surname: String,
    pub email: String,
    pub login: String,
    pub password: String,
    pub drivingLicense: String,
    pub licCategoryNumber: String,
    pub role: Option<i32>,
}

#[derive(AsChangeset, Deserialize, Default, Clone)]
#[diesel(table_name = users)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct UserUpdate {
    pub name: String,
    pub surname: String,
    pub email: String,
    pub login: String,
    pub password: String,
    pub drivingLicense: String,
    pub licCategoryNumber: String,
}

#[derive(Queryable, Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
pub struct User {
    pub id: i32,
    pub name: String,
    pub surname: String,
    pub email: String,
    pub login: Option<String>,
    pub password: Option<String>,
    pub license: String,
    pub licCategoryNumber: String,
    pub role: Option<i32>,
}

#[derive(Queryable, Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
pub struct Car {
    pub id: i32,
    pub howManySeats: i32,
    pub color: String,
    pub distanceCovered: f32,
    pub comfortScale: String,
    pub brand: String,
    pub model: String,
    pub price: i32,
    pub isATruck: bool,
    pub pictureURL: String
}

#[derive(Insertable, Deserialize, Default, Clone)]
#[diesel(table_name = reservations)]
#[serde(crate = "rocket::serde")]
pub struct ReserveNew {
    pub rentDate: NaiveDateTime,
    pub returnDate: NaiveDateTime,
    pub deliveryAddress: String,
    pub valid: bool,
    pub carID: i32,
    pub userID: i32,
}

#[derive(Deserialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
pub struct ReserveRequest {
    pub rentDate: NaiveDateTime,
    pub deliveryAddress: String,
    pub returnDate: NaiveDateTime,
    pub carID: i32,
}

#[derive(Queryable, Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
pub struct Reserve {
    pub id: i32,
    pub rentDate: NaiveDateTime,
    pub returnDate: NaiveDateTime,
    pub deliveryAddress: String,
    pub valid: bool,
    pub carID: i32,
    pub userID: i32,
}

#[derive(Insertable, Deserialize, Default, Clone)]
#[diesel(table_name = damages)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct DamageNew {
    pub description: String,
}

#[derive(Queryable, Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
pub struct Damage {
    pub id: i32,
    pub description: String,
}

#[derive(Insertable, Deserialize, Default, Clone)]
#[diesel(table_name = feedbacks)]
#[serde(crate = "rocket::serde")]
pub struct FeedbackNew {
    pub description: String,
}

#[derive(Queryable, Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
pub struct Feedback {
    pub id: i32,
    pub description: String,
}
