
function addSPinner(){
 var spinnerDiv = document.createElement('div')
 var  spinnerContainer = document.createElement('div')
  spinnerDiv.classList.add('spinner')
  spinnerContainer.classList.add('spinnerContainer')
  //5 divs with class rect1..5
  spinnerContainer.appendChild(spinnerDiv)
  document.children[0].appendChild(spinnerContainer)
}
addSPinner()
   console.log(Date())
  console.log( document.children)
  window.addEventListener("load", function(event) {
    console.log("All resources finished loading!");
    document.children[0].removeChild(document.getElementsByClassName('spinnerContainer')[0])
  })
function addSpinnerLocally(loc){
	var spinnerDiv = document.createElement('div')
	var  spinnerContainer = document.createElement('div')
	spinnerDiv.classList.add('spinner')
	spinnerContainer.classList.add('spinnerContainer')
	//5 divs with class rect1..5
	spinnerContainer.appendChild(spinnerDiv)
document.getElementById(loc).appendChild(spinnerContainer)
}
function removeSpinnerLocally(loc){
	document.getElementById(loc).removeChild(document.getElementsByClassName('spinnerContainer')[0])

}