// Authentification simplifée
const user = {
    "id": 0,
    "name": "John Doe",
    "email": "John.D@mail.com",
    "password": "JD123"
}

function generateToken(user) {
    return token = btoa(JSON.stringify(user));
}

function verifyToken(token) {
    return atob(token);
}

console.log("Token :", generateToken(user));
console.log("DecodedToken :", verifyToken(token));

// Filtrage

const users = [
    {"id": 0, "name": "John Doe", "email": "John.D@mail.com", "password": "123", "age": 55},
    {"id": 1, "name": "Jean Til", "email": "Jean.T@mail.com", "password": "123", "age": 35},
    {"id": 2, "name": "Jeanne Til", "email": "Jeanne.t@mail.com", "password": "123", "age": 35},
    {"id": 3, "name": "Petit Jean", "email": "Petit.J@mail.com", "password": "123", "age": 10}
]

function filterAge(users) {
    return users.filter(user => user.age >= 18);
}

console.log("Utilisateurs majeurs :", JSON.stringify(filterAge(users)));