// OPERAZIONI PRELIMINARI

// Raccolgiamo tuttio gli elementi preliminare

const STORAGE_KEY = '__bool-xmas-list__';

let gifts = [];

// ! Controllo subito se c'erano elementi salvati nello storage
const prevList = localStorage.getItem(STORAGE_KEY);

// Se ne trovi....
if (prevList) {
  // 1. Utilizziamo la lista precedente al posto di quella vuota
  gifts = JSON.parse(prevList);

  // 2. Ricalcolare il totale
  calculateTotal();

  // 3. Rirenderizzare la lista
  renderList();

}

const totalSlot = document.querySelector('.total-slot');
const giftListElement = document.querySelector('.gifts-list');
//const giftsListElement = document.querySelector('.gifts-list');

const form = document.querySelector('#gift-form');
const nameField = document.querySelector('#name-field');
const priceField = document.querySelector('#price-field');
const descriptionField = document.querySelector('#description-field');



//preparo la lista




// EVENTI DINAMICI //

// Intercettiamol'invio del form

form.addEventListener('submit', function(event) {
   

    // blocchaimo il ricarcamento dle form per gestirlo con JS
    event.preventDefault();

   // console.log('inviato');

    //2 raccolgo i dati



    const name = nameField.value.trim();
    const price = priceField.value.trim();
    const description = descriptionField.value.trim();


    addGift(name, price, description);
    

    //pulisco il form 1:10
    form.reset();


    // stampo a video quello che inserisco nel form

    renderList();

    nameField.focus();

    

});


// creo una funzione per aggiungere il regalo all'html

function addGift(name, price, description) {

//creaiamo nuovo l'oggetto regalo



const newGift = {
    name: name,
    price: Number(price),
    description: description
  };



// aggiungiamo l'oggeto regalo all'array lista

console.log(newGift);
gifts.push(newGift);



console.log(gifts)

//3. Calcoliamo il Totale delegando il pezzo ad altra funzione
calculateTotal();

//4. renderiamo l'oggetto in pagina con un ciclo sulla fila

    //giftListElement.
}


// funzione per calcolare il totale

function calculateTotal() {

    let total = 0;

    

    for(let i =0; i < gifts.length; i++) {
// lo aggiungo al totale
        total +=  gifts[i].price;
      
    }

    // fine

    totalSlot.innerText = formatAmmount(total)

}

// funzione per formattore una cifra

function formatAmmount(amount) {
    return amount.toFixed(2) + '€';

}

// funzione per renderizzare la lista dei regali presi dalla dall'array che contiene gli oggetti

function renderList() {
    // TODO!!!
giftListElement.innerHTML = ''
    //per tutti i regali


    for (let i = 0; i < gifts.length; i++) {

        const giftElement = createListElement(i);

        giftListElement.innerHTML += giftElement;

        // const element = gifts[i];

        // const nomeRegalo = element.name
        // const prezzoRegalo = element.price
        // const descrizioneRegalo = element.description

    //     const htmlLi = ` 
    //     <li class="gift">
    //     <div class="gift-info">
    //           <h3>${nomeRegalo}</h3>
    //           <p>${descrizioneRegalo}</p>
    //       </div>
    //       <div class="gift-price">
    //       ${prezzoRegalo}
    //       </div>
    //       <div class="gift-button">
    //           ❌
    //       </div>

         
          
    // //   </li> `

    //     console.log(htmlLi)

        // appendo la costante al codice html

       //let xy= giftListElement.innerHTML += htmlLi;
        

    }

    //return xy;

      // 5. Rendo cliccabili i bottoni
  setDeleteButtons();

    
}

function createListElement(i) {

    const gift = gifts[i];

return`
    <li class="gift">
    <div class="gift-info">
          <h3>${gift.name}</h3>
          <p>${gift.description}</p>
      </div>
      <div class="gift-price">
      ${gift.price}
      </div>
      <div class="gift-button" data-index="${i}">
          ❌
      </div>

     
      
  </li> `;
    
}

// Funzione per attivare i bottoni di cancellazione
function setDeleteButtons() {
    // 1. Recuperare tutti i bottoni dei regali
    const deleteButtons = document.querySelectorAll('.gift-button');
  
    // 2. Per ognuno dei bottoni....
    for (let i = 0; i < deleteButtons.length; i++) {
      // 3. REcuperiamo (per comodità) il singolo bottone ad ogni giro
      const button = deleteButtons[i];
  
      // 4. Aggiungo l'event listener
      button.addEventListener('click', function () {
        // 5. Individuo l'index corrispondente
        const index = button.dataset.index;

        console.log(index)
  
        // 6. Rimuovo dalla lista il regalo corrispondente
        removeGift(index);
      });
    }
  }

  function removeGift(index) {
    // 1. Rimuovo il regalo dalla lista
    gifts.splice(index, 1);
    console.log(gifts);
  
    // ! Aggiornare il localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
  
    // 2. Ricalcoliamo il totale
    calculateTotal();
  
    // 3. Rirenderizzare la lista
    renderList();
  }