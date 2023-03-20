'use strict'

const nom = document.getElementById('nom')
const prenom = document.getElementById('prenom')
const CIN = document.getElementById('CIN')
const Contact  = document.getElementById('contact')
const commune= document.getElementById('commune')
const list = document.getElementById('list')
const add = document.getElementById('btn')
const clear = document.getElementById('clear')
const input = document.getElementsByClassName('input')
const remplissage = document.forms['remplissage']
const infoParent= document.getElementById('information')

const storage = new ArrayStorage('infos')

const infos=storage.list
// const infos=['RANRIA Toky', 'RAZANA Koto','REMIA Rabe']

function infoToDOM(task){
    if(typeof task === 'string' && task){

        const li = document.createElement('li')

        const edit= document.createElement('button')
        const editPic= document.createElement('img')

        const remove= document.createElement('button')
        const removePic= document.createElement('img')

        const informationDiv= document.createElement('div')
        informationDiv.style.width='500px'
        informationDiv.style.height='250px'

        const stockInfo = document.createTextNode(`
        Nom complet: ${infos[0]} 
        Numéro CIN: ${infos[1]}  
        Contact: ${infos[2]}    
        Commune: ${infos[3]}   
        `)

        // const nom = document.createTextNode(storage.list[0])
        // const prenom = document.createTextNode(storage.list[1])

        li.textContent=task
        li.style.fontWeight='bold'

        edit.style.borderRadius='0'
        editPic.src='assets/img/edit.png'
        editPic.title="Modifier"

        remove.style.borderRadius='0'
        removePic.src='assets/img/del.png'
        removePic.title="Supprimer"

        edit.appendChild(editPic)
        remove.appendChild(removePic)

        // li.appendChild(nom)
        // li.appendChild(prenom)

        li.appendChild(edit)
        li.appendChild(remove)
        
        list.prepend(li)

        remove.addEventListener('click', ()=>{
            const value=remove.parentNode.firstChild.textContent
            storage.remove(value)
            list.removeChild(remove.parentNode)
        })

        edit.addEventListener('click',()=>{
            infoParent.insertBefore(informationDiv,list.nextElementSibling)
            informationDiv.style.border='1px dashed black'
            informationDiv.style.background='white'
            informationDiv.appendChild(stockInfo)
        })

        return true
    }
    return false
}

infos.forEach(info => {
    infoToDOM(info)
})

function newInfos() {
    if(storage.list.indexOf(input[0].value)===-1 && infoToDOM(input[0].value)){
        storage.set(input[0].value)
        for(let inp of input){
            inp.value=''
        }
    }
    input[0].focus()
}

// function infoAll(){
//     for(let inp of input){
//         if(storage.list.indexOf(inp.value)===-1 && infoToDOM(inp.value)){
//             storage.set(inp.value)
//         }
//     }
// }

remplissage.addEventListener('submit', e => {
    e.preventDefault()
    newInfos()
})



clear.addEventListener('click',()=>{
    storage.clear()
    list.parentNode.innerHTML='<h1 class="notif">La liste est vide...</h1>'
})
