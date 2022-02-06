console.log('Client side javascript file is loaded.')
// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             return console.log(data.error)
//         }
//         console.log(data.location)
//         console.log(data.forecast)
//     })
// })

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageError.textContent = "from JS"

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = searchTerm.value
    messageOne.textContent = "Loading...."
    messageTwo.textContent = ""
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })

    })
})