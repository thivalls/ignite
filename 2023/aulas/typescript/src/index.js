function calculateAgeOfUser(user) {
    return new Date().getFullYear() - user.birthYear;
}
var age = calculateAgeOfUser({
    birthYear: 1987
});
console.log(age);
