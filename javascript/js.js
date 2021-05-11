function request(metodo, url, cFunction, status, dados){
    if(status == undefined){
        status = 200;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == status){
            cFunction(this);
        }
    };
    xhttp.open(metodo, url, true);
    xhttp.setRequestHeader("Content-type", "application/json")
    if(dados == undefined){
        xhttp.send();
    }else{
        xhttp.send(JSON.stringify(dados));
    }
}

function configEventos(){
    var itensNav = document.getElementsByClassName("nav-link")
    for( var i=0; i<itensNav.length; i++){
        itensNav[i].addEventListener('click', clicarLink)
        itensNav[i].addEventListener('click', mostrarProdutos)
    }
    var itens = document.getElementsByClassName("btn-ocultar")
    for(var i=0; i<itens.length; i++){
        itens[i].addEventListener('click', esconderCard)
    }
    var cards = document.getElementsByClassName("item-container")
    for(var i=0; i<cards.length; i++){
        cards[i].addEventListener('click', mostrarDesc)
    }
    var form = document.getElementById("form-usuario");
    form.addEventListener("submit", function(event){
        event.preventDefault();
        enviarFormulario(this);
    });
    var ocultarBtnLogin = document.getElementsByClassName("btn")
    for(var i=0; i<ocultarBtnLogin.length; i++){
        ocultarBtnLogin[i].addEventListener('click', ocultarlogin)
    }
    var ocultarBtnSair = document.getElementById("btn-sair")
    ocultarBtnSair.addEventListener('click', ocultarSair)
}

function desativarLink(){
    var itensNav = document.getElementsByClassName("nav-link")
    for( var i=0; i<itensNav.length; i++){
        itensNav[i].classList.remove("ativo")
    }
}

function clicarLink(){
    desativarLink()
    this.classList.add("ativo")
    
}

function esconderProdutos(){
    var itens = document.getElementsByClassName("secao")
    for( var i=0; i<itens.length; i++){
        itens[i].style.display = "none"
    }
}

function mostrarProdutos(){
    esconderProdutos()
    var idSecao = this.getAttribute("data-secao")
    produtos = document.getElementById(idSecao)
    console.log(produtos)
    produtos.style.display = "flex"
    
}


function esconderCard(){
    var idSecao = this.getAttribute("data-item")
    produtos = document.getElementById(idSecao)
    console.log(produtos)
    produtos.style.display = "none"
}

function mostrarDesc(){
    var idSecao = this.getAttribute("data-desc")
    produtos = document.getElementById(idSecao)
    console.log(produtos)
    produtos.style.display = "block"
}

function ocultarlogin(){
    var form = document.getElementById('form-usuario')
    var email = form["email"].value;
    var password = form["password"].value
    var idBtn = this.getAttribute("data-btn")
    var idBtnSair = this.getAttribute("data-btnSair")
    btn = document.getElementById(idBtn)
    btnSair = document.getElementById(idBtnSair)
    
    if(email == 'eve.holt@reqres.in' && password != ''){
        
        btnSair.style.display = "none"
        btn.style.display = "block"
       
    }
}

function ocultarSair(){
    var login = document.getElementsByClassName("button-dropdown")
    var idSair = this.getAttribute("data-sair")
    var btnLSair = document.getElementById(idSair)
    this.style.display = 'none'
    btnLSair.style.display = 'block'

}

function enviarFormulario(form){
    if(validarFormulario(form)){
        var dados = {
            email: form["email"].value,
            password: form["password"].value
        }
        form.reset();
        request("POST", "https://reqres.in/api/login", responseEnviarFormulario, 200, dados)
    }
}

function validarFormulario(form){
    var email = form["email"].value;
    var password = form["password"].value


    if(email == ''){
        alert("O campo email não pode estar vazio")
        return false;
    }
    if(password == ''){
        alert("O campo senha está vazio")
        return false
    }
    if(email != 'eve.holt@reqres.in'){
        alert("Usuario não encontrado")
        return false
    }
    
    return true;
}

function responseEnviarFormulario(xhttp){
    var response = JSON.parse(xhttp.responseText)
}



