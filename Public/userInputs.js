let id = 0

let CAlimit = 99
let nOfAttackLimit = 50

const generateId = () =>{
    if (localStorage.getItem("id") === null){
        currentId = id
        id++
        localStorage.setItem("id", JSON.stringify(id));
    } else {
        let loadID = localStorage.getItem("id")
        currentId = JSON.parse(loadID)
        id = JSON.parse(loadID)
        id++
        localStorage.setItem("id", JSON.stringify(id));
    }
    return currentId
}

const party = [{
    name: "Björno",
    title: "I'm an example!",
    imgsrc: 'https://dbdzm869oupei.cloudfront.net/img/sticker/preview/36865.png',
    CA: 15,
    id: 999},
]
 
const attacks = [
   {
        attackName: "Swords",
        attack: 2,
        id: 0
    },
   {
        attackName: "Arcane Bolts",
        attack: 5,
        id: 1
    },
    {
        attackName: "Spears",
        attack: 7,
        id: 2
    }    
]

let defaultPic = "https://i.pinimg.com/736x/16/9c/a3/169ca37e784312385a142eda23ffe238.jpg"

const addInputChar = () => {
   let inputName =  $('#inputCharName').val()
   let inputCA =  $('#inputCharCA').val()
   let inputTitle =  $('#inputCharTitle').val()
   let inputPic =  $('#inputCharPic').val()

    if(inputCA && inputName && inputCA<=CAlimit){

        if (!(isValidURL(inputPic))){
            if(!(checkURL(inputPic))){inputPic = defaultPic}
        }
    
        let newChar = {
            name: inputName,
            title: inputTitle,
            imgsrc: inputPic,
            CA: inputCA,
            id: generateId()
        }
        party.push(newChar)

        renderCharCards()

        
        $('#inputCharName').val("")
        $('#inputCharCA').val("")
        $('#inputCharTitle').val("")
        $('#inputCharPic').val("")
        
        updateButtonStyle('#addCharBtn', false)
        updateButtonStyle('#saveBtn', true)
        updateButtonStyle('#loadBtn', true)

    } else if (inputCA) {errorLimitInput("CA")}
}

const addNewAttack = (x) => {
        let attackInput = $.trim(($('.attackInput')[x]).value)
        let bonusAttackInput =( $('.bonusAttackInput')[x]).value
                
    if(attackInput && bonusAttackInput<100){
        let newAttack = {
            attackName: attackInput, 
            attack: JSON.parse(bonusAttackInput),
            id: x
        }

        attacks[x] = newAttack 

        renderCharCards()
        renderAttackInputCard()

        let thisBtn = '#'+'inputAttackBtn'+x
        updateButtonStyle(thisBtn, false)    
        updateButtonStyle('#loadBtn', true)
        updateButtonStyle('#saveBtn', true)
    } 
}

const updateButtonStyle = (btnToUpdate, status) => {
    btn = $(btnToUpdate)
    if(!status){
        if(btn.hasClass('btn-danger')){
            btn.removeClass("btn-danger");
            btn.addClass("btn-outline-danger");
        }
    } else if(status){
            if(btn.hasClass('btn-outline-danger')){
                btn.addClass("btn-danger");
                btn.removeClass("btn-outline-danger");
            }
        }
    
    if(!status){
        if(btn.hasClass('btn-warning')){
            btn.removeClass("btn-warning");
            btn.addClass("btn-outline-warning");
        } 
    } else if(status){
            if(btn.hasClass('btn-outline-warning')){
                btn.addClass("btn-warning");
                btn.removeClass("btn-outline-warning");     
            }
        }
}

const save = () =>{
    localStorage.setItem("party", JSON.stringify(party));
    localStorage.setItem("attacks", JSON.stringify(attacks));
    updateButtonStyle('#saveBtn', false)
}

const load = () =>{
    if(localStorage && localStorage.length !== 0){  

        console.log(localStorage)

        let loadchar = JSON.parse(localStorage.getItem("party"));
        if(loadchar && loadchar.length > 0){
            party.splice(0,party.length)
            loadchar.forEach(char => {
                party.push(char)})
                renderCharCards()
        }

        let loadAttacks = JSON.parse(localStorage.getItem("attacks"));
        if(loadAttacks && loadAttacks.length > 0){
            attacks.splice(0,attacks.length)
            loadAttacks.forEach(atk => {
                attacks.push(atk)})
                renderAttackInputCard()
                renderCharCards()
        }
        updateButtonStyle('#loadBtn', false)
        updateButtonStyle('#saveBtn', false)
    } 
    if(!localStorage && localStorage.length == 0)
    {console.log("no save");}
}



const popUpModal = (id) =>{
    let Char = (party.filter(char=>char.id==id))[0]

    $('#modalTitle').html("Change "+Char.name+ " stats?")

    let stats = generateModalBody(id)

    $('#modalBody').html(stats)
}

const changeStats = (id) => {
    let index = party.findIndex(x => x.id ===id);
    let Char = (party.filter(char=>char.id==id))[0]

    let newName; let newTitle; let newCA; let newSrc;

    let nameval = $('#modalValueName').val()
    let titleVal = $('#modalValueTitle').val()
    let CAval = $('#modalValueCA').val()
    let srcVal = $('#modalValuesrc').val()

        if((nameval)==""){newName = Char.name} else {newName = nameval}
        if((titleVal)==""){newTitle = Char.title} else {newTitle = titleVal}
        if((CAval)==""){newCA = Char.CA} else {newCA = CAval}
        if((srcVal)==""){newSrc = Char.imgsrc} else {newSrc = srcVal}

    newStats = {
        name: newName,
        title: newTitle,  
        CA: newCA,
        id: id,
        imgsrc: newSrc
    }
    
    party[index] = newStats

    renderCharCards()
    updateButtonStyle('#saveBtn', true)
    updateButtonStyle('#loadBtn', true)
}

const deleteChar = (id) => { 

    let index = party.findIndex(x => x.id ===id);
    let Char = (party.filter(char=>char.id==id))[0]

    if (confirm("Delete Character?"+' ('+Char.name+')')) {
        if (index > -1) {party.splice(index, 1);}
        renderCharCards()
        updateButtonStyle('#saveBtn', true)
        updateButtonStyle('#loadBtn', true)
      } else {
        console.log("Saved!")
      }
}


////
const checkURL = (string) =>{
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
}
function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };
