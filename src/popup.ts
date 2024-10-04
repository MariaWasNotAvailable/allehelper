const popupReady = ():void => {
	const disableAnimElement = document.querySelector<HTMLInputElement>("#disableAnimations")!;
  
	chrome.storage.local.get(["turnAnimationsOff"], (result) => {
		console.log(`AlleHelper: got turnAnimationsOff: ${result.turnAnimationsOff}`)
		disableAnimElement.checked = result.turnAnimationsOff;
	});
  
	disableAnimElement.addEventListener("change", () => {
		console.log(`AlleHelper: setting turnAnimationsOff: ${disableAnimElement.checked}`)
		chrome.storage.local.set({"turnAnimationsOff": disableAnimElement.checked}, () => {});
	});
}

if (document.readyState !== 'complete') {
	window.addEventListener('load', popupReady);
} else {
	popupReady();
};