function Drop(e){
	e.preventDefault();
	var data=e.dataTransfer.getData("Text");
	e.target.appendChild(document.getElementById(data));
}
function Dragover(e){
	e.preventDefault();
}
function Dragstart(e){
	console.log("dragstart");
	e.dataTransfer.setData("Text",e.target.id);
}
$('.a1').behavior({
		"Drop":Drop,
		"Dragover":Dragover
});
$('#tu').behavior({"dragstart":Dragstart});