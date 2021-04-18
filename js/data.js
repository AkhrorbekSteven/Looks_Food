let users = window.localStorage.getItem('usersData')
let foods = window.localStorage.getItem('foodsData')
let orders = window.localStorage.getItem('ordersData')

if (!users) {
    users = [
        {user_id: 1, user_name: 'Maccore', phone_number: '90 343 26 77'},
        {user_id: 2, user_name: 'Steven', phone_number: '99 329 96 74'}
    ]
} else {
    users = JSON.parse(users)
}

if (!foods) {
    foods = [
        {food_id: 1, food_name: 'Grilled Chicken Club', food_url: 'images/Grilled-chicken-Club.png'},
        {food_id: 2, food_name: 'Chick N Strips', food_url: 'images/Chick-N-Strips.png'},
        {food_id: 3, food_name: 'Boneless Combo', food_url: 'images/Boneless-Combo.png'},
        {food_id: 4, food_name: 'Grilled Cool Wrap', food_url: 'images/Grilled-Cool-Wrap.png'},
        {food_id: 5, food_name: 'King Arthurs Supreme', food_url: 'images/King-Arthurs-Supreme.png'},
        {food_id: 6, food_name: 'Original Cripsy Taco', food_url: 'images/Original-Cripsy-Taco.png'}
    ]
} else {
    foods = JSON.parse(foods)
}

if (!orders) {
    orders = [
        {user_id: 1, food_id: 5, count: 8},
        {user_id: 1, food_id: 2, count: 10},
        {user_id: 2, food_id: 3, count: 7},
        {user_id: 2, food_id: 4, count: 9}
    ]
} else {
    orders = JSON.parse(orders)
}