let character

function toggleCheck(x){
    let n1
    let n2
    let classClicked = x.classList[0]
    
    if(classClicked=="advantage"){n1 = 0; n2 = 1}
    if(classClicked=="disadvantage"){n1 = 1; n2 = 0}

    
    let thisBox = x.parentElement.children[n1]
    let otherBox = x.parentElement.children[n2]

    //toggle
    if($(x).is(":checked")){
        //unmark
        $(otherBox).prop('checked', false)
        //style
        warnRollModsStyle(classClicked, x)
    }

    if(!($(x).is(":checked"))){
        classClicked = "none"
        //style
        warnRollModsStyle(classClicked, x)
    }
}

const roll20 = () => {return Math.ceil(Math.random()*20)} 

const checkCA = (roll, mod) =>{
    let result = roll + mod
    if (character.CA > result){return 0}
        else{return 1}
}

function calculateAttacks (characterIdentifier) {

    let currentChar = (party.filter(char=>char.id==characterIdentifier))[0]

    character = currentChar

    let ID = character.id

    console.log ("Target:",character.name)
    console.log (character.CA+" CA")

    //set attacks
    let attack1 = attacks[0].attack
    let attack1Name = attacks[0].attackName
    let attack1Id = attacks[0].id
    let attack2 = attacks[1].attack
    let attack2Name = attacks[1].attackName
    let attack2Id = attacks[1].id
    let attack3 = attacks[2].attack
    let attack3Name = attacks[2].attackName
    let attack3Id = attacks[2].id


    //check how many attacks
    let counterAttack1Id = "#" + "attack1"+ID
    let counterAttack2Id = "#" + "attack2"+ID
    let counterAttack3Id = "#" + "attack3"+ID
    let nOfattacks1 = $(counterAttack1Id).val()
    let nOfattacks2 = $(counterAttack2Id).val()
    let nOfattacks3 = $(counterAttack3Id).val()


   ///advantages/disvantages mods///
   let mod1 = "none"
   let mod2 = "none"
   let mod3 = "none"

   //checks advanteges/disadvanteges checkboxes - attack 1
   let boxAdv1ID = '#' + "advantageBox"+ID+1
   let boxDis1ID = '#' + "disadvantageBox"+ID+1
   let advBox1 = $(boxAdv1ID)
   let disBox1 = $(boxDis1ID)

   if($(advBox1).is(":checked")){mod1 = "advantage"}
   if($(disBox1).is(":checked")){mod1 = "disadvantage"}

   //checks advanteges/disadvanteges checkboxes - attack 2
   let boxAdv2ID = '#' + "advantageBox"+ID+2
   let boxDis2ID = '#' + "disadvantageBox"+ID+2
   let advBox2 = $(boxAdv2ID)
   let disBox2 = $(boxDis2ID)

   if($(advBox2).is(":checked")){mod2 = "advantage"}
   if($(disBox2).is(":checked")){mod2 = "disadvantage"}

   //checks advanteges/disadvanteges checkboxes - attack 3
   let boxAdv3ID = '#' + "advantageBox"+ID+3
   let boxDis3ID = '#' + "disadvantageBox"+ID+3
   let advBox3 = $(boxAdv3ID)
   let disBox3 = $(boxDis3ID)

   if($(advBox3).is(":checked")){mod3 = "advantage"}
   if($(disBox3).is(":checked")){mod3 = "disadvantage"}

   //Rolls
   if(nOfattacks1 && nOfattacks1 > 0 && nOfattacks1 <= nOfAttackLimit){
        showResults(hitCalculation(mod1,nOfattacks1,attack1,attack1Name), characterIdentifier, mod1, attack1Id)
    } else if (nOfattacks1>nOfAttackLimit){errorLimitInput("attack")}

   if(nOfattacks2 && nOfattacks2 > 0 && nOfattacks2 <= nOfAttackLimit){
        showResults(hitCalculation(mod2,nOfattacks2,attack2,attack2Name), characterIdentifier, mod2, attack2Id)
    } else if (nOfattacks2>nOfAttackLimit){errorLimitInput("attack")}

    if(nOfattacks3 && nOfattacks3 > 0 && nOfattacks3 <= nOfAttackLimit){
        showResults(hitCalculation(mod3,nOfattacks3,attack3,attack3Name), characterIdentifier, mod3, attack3Id)
    } else if (nOfattacks3>nOfAttackLimit){errorLimitInput("attack")}

    $(counterAttack1Id).val('')
    $(counterAttack2Id).val('')
    $(counterAttack3Id).val('')
}

