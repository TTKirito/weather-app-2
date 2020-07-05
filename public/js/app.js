



const formWeather = document.querySelector('form')
const inputWeater = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

formWeather.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const serch = inputWeater.value
    fetch('/weather?address=' + serch +'').then(response => {
        response.json().then(data => {
            if(data.error) {
                return messageOne.textContent = data.error
            }
    
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
        })
    })
    
})