const socketClient = io()

const form = document.getElementById('form')

const inputTitle = document.getElementById('title')
const titleP = document.getElementById('titleP')

const inputDescription = document.getElementById('description')
const descriptionP = document.getElementById('descriptionP')

const inputPrice = document.getElementById('price')
const priceP = document.getElementById('priceP')

const inputCode = document.getElementById('code')
const codeP = document.getElementById('codeP')

form.onsubmit = (e)=>{
    e.preventDefault()
    const title = inputTitle.value
    
    socketClient.emit('newTitle', title)

    const description = inputDescription.value
    socketClient.emit( 'newDescription', description)

    const price = inputPrice.value
    socketClient.emit( 'newPrice', price)

    const code = inputCode.value
    socketClient.emit( 'newCode', code)
  
}


socketClient.on('titleProduct', (title)=>{
    titleP.innerText = title;
})

socketClient.on('descriptionProduct', (description)=>{
    descriptionP.innerText = description;
})

socketClient.on('priceProduct', (price)=>{
    priceP.innerText = price;
})

socketClient.on('codeProduct', (code)=>{
    codeP.innerText = code;
})

//socketClient.on('welcome', (message)=>{

    //console.log(message);
   //  alert(message);
//})