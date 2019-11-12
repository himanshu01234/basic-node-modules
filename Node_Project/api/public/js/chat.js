const socket=io()
const  $messages= document.querySelector('#messages')
// socket.on('countUpdated',(count)=>{
//     console.log('The count has been updated',count)

// })

const messageTemplate=document.querySelector('#message-template').innerHTML

socket.on('message',(message)=>{
    console.log(message)
    const html=Mustache.render(messageTemplate,{
        message
    })
    $messages.insertAdjacentHTML("beforeend",html)
})
// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('Clicked')
//     socket.emit('increment')
// })
document.querySelector('#message-from').addEventListener('submit',(e)=>{
    e.preventDefault()
    //const message=document.querySelector('input').value
    const message=e.target.elements.msg.value
    // socket.emit('sendMessage', message,(error)=>{
        
    //     if(error)
    //     {
    //         return console.log(error)
    //     }
    //     else
    //     {
    //         return console.log("success")
    //     }
    // })

    //console.log('Clicked')
    socket.emit('sendMessage',message)
})

document.querySelector("#send-location").addEventListener('click',()=>{
    if(!navigator.geolocation)                                              // navigator geolocation- every thing we use in geolocation lives on this... here we rae checking if geolocation browser is supported by the browser or not
    {
        return alert('Geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{              //get current location ---- asynchronous, dosnt support promise async await
console.log(position)
socket.emit('sendLocation',{
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
})
    })
})