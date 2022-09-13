
var web3 = new Web3(ethereum);

import contract_data from "../build/contracts/Filimin.json" assert {type: "json"}


const contract_abi = contract_data.abi

const contract_address = contract_data.networks[4].address

var ver_FLM = document.getElementById("ver_FLM");

var mostrar_FLM = document.getElementById("mostrar_FLM")


var ver_dono = document.getElementById("ver_dono")

var mostrar_dono = document.getElementById("aparece_hash_dono")


var ver_contrato = document.getElementById("ver_contrato")

var mostrar_contrato = document.getElementById("mostrar_contrato")


var view_FLM = document.getElementById("view_FLM")
var show_balance = document.getElementById("show_balance")
async function ver_quantidade_de_FLM() {

    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(contract_abi, contract_address)

            var chamada = await ktr.methods.totalSupply().call()
            return chamada
        }
        catch (error) {
            console.log('erro no ver nome', error)
        }
    }
    else {
        alert('instale o metamask.')
    }


}





ver_FLM.addEventListener("click", () => {
    ver_quantidade_de_FLM().then((response) => {

        mostrar_FLM.innerHTML = `<h1>${Number(response) / (10 ** 18)}</h1> `



    }).catch((error) => {
        console.log("erro no no catch do eventlistener", error)

    })


})

async function pegar_hash_dono() {

    if (ethereum) {
        try {
            var ktr = new web3.eth.Contract(contract_abi, contract_address)

            var chamada = ktr.methods.owner().call()
            return chamada
        }
        catch (error) {

            console.log(error)
        }
    }
    else {
        alert('instale o metamask.')
    }
}



ver_dono.addEventListener("click", () => {

    pegar_hash_dono().then((response) => {

        mostrar_dono.innerHTML = `<h1>${response}</h1>`

    }).catch((error) => {

        console.log("deu erro aqui no hash dono", error)
    })


})



async function get_contract_address() {
    if (ethereum) {
        try {
            return contract_address
        }
        catch (error) {
            console.log("deu erro no get contract address", error)
        }
    } else {

        alert('instale o metamask')
    }

}


ver_contrato.addEventListener("click", () => {
    get_contract_address().then((response) => {

        mostrar_contrato.innerHTML = `<h1>${response}</h1>`




    }).catch((error) => {
        console.log("erro no ver contrato", error);
    })





})


async function ShowBalance() {
    if (ethereum) {
        try {
            let accounts = await ethereum.request({ method: "eth_requestAccounts" })
            let carteira = accounts[0]
            var ktr = new web3.eth.Contract(contract_abi, contract_address)
            var chamada = await ktr.methods.balanceOf(carteira).call()
            return chamada




        } catch (error) {
            console.log(error)
        }

    } else {
        alert('Instale o Metamask!')
    }





}

view_FLM.addEventListener("click", () => {

    ShowBalance().then((chamada) => {
        show_balance.innerHTML = ((chamada) / 10 ** 18).toString()
    }).catch((error) => {
        console.log(error)
    })





})