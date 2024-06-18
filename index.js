var data= {
    chatinit:{
        title: ["Hello! My name is <span class='fw-bold'>James</span> and I am your chatbot assistance", "How can I help you?"],
        options: ["Pricing 💰","Location","Services","Dishes 🍴"]
    },
    pricing: {
        title:["Our price varies on the event or party you would like to book. We have 3 options in every occasion from budget-friendly to expensive one. However, if you would like to see our services, please click the link below."],
        options:['List of services'],
        url : {
            link: ["offers.php"]
        }
    },
    
    location: {
        title:["We are located at Bingawan Mulapula Passi City, Iloilo"],
        options:["See location?"],
        url : {
            link:["https://maps.app.goo.gl/HY2djYPSJYEuMKHk9"]
        }
    },
    services: {
        title:["Exito Catering Services and Event Decorators offers a lot of services such as Birthday, Corporate events, Casual parties, Weddings, and more."],
        options:["More"],
        url : {
            link: ["services.php"]
        }
    },
    dishes: {
        title:["Exito have countless dishes to offer you, from our main dishes to side dishes.", "For our main category dishes we have, Beef, Pork, Chicken, Seafoods, and more.", "For our side dishes we have Appetizers, Soup, Salad, Noodles/Pasta, Desserts, and more."],
        options:['Beef','Pork','Chicken','Seafoods','More'],
        url : {
            link:["beef.php","pork.php","chicken.php","seafoods.php","services.php"]
        }
    },
}

document.getElementById("init").addEventListener("click",showChatBot);
var cbot= document.getElementById("chat-box");

var len1= data.chatinit.title.length;

// Show Chatbot
function showChatBot(){
    var x = document.getElementById("icon");
    if(x.classList.contains("fa-message")){
        document.getElementById('test').style.display='block';
        x.style.transition = "all .3s";
        x.classList.toggle("fa-xmark");
        x.classList.remove("fa-message");
        initChat();
    }
    else{
        document.getElementById('test').style.display='none';
        x.classList.remove("fa-xmark");
        x.classList.add("fa-message");
    }
}

function initChat(){
    j=0;
    cbot.innerHTML='';
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*500))
}

var j=0;
function handleChat(){
    console.log(j);
    var elm= document.createElement("p");
    elm.innerHTML = data.chatinit.title[j];
    elm.style.marginTop = "20px";
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt(){
    console.log(this);
    var str= this.innerText;
    var textArr= str.split(" ");
    var findText= textArr[0];
    
    document.querySelectorAll(".opt").forEach(el=>{
        el.remove();
    })
    var elm= document.createElement("p");
    elm.setAttribute("class","test");
    var sp= '<span class="rep">'+this.innerText+'</span>';
    elm.innerHTML= sp;
    cbot.appendChild(elm);

    console.log(findText.toLowerCase());
    var tempObj= data[findText.toLowerCase()];
    handleResults(tempObj.title,tempObj.options,tempObj.url);
}

function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}


function handleResults(title,options,url){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*500)
        
    }

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    if(isObjectEmpty(url)==true){
        console.log("having more options");
        setTimeout(function(){
            showOptions(options);
        },title.length*500)
        
    }
    else{
        console.log("end result");
        setTimeout(function(){
            handleOptions(options,url);
        },title.length*500)
        
    }
}
// Chatbot options / edit to remove the excess options
function handleOptions(options,url){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<a class="m-link" href="'+url.link[i]+'">'+options[i]+'</a>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        // Remove this to eliminate the other options
        cbot.appendChild(opt);
    }
    var opt= document.createElement("span");

    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    // opt.innerHTML=inp;
    // opt.setAttribute("class","opt link");
    cbot.appendChild(opt);
    handleScroll();
}

function handleScroll(){
    var elem= document.getElementById('chat-box');
    elem.scrollTop = elem.scrollHeight;
}