const hitCalculation = (attackMod,nOfAttacks,attackBonus,attackName) => {

    let results = []

    console.log('checking modifier:', attackMod)
    console.log('calculating', nOfAttacks, attackName,'Atacks')

    for(i=0;i<nOfAttacks;i++){ 
        if (attackMod == "none") {
            let roll = roll20();
            reportRolls(roll, attackBonus);
            if (roll != 1 && roll != 20) {
                results.push(roll);
            } else {
                if (roll == 20) { results.push("critHit"); }
                if (roll == 1) { results.push("critMiss");}
            }
        }

        if (attackMod == "advantage") {
            console.log('- - -');
            let roll = roll20();
            let roll2 = roll20();
            if (roll == 20 || roll2 == 20) {
                results.push("critHit"); 
            } else {
                if (roll == 1 && roll2 == 1) {
                    results.push("critMiss");
                } else {
                    let relevantRoll
                    if(roll>=roll2){relevantRoll=roll}else{relevantRoll=roll2}
                    results.push(relevantRoll);
                }
            } reportRolls(roll, attackBonus);reportRolls(roll2, attackBonus);
        }

        if (attackMod == "disadvantage") {
            console.log('- - -');
            let roll = roll20();
            let roll2 = roll20();
            reportRolls(roll, attackBonus);reportRolls(roll2, attackBonus);
            if (roll == 1 || roll2 == 1) {
                results.push("critMiss");
            } else {
                if (roll == 20 && roll2 == 20) { results.push("critHit");}
                else {
                    let relevantRoll
                    if(roll<=roll2){relevantRoll=roll}else{relevantRoll=roll2}
                    results.push(relevantRoll);
                }
            }
        }

     }
    console.log(results)   
    return results
}

const showResults = (results, ID, mod, atkID) => {
    
    let currentAttack = (attacks.filter(atk=>atk.id==atkID))[0]

    let typeOfAttack = currentAttack.attackName
    let attackBonus = currentAttack.attack

    let mainParentId = "#"+"mainCard"+ID
    let mainParent = $(mainParentId)

    let resultsToShow = ""
    let cardTitle = typeOfAttack + " Attacks"

    let cardId = character.id+"attack"+atkID;
    cardId = cardId.replace(/\s+/g, '');

    updateVisibleWindows(cardId)

    results.forEach((result) => {
            if(result == 'critHit'){resultsToShow += "<span class='crithit btn btn-success'>CRIT</span>"}           
            if(result == 'critMiss'){resultsToShow += "<span class='critmiss btn btn-danger'>CRIT</span>"}
            if(result != 'critHit' && result != 'critMiss'){
                    let didItHit = checkCA(result, attackBonus)
                    if (didItHit == 0) {resultsToShow += "<span class='miss btn btn-danger numberResult'>"+result+"</span>"}
                     else {resultsToShow += "<span class='hit btn btn-success numberResult'>"+result+"</span>"}
             }
        }
    ) 
    $(mainParent).append(
            `
        <div class="card mt-3 ml-3 shadow resultContainer" id="${cardId}">
            <div class="card-body ${mod}FinalCard">
                 <h4 class="card-title">${cardTitle} (+${attackBonus})</h4>
                 <p class="card-text">${resultsToShow}</p>
            </div>
        </div>
            `
          ) 
}

const updateVisibleWindows = (cardId) => {
    let idName = '#' + cardId
   $(idName).remove()
}

const warnRollModsStyle = (classClicked, element) =>{

    box = element.parentElement.parentElement

    modText = element.parentElement.parentElement.children[3]

    if(classClicked == "advantage"){
        $(box).addClass('advantage')
        $(box).removeClass('disadvantage')
        $(modText).html("Advantage")
    }
    if(classClicked == "disadvantage"){
        $(box).addClass('disadvantage')
        $(box).removeClass('advantage')
        $(modText).html("Disadvantage")
    }
    if(classClicked == "none"){
        $(box).removeClass('disadvantage')
        $(box).removeClass('advantage')
        $(modText).html("")
    }
}

const errorLimitInput = (value) =>{
    let alertError = ""

    if(value == "attack"){
        alertError = "Can't calculate more than "+nOfAttackLimit+ " Attacks!"
    }

    if(value == "CA"){
        alertError = "Can't have more than "+CAlimit+" CA"
    }

    $('#alertError').html(`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Limit Exceeded!</strong> <span>${alertError}</span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `)
}

const reportRolls = (roll, mod) => {
    console.log('result is '+ (roll+mod) +' ('+roll+'+'+mod+')')
}

