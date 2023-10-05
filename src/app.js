import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js';
import{ Server, } from 'socket.io'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use('/realtimeproducts', viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log('Listening on port 8080');
});
  

const socketServer = new Server(httpServer)


socketServer.on('connection', (socket)=>{
   // console.log('socket', socket)
   // console.log(`cliente conectado: ${socket.id}`)
    socket.on('disconnect', ()=>{
        //console.log(`cliente desconectado: ${socket.id}`)
    })

    //socket.emit('welcome', 'welcome to websocket')

    socket.on('newTitle', (value)=>{
        //socket.emit('priceUpdated',  value)
        socketServer.emit('titleProduct', value)
        console.log('newTitle', value)
    })

    socket.on('newDescription', (value)=>{
        
        socketServer.emit('descriptionProduct' , value)
        console.log('newDescription', value)
    })

    socket.on('newPrice', (value)=>{
        
        socketServer.emit('priceProduct' , value)
        console.log('newPrice', value)
    })

    socket.on('newCode', (value)=>{
        
        socketServer.emit('codeProduct' , value)
        console.log('newCode', value)
    })
})

