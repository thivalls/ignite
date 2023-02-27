interface User {
    birthYear: number
}
function calculateAgeOfUser(user: User) {
    return new Date().getFullYear() - user.birthYear;
}

const age = calculateAgeOfUser({
    birthYear: 1987
})

console.log(age)