//Congiguration data
let dataBucket = [
  {
    status: "Open",
  },
  {
    status: "Progress",
  },
  {
    status: "Testing",
  },
  {
    status: "Completed",
  },
];

let dataCards = [
  {
    id: 1,
    title: "Fix data picker",
    description: "Fix the input date handler",
    status: "Open",
  },
  {
    id: 2,
    title: "Change data",
    description: "Change the data",
    status: "Open",
  },
];

//Starts here
$(document).ready(() => {
  initializeBoards();
  initializeCards(dataCards);
  initializeCardListeners();
  $("#add-btn").click(() => {
    const title = $("#titleInput").val() != "" ? $("#titleInput").val() : null;
    const description =
      $("#descriptionInput").val() != "" ? $("#descriptionInput").val() : null;
    if (title && description) {
      let newCard = {
        id: cards.length + 1,
        title: title,
        description: description,
        status: "Open",
      };
      $("#titleInput").val("");
      $("#descriptionInput").val("");
      dataCards.push(newCard);
      $(`#${newCard.status}`).append(getCardUI(newCard));
      initializeCardListeners();
    }
  });
  $("#delete-btn").click(() => {
    deleteAll();
  });
});

//Function to initialze boards from configs.
function initializeBoards() {
  dataBucket.forEach((board) => {
    let boardContainer = `
        <div class="col span-1-of-4 box boardContainer" id="${board.status}">
            <h3>${board.status}</h3>
            <div class="dropzone">
            </div>
        </div>
    `;
    //appending to the boards. Cards will be added to the dropzones.
    $("#boards").append(boardContainer);
  });
  let dropzones = document.querySelectorAll(".boardContainer");

  dropzones.forEach((dropzone) => {
    //Drag Over
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    //Drop
    dropzone.addEventListener("drop", (e) => {
      try {
        if (e.target.id) {
          let draggedcardId = e.dataTransfer.getData("cardId");
          let newDataCards = [...dataCards];
          deleteAll();
          let index = newDataCards.findIndex((e) => e.id == draggedcardId);
          newDataCards[index].status = e.target.id;
          initializeCards(newDataCards);
        }
      } catch (err) {
        console.log("err in droping the card->", e);
      }
    });
  });
}

function deleteAll() {
  dataCards.forEach((c) => {
    $(`#${c.id}`).remove();
  });
}

//Function to initialize cards.
function initializeCards(dataCards) {
  dataCards.forEach((card) => {
    $(`#${card.status}`).append(getCardUI(card));
  });
  initializeCardListeners();
}

function initializeCardListeners() {
  cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("cardId", card.id);
    });
  });
}

function getCardUI(card) {
  let cardUI = `
      <div 
        class="card card-container ${card.status}" 
        id=${card.id.toString()} 
        draggable="true"
        >
          <div class="card-title"> ${card.id} - ${card.title}</div>
          <div class="card-description">${card.description}</div>
          <div class="card-status">${card.status}</div>

    </div>
    `;
  return cardUI;
}
