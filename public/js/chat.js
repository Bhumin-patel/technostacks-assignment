const socket = io()

socket.on('brightnessUpdated', (brightness) => {
    console.log('The brightness has been updated!', brightness)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('increment')
})

document.querySelector('#decrement').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('decrement')
})