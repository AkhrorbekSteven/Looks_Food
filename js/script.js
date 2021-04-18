const foodSelect = document.querySelector('#foodSelect')
const ordersWrapperList = document.querySelector('.orders-wrapper-list')
const usersList = document.querySelector('.users-list')
const addUserForm = document.querySelector('.add-user-form')
const addNameInput = document.querySelector('.add-name-input')
const addPhoneInput = document.querySelector('.add-phone-input')
const addOrderForm = document.querySelector('.add-order-box')
const amountInput = document.querySelector('.amount-input')
const person = document.querySelector('.person')
const clientId = document.querySelector('#clientId')

function optionsRenderer (array) {
    for (let element of array) {
        let newOption = document.createElement('option')

        newOption.value = element.food_id
        newOption.innerText = element.food_name

        foodSelect.appendChild(newOption)
    }
} 


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

        newUser.addEventListener('click', () => {
            for (let e of usersList.childNodes) {
                e.classList.remove('active')
            }
            newUser.classList.add('active')
            clientId.innerText = element.user_id
            person.innerText = newUser.childNodes[1].innerText
            ordersRenderer(element.user_id)
        })
    }
}

function ordersRenderer (userId) {
    ordersWrapperList.innerHTML = null
    for (let food of foods) {
        for (let order of orders) {
            if (food.food_id == order.food_id && order.user_id == userId) {
                let newFoodItem = document.createElement('li')
                let newImg = document.createElement('img')
                let newSpan = document.createElement('span')
                let newFoodName = document.createElement('h2')

                newFoodItem.classList.add('food-thumb')
                newSpan.classList.add('food-amount')
                newFoodName.classList.add('food-name')

                newImg.src = food.food_url
                newSpan.innerText = order.count
                newFoodName.innerText = food.food_name

                newFoodItem.appendChild(newImg)
                newFoodItem.appendChild(newSpan)
                newFoodItem.appendChild(newFoodName)

                ordersWrapperList.appendChild(newFoodItem)
            }
        }
    }
}

addUserForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let newUser = {
        user_id: users[users.length - 1].user_id + 1,
        user_name: addNameInput.value,     
        phone_number: addPhoneInput.value      
    }
    users.push(newUser)
    window.localStorage.setItem('usersData', JSON.stringify(users))
    usersRenderer(users)
    addNameInput.value = null
    addPhoneInput.value = null
    person.innerText = 'Select a person'
    clientId.innerText = ''
})

addOrderForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (clientId.textContent) {
        let found =  orders.find(order => order.food_id == foodSelect.value && order.user_id == clientId.textContent)
        if (found) {
            found.count = parseInt(found.count) + parseInt(amountInput.value)
        } else {
            let newOrder = {
                user_id: clientId.textContent,
                food_id: foodSelect.value,
                count: amountInput.value
            }
            orders.push(newOrder)
        }
        foodSelect.value = 1
        amountInput.value = null
        window.localStorage.setItem('ordersData', JSON.stringify(orders))
        ordersRenderer(clientId.textContent)
    }
})

optionsRenderer(foods)
usersRenderer(users)