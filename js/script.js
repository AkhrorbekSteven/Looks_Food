const foodSelect = document.querySelector('#foodSelect')
const ordersWrapperList = document.querySelector('.orders-wrapper-list')
const usersList = document.querySelector('.users-list')
const addUserForm = document.querySelector('.add-user-form')
const addNameInput = document.querySelector('.add-name-input')
const addPhoneInput = document.querySelector('.add-phone-input')
const addOrderForm = document.querySelector('.add-order-box')
const amountInput = document.querySelector('.amount-input')
const person = document.querySelector('.person')
let id

function optionsRenderer (array) {
    for (let element of array) {
        let newOption = document.createElement('option')

        newOption.value = element.option_id
        newOption.innerText = element.option_name

        foodSelect.appendChild(newOption)
    }
} 
optionsRenderer(options)

function foodsRenderer (array, optionsList, FoodsList) {
    ordersWrapperList.innerHTML = null
    for (let element of array) {
        let newFoodItem = document.createElement('li')
        let newImg = document.createElement('img')
        let newSpan = document.createElement('span')
        let newFoodName = document.createElement('h2')

        newFoodItem.classList.add('food-thumb')
        newSpan.classList.add('food-amount')
        newFoodName.classList.add('food-name')

        let found = optionsList.find((e) => e.option_id == element.food_id)
        let found1 = FoodsList.find((e) => e.food_id == element.food_id)

        newImg.src = found1.food_url
        newSpan.innerText = element.count
        newFoodName.innerText = found.option_name

        newFoodItem.appendChild(newImg)
        newFoodItem.appendChild(newSpan)
        newFoodItem.appendChild(newFoodName)

        ordersWrapperList.appendChild(newFoodItem)
    }
}
foodsRenderer(orders, options, foods)

addOrderForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!(person.innerText == "No person selected yet")) {
        let newOrder = {
            user_id: id,
            food_id: foodSelect.value,
            count: amountInput.value
        }
        orders.push(newOrder)
        let currentUser = orders.filter((e) => e.user_id == id)
        foodsRenderer(currentUser, options, foods)
        foodSelect.value = 1
        amountInput.value = null
    } else {
        alert("please select a customer")
    }
})


function usersRenderer (array) {
    usersList.innerHTML = null
    for (let element of array) {
        let newUser = document.createElement('li')
        let newSpan = document.createElement('span')
        let newUserName = document.createElement('h2')
        let newNumber = document.createElement('a')

        newUser.classList.add('user')
        newSpan.classList.add('order-number')

        newSpan.innerText = element.user_id + '.'
        newUserName.innerText = element.user_name
        newNumber.setAttribute('href', `tel:+${element.phone_number}`)
        newNumber.innerText = element.phone_number

        newUser.appendChild(newSpan)
        newUser.appendChild(newUserName)
        newUser.appendChild(newNumber)

        usersList.appendChild(newUser)

        ordersWrapperList.innerHTML = null
        newUser.addEventListener('click', () => {
            for (let e of usersList.childNodes) {
                e.classList.remove('active')
            }
            newUser.classList.add('active')
            person.innerText = newUser.childNodes[1].innerText
            let currentUser = orders.filter((e) => e.user_id == element.user_id)
            foodsRenderer(currentUser, options, foods)
            id = element.user_id
        })
    }
}
usersRenderer(users)

addUserForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let newUser = {
        user_id: users.length + 1,
        user_name: addNameInput.value,     
        phone_number: addPhoneInput.value      
    }
    users.push(newUser)
    usersRenderer(users)
    addNameInput.value = null
    addPhoneInput.value = null
    person.innerText = 'No person selected yet'
})


