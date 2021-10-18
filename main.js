//pantallas
var screen1, screen2, screen3;

//pantalla 2
var inputAmount2, labelMeasurementUnit2, selectResources2, alert2;
//pantalla 3
var inputAmount3,
  labelMeasurementUnit3,
  selectResources3,
  resourcesTable,
  alert3;

//general
var resources = ["Agua", "Polvora", "Gas", "Hojas(Filo)", "Equipo de maniobra"];
var measurementUnits = ["litros", "gramos", "tubos", "unidades", "unidades"];
var resourceSelected = -1;

//En el load se toman las referencias a las diferentes "pantallas"
function onLoad() {
  screen1 = document.getElementById("pantalla1");
  screen2 = document.getElementById("pantalla2");
  screen3 = document.getElementById("pantalla3");

  //pantalla 2
  inputAmount2 = document.getElementById("inputAmount2");
  labelMeasurementUnit2 = document.getElementById("labelMeasurementUnit2");
  selectResources2 = document.getElementById("selectResources2");
  alert2 = document.getElementById("alertScreen2");
  //pantalla 3
  inputAmount3 = document.getElementById("inputAmount3");
  labelMeasurementUnit3 = document.getElementById("labelMeasurementUnit3");
  selectResources3 = document.getElementById("selectResources3");
  resourcesTable = document.getElementById("tableBody");
  alert3 = document.getElementById("alertScreen3");
}
//Metodo para cambiar a segunda pantalla
function selectResourceOne(event) {
  resourceSelected = event.target.value;
  screen2.removeAttribute("hidden");
  screen1.setAttribute("hidden", true);
  selectResources2.value = resourceSelected;
  selectResourceTwo(event);
}
function selectResourceTwo(event) {
  resourceSelected = event.target.value;
  labelMeasurementUnit2.textContent = measurementUnits[resourceSelected];
}
function selectResourceThree(event) {
  resourceSelected = event.target.value;
  labelMeasurementUnit3.textContent = measurementUnits[resourceSelected];
}
function insertResourceTwo(event) {
  event.preventDefault();

  if (inputAmount2.value > 0) {
    screen3.removeAttribute("hidden");
    screen2.setAttribute("hidden", true);

    addRowResource(selectResources2.value, inputAmount2.value);
  } else {
    alert2.removeAttribute("hidden");
  }
}
function insertResourceThree() {
  if (inputAmount3.value > 0 && selectResources3.value > -1) {
    addRowResource(selectResources3.value, inputAmount3.value);
  } else {
    alert3.removeAttribute("hidden");
  }
}

function deleteResourceRow(event) {
var row;
  if(event.target.nodeName=="SPAN"){
    row = event.target.parentNode.parentNode.rowIndex;
  }
  else{
    row = event.target.parentNode.rowIndex;
  }
  resourcesTable.deleteRow(row);
}
function addRowResource(resourceIndex, amount) {
  let newRow = resourcesTable.insertRow();
  //Celdas
  var nameCell = newRow.insertCell();
  var amountCell = newRow.insertCell();
  var dateCell = newRow.insertCell();
  var deleteCell = newRow.insertCell();

  nameCell.appendChild(document.createTextNode(resources[resourceIndex]));
  amountCell.appendChild(
    document.createTextNode(amount + " " + measurementUnits[resourceIndex])
  );
  dateCell.appendChild(
    document.createTextNode(moment(Date.now()).format("YYYY-MM-DD"))
  );

  var button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-danger";
  button.onclick = deleteResourceRow;

  var icon = document.createElement("span");
  icon.className = "glyphicon glyphicon-trash";

  button.appendChild(icon);

  deleteCell.className = "text-center";
  deleteCell.appendChild(button);
}
