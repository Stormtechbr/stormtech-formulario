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
