use diesel::{
    prelude::*,
    sqlite::SqliteConnection,
};
use rocket::{
    State,
    get,
    post,
    put,
    delete,
    http::{Status, CookieJar, Cookie},
    serde::{json::Json, Deserialize, Serialize},
    request::{self, Request, FromRequest},
    outcome::IntoOutcome
};

use crate::{
    GlobalState,
    models::{
        UserUpdate,
        UserNew,
        User
    },
    error::{
        Error,
        ErrorInfo
    }
};
use tokio::sync::Mutex;


#[post("/register", format = "json", data = "<user>")]
pub async fn register(
    state: &State<Mutex<GlobalState>>,
    cookies: &CookieJar<'_>,
    user: Json<UserNew>
) -> Result<Json<UserInfo>, (Status, Json<ErrorInfo>)> {

    let mut user = user.into_inner();
    check_user_data_valid(&user).await
        .map_err(|e| (Status::BadRequest, e.into()))?;

    let state = &mut state.lock().await;
    state.check_if_user_exists(&user)
        .map_err(|e| (Status::BadRequest, e.into()))?;
    user.role = Some(0);
    let user = state.insert_user(user)
        .map_err(|e| (Status::BadRequest, e.into()))?;

    cookies.add_private(Cookie::new("id", user.id.to_string()));

    Ok(Json::from(UserInfo::from(user)))
}

pub async fn check_user_data_valid(user: &UserNew) -> Result<(), ErrorInfo> {
    if  user.name.trim().is_empty() ||
        user.surname.trim().is_empty() ||
        user.email.trim().is_empty() ||
        user.login.trim().is_empty() || 
        user.password.trim().is_empty() ||
        user.drivingLicense.trim().is_empty() 
    {
        return Err(Error::MissingCredentials.into());
    };

    Ok(())
}

#[post("/login", format = "json", data = "<credentials>")]
pub async fn login(
    state: &State<Mutex<GlobalState>>,
    cookies: &CookieJar<'_>,
    credentials: Json<UserCredentials<'_>>
) -> Result<Json<UserInfo>, (Status, Json<ErrorInfo>)> {

    let state = &mut state.lock().await;
    let user = state.user_from_credentials(credentials.into_inner())
        .map_err(|e| (Status::BadRequest, e.into()))?;

    cookies.add_private(Cookie::new("id", user.id.to_string()));
    Ok(Json::from(UserInfo::from(user)))
}

#[get("/profile")]
pub async fn profile(
    state: &State<Mutex<GlobalState>>,
    id: UserId
) -> Result<Json<UserInfo>, (Status, Json<ErrorInfo>)> {

    let state = &mut state.lock().await;
    let user = state.user_from_id(id.0)
        .map_err(|e| (Status::BadRequest, e.into()))?;

    Ok(Json::from(UserInfo::from(user)))
}

#[get("/profile", rank = 1)]
pub async fn fail_profile() -> Json<ErrorInfo> {
    Json(Error::NotLoggedIn.into())
}

#[put("/profile", format = "json", data = "<user>")]
pub async fn update_profile(
    state: &State<Mutex<GlobalState>>,
    id: UserId,
    user: Json<UserUpdate>
) -> Result<Json<UserInfo>, (Status, Json<ErrorInfo>)> {
    let state = &mut state.lock().await;

    let user = state.user_update(id.0, user.into_inner())
        .map_err(|e| (Status::BadRequest, e.into()))?;

    Ok(Json(UserInfo::from(user)))
}

#[put("/profile", rank = 1)]
pub async fn fail_update_profile() -> (Status, Json<ErrorInfo>) {
    (Status::BadRequest, Json(Error::NotLoggedIn.into()))
}

#[delete("/delete_account")]
pub async fn delete_account(
    state: &State<Mutex<GlobalState>>,
    cookies: &CookieJar<'_>,
    id: UserId
) -> Result<Json<UserInfo>, (Status, Json<ErrorInfo>)> {

    let state = &mut state.lock().await;
    let user = state.delete_user(id.0)
        .map_err(|e| (Status::BadRequest, e.into()))?;

    cookies.remove_private(Cookie::named("id"));

    Ok(Json::from(UserInfo::from(user)))
}

#[delete("/delete_account", rank = 1)]
pub async fn fail_delete_account() -> (Status, Json<ErrorInfo>) {
    (Status::BadRequest, Json(Error::NotLoggedIn.into()))
}

#[get("/loyality_card")]
pub async fn loyality_card(
    state: &State<Mutex<GlobalState>>,
    id: UserId
) -> Result<Json<LoyalityCard>, (Status, Json<ErrorInfo>)> {

    let state = &mut state.lock().await;
    let reser_count = state.get_user_reservations(id.0)
        .map_err(|e| (Status::BadRequest, e.into()))?
        .len();

    let card = LoyalityCard {
        points: (reser_count * 123) as i32,
        orders: reser_count as i32,
    };

    Ok(Json::from(card))
}

#[get("/loyality_card", rank = 1)]
pub async fn fail_loyality_card() -> (Status, Json<ErrorInfo>) {
    (Status::BadRequest, Json(Error::NotLoggedIn.into()))
}

#[get("/logout")]
pub async fn logout(_id: UserId, cookies: &CookieJar<'_>) -> Json<String> {
    cookies.remove_private(Cookie::named("id"));
    Json(String::from("ok"))
}

#[get("/logout", rank = 1)]
pub async fn fail_logout() -> (Status, Json<ErrorInfo>) {
    (Status::BadRequest, Json(Error::NotLoggedIn.into()))
}


#[derive(Debug)]
pub struct UserId (pub i32);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for UserId {
    type Error = std::convert::Infallible;

    async fn from_request(req: &'r Request<'_>) -> request::Outcome<Self, Self::Error> {
        req.cookies()
            .get_private("id")
            .map(|c| c.value().to_string().parse::<i32>().unwrap())
            .map(UserId)
            .or_forward(())
    }
}

#[derive(Deserialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct UserCredentials<'a> {
    pub login: &'a str,
    pub password: &'a str,
}

#[derive(Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct UserInfo {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub name: String,
    pub surname: String,
    pub drivLic: String,
    pub licCateg: String
}

impl From<User> for UserInfo {
    fn from(user: User) -> Self {
        Self { id: user.id, username: user.login.unwrap(), name: user.name, surname: user.surname, email: user.email, drivLic: user.license, licCateg: user.licCategoryNumber}
    }
}

#[derive(Serialize, Default, Clone)]
#[serde(crate = "rocket::serde")]
#[serde(default)]
pub struct LoyalityCard {
    pub points: i32,
    pub orders: i32,
}
