const audio = new Audio("aboutmeJS/dustshort.mp3");
audio.loop = true;

const clickZone = document.getElementsByClassName("aboutme-click");
clickZone[0].addEventListener("click", () => {
	if(audio.paused) {
		audio.currentTime=0;
		audio.play();
		clickZone[0].innerHTML = "Light & Sound [click to stop] Light & Sound";
	}
  else {
  	audio.pause();
  	clickZone[0].innerHTML = "Light & Sound [click to play] Light & Sound";
  }
});

clickZone[0].addEventListener('click', () => {
	if (audio.paused) {
  	document.getElementsByTagName("body")[0].classList.remove('css-selector');
	}
	else {
		document.getElementsByTagName("body")[0].classList.add('css-selector');
	}
});
