const inforClient = document.getElementById("clientData");
const addressClient = document.getElementById("inputAddress");
const inputProduc = document.getElementById("inputProduct");

const cep = document.getElementById("cep").addEventListener("focusout", seachCep)
const cpf = document.getElementById("cpf").addEventListener("focusout", validationCPF)


const send = document.getElementById("send");
const back = document.getElementById("back");
const next = document.getElementById("next");

function validationCPF() {
    const CPF = document.getElementById("cpf").value
    var Soma;
    var Resto;
    Soma = 0;
  if (CPF == "00000000000") {
        return alert("CPF inválido, favor digitar um CPF válido!", clearCpf());
    }

  for (i=1; i<=9; i++) Soma = Soma + parseInt(CPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(CPF.substring(9, 10)) ){
        return alert("CPF inválido, favor digitar um CPF válido!", clearCpf());
    }

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(CPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(CPF.substring(10, 11) ) ) {
        return alert("CPF inválido, favor digitar um CPF válido!", clearCpf());
    }
    return true;
}

function clearCpf() {
    document.getElementById("cpf").value = "";
}

function clearForm() {
    document.getElementById("street").value = "";
    document.getElementById("district").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
}

async function seachCep() {
    clearForm()

    const cep = document.getElementById("cep").value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const data = await fetch(url);
    const end = await data.json();

    const completeAddress = (end) => {
        document.getElementById("street").value = end.logradouro;
        document.getElementById("district").value = end.bairro;
        document.getElementById("city").value = end.localidade;
        document.getElementById("state").value = end.uf;
    }

    if(end.hasOwnProperty("erro")) {
        console.log(end);
        alert("Erro: Cep não encontrado, tente novamente!");
    } else {
        completeAddress(end)
    }
}
const nextPageButton = document.getElementById("next");
nextPageButton.addEventListener("click", nextPage);


function nextPage() {
    if( document.getElementById("cpf").value == "" ) {
        next.setAttribute("disabled");
    }

    if(addressClient.classList.contains("inputAddress") && back.classList.contains("back")) {
        inforClient.setAttribute("class", "inforPerson");
        addressClient.removeAttribute('class', 'inputAddress');
        back.removeAttribute("class", "back");

    } else if(inforClient.classList.contains("inforPerson") && inputProduc.classList.contains("inputProduct")) {
        addressClient.setAttribute("class", "inputAddress");
        inputProduc.removeAttribute("class", "inputProduct");
        next.setAttribute("class", "noNext");
        send.removeAttribute("class", "send")
    } else if(!addressClient.classList.contains("inputAddress")) {
        addressClient.setAttribute("class", "inputAddress");
        inputProduc.removeAttribute("class", "inputProduct");
        next.setAttribute("class", "noNext");
        send.removeAttribute("class", "send")
    }

 

};


const backPageButton = document.getElementById("back");
backPageButton.addEventListener("click", backPage);

function backPage() {
    if(inforClient.classList.contains("inforPerson") && inputProduc.classList.contains("inputProduct")) {
        addressClient.setAttribute("class", "inputAddress");
        back.setAttribute("class", "back");
        inforClient.removeAttribute("class", "inforPerson");

    } else if(next.classList.contains("noNext") && addressClient.classList.contains("inputAddress")) {
        send.setAttribute("class", "send");
        inputProduc.setAttribute("class", "inputAddress");
        addressClient.removeAttribute("class", "inputAddress");
        next.removeAttribute("class", "noNext");

    } else if(inputProduc.classList.contains("inputAddress") && send.classList.contains("send")) {
        addressClient.setAttribute("class", "inputAddress");
        inforClient.removeAttribute("class", "inforPerson");
        back.setAttribute("class", "back");
    }
}
