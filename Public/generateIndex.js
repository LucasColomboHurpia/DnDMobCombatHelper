
const renderCharCards = () =>{

    $('#CharactersSection').html("")

    party.forEach(char => {
    $('#CharactersSection').append(
        `
        <div class="container-fluid characterCard ml-0 mt-1 d-flex flex-row align-items-center" id="mainCard${char.id}">
        <div class="row ">
            <div class="col-12 mt-3 fixCardSize">
                <div class="card mt-0 shadow">
                    <div class="card-horizontal align-items-center">
                        <div class="img-square-wrapper d-flex align-items-center imgCharacter">
                            <img 
                                class="img-fluid; border-0;"
                                src="${char.imgsrc}"
                                alt="URL not Available">
                        </div>
                        <div class="card-body pt-0 pb-0 charStats" id="charStats${char.id}">
                            <h4 class="card-title" id="charName${char.id}">${char.name}</h4>
                            <p class="card-text" id="charTitle${char.id}">${char.title}</p>
                            <p class="card-text" id="charCA${char.id}">${char.CA} CA</p>
                        </div>
                            <div class="d-flex align-items-center">
                                <div class="d-flex align-items-center">

                                <!--  Generate Attack 1 -->
                                    <div class="d-flex flex-column align-items-center pb-3">
                                        <small class="typeOfHit">${attacks[0].attackName} (+${attacks[0].attack})</small>
                                            <div>
                                                <input type="checkbox" class="advantage" id="advantageBox${char.id}1" onclick="toggleCheck(this)">
                                                <input type="checkbox" class="disadvantage" id="disadvantageBox${char.id}1" onclick="toggleCheck(this)">
                                            </div>
                                        <input type="number" max="30" min="0" class="counterAttacks" id="attack1${char.id}">   
                                        <small></small>
                                    </div>

                                    <!--  Generate Attack 2 -->
                                    <div class="d-flex flex-column align-items-center pb-3 ml-2">
                                        <small class="typeOfHit">${attacks[1].attackName} (+${attacks[1].attack})</small>
                                            <div>
                                                <input type="checkbox" class="advantage" id="advantageBox${char.id}2" onclick="toggleCheck(this)">
                                                <input type="checkbox" class="disadvantage mb-1" id="disadvantageBox${char.id}2" onclick="toggleCheck(this)">
                                            </div>
                                        <input type="number" max="30" min="0" class="counterAttacks" id="attack2${char.id}">   
                                        <small></small>
                                    </div>

                                    <!--  Generate Attack 3 -->
                                    <div class="d-flex flex-column align-items-center pb-3 ml-2">
                                        <small class="typeOfHit">${attacks[2].attackName} (+${attacks[2].attack})</small>
                                            <div>
                                                <input type="checkbox" class="advantage" id="advantageBox${char.id}2" onclick="toggleCheck(this)">
                                                <input type="checkbox" class="disadvantage mb-1" id="disadvantageBox${char.id}2" onclick="toggleCheck(this)">
                                            </div>
                                        <input type="number" max="30" min="0" class="counterAttacks" id="attack3${char.id}">   
                                        <small></small>
                                    </div>

                                </div>
                            </div>                   
                        <button type="button" class="btn btn-danger mr-3 ml-2" id="roll${char.id}btn" onclick="calculateAttacks(${char.id})">Roll</button>  
                        <span><img src="./Public/assets/cog.png" class="cogIcon" onclick="popUpModal(${char.id})" data-toggle="modal" data-target="#changeStatsModal"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    )      
        })
}

const renderAttackInputCard = () =>{

    $('#AddAttackCard').html("")

    for(i=0;i<attacks.length;i++){
   $('#AddAttackCard').append(`
<div class="col-12 mt-2 ml-3 attackInputCard">
   <div class="card mt-0">
       <div class="card-horizontal align-items-center">
           <div class="card-body pt-0 pb-0">
               <span class="card-title">Attack Name ${i+1} </span><input type="text" oninput="updateButtonStyle('#inputAttackBtn${i}',true)" placeholder="${attacks[i].attackName}" class="attackInput">
               <span class="card-title">Attack Bonus </span><input type="number" class="numberCard bonusAttackInput" oninput="updateButtonStyle('#inputAttackBtn${i}',true)" placeholder="(max: 99)" max="99" min="0">
           </div>                
           <button type="button" class="btn btn-danger mr-3 ml-2" id="inputAttackBtn${i}" onclick="addNewAttack(${i})">Change</button>
       </div>
   </div>
</div>
    `)
    } 
}

const generateModalBody = (id) =>{
    let Char = (party.filter(char=>char.id==id))[0]

    let STATS = `
    <div class="card-body pt-0 pb-0 modalStats" id="STATS${Char.id}Modal">
        <p><span class="card-title">Change name? </span> <input type="text" maxlength = "20" class="float-right" id="modalValueName" placeholder="${Char.name}"></p>
        <p><span class="card-text">Change title? </span> <input type="text" maxlength = "30" class="float-right" id="modalValueTitle" placeholder="${Char.title}"></p>
        <p><span class="card-text">Change CA? </span> <input type="number" max="30" min="0" class="counterAttacks float-right" id="modalValueCA" placeholder="${Char.CA}"></p>
        <p><span class="card-text">Change image? </span> <input type="text" class="float-right" id="modalValuesrc" placeholder="${Char.imgsrc}"></p>   
   </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" onclick="deleteChar(${Char.id})" data-dismiss="modal">Delete</button>
      <button type="button" class="btn btn-primary" onclick="changeStats(${Char.id})" data-dismiss="modal">Change stats</button>
    </div>
`
    return STATS
}

//////
onload = function () {
    renderCharCards()
    renderAttackInputCard()
}

const Reload = () => {
    if (confirm("Delete Save and Restart?")) {
      localStorage.clear()
      location.reload()
    } else {
      console.log("clear cancelled")
    }
}