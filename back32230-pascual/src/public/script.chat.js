const socket = io();
const chatBox = document.getElementById("chatBox");
const chatButton = document.getElementById("chatButton");
const messagesBox = document.getElementById("messagesBox");

const getHtml = (template) => template.join("\n");
const renderMessage = (item) => {
   const html = getHtml([  
   `<span>${item.user}: ${item.message}</span>`
    ]);
    return html;
}

let user;
Swal.fire({
    title: "Identify yourself",
    input: 'email',
    inputLabel: 'Your email address',
    inputPlaceholder: 'Enter your email address',
    inputValidator: (value)=>{
        return !value && "you must type a email to continue"
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    padding: "20px"
}).then((result)=>{
    user=result.value;
})

chatBox.addEventListener("keyup", (event)=>{
    if(event.key === "Enter"){
        if(chatBox.value.trim().length){
            socket.emit("message", {
                user:user,
                message: chatBox.value
            });
            chatBox.value = ""
        }
    }

});

chatButton.addEventListener("click", ()=>{
    if(chatBox.value.trim().length){
        socket.emit("message", {
            user:user,
            message: chatBox.value
        });
        chatBox.value = ""
    }
})

socket.on("messagesLogs",(data)=>{
    const html = getHtml(data.map(item=>{
        return renderMessage(item);
    }));
    messagesBox.innerHTML = html;
});

socket.on("renderChat", (data)=>{
    const html = getHtml( data.map(item=>{
        return renderMessage(item);
    }));
    messagesBox.innerHTML = html;
});