import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-39595-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const inputEl = document.getElementById("inputarea")
const btnEl = document.getElementById("btn-publish")
const displyEl = document.getElementById("input-display")
const senderEl = document.getElementById("sender")
const receiverEl = document.getElementById("receiver")

btnEl.addEventListener("click", function(){
    let inputValue = inputEl.value
    let senderValue = senderEl.value
    let receiverValue = receiverEl.value
    let inputArr = [inputValue, senderValue, receiverValue]
    
    push(endorsementListInDB, inputArr)
    
    // appendToDisplayEl(inputValue)
    
    clearInput()
})

onValue(endorsementListInDB, function(snapshot){
    if(snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())
        
        clearDisplayEl()
        
        for(let i = 0; i < itemArray.length ; i++){
            let currentItem = itemArray[i]
            appendToDisplayEl(currentItem)
        }
    }
    else{
        displyEl.innerHTML = "No contents yet"
    }
})

function appendToDisplayEl(input){
    let inputId = input[0]
    let inputContent = input[1]
    let newEl = document.createElement("li")
    newEl.innerHTML = `<b>To ${inputContent[2]}:</b>
                        <br><br>
                        ${inputContent[0]}
                        <br><br>
                        <b>From ${inputContent[1]}</b>`
    newEl.setAttribute("style", "background: #FFFFFF;width: 320px;padding: 10px")
    newEl.addEventListener("dblclick", function(){
        let exactLocationInDb = ref(database, `endorsementList/${inputId}`)
        remove(exactLocationInDb)
    })
    
    displyEl.append(newEl)
}

function clearInput(){
    inputEl.value = ""
    senderEl.value = ""
    receiverEl.value = ""
}

function clearDisplayEl(){
    displyEl.innerHTML = ""
}