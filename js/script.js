
function initIt(){
	buttStart = document.getElementById("buttSP");			// Elems 2 modify
	timeDisplay = document.getElementById("timerDisplay");
	timeDisplayMs = document.getElementById("timerDisplayMs");
	timeDisplayLs = document.getElementById("timerDisplayLs");
	resetIt();

	setTimeout(function go() {
		setDisplay();
		setTimeout(go, 50);
	}, 50);
}

function startPauseButt() {						// 'left butt' pressed => start/pause

	if (running) {								// display => pause
			buttStart.innerHTML = "Continue";
			running = false;
			addList = 1;
	}

	else{										// display run [reset counter to 0]
		if(!timeZero) {							// reset counter
			d = new Date();
			timeZero = d.getTime()
		}
		buttStart.innerHTML = "Pause";			// run display
		running = true;
	}
}


function listIt() {
	if (running) { addList = 1; }
}

function resetIt() {							// 'stop' pressed => reset
	buttStart.innerHTML = "Start";
	running = false;
	timeZero = 0;
	timeDelta = 0;
	addList = 0;
	timeDisplayLs.innerHTML = '';
}

function setDisplay() {							// get elapsed time and set HTML

	if (!this.timeZero){
		var timeDelta = 0;						// update to 00:00:00
	}

	else if (running){
		d = new Date();							// update to current elapsed
		this.timeDelta = d.getTime() - this.timeZero;
	}

	// var timeDelta = 5591777;

	var ms;
	var secT;
	var sec;
	var minT;
	var min;
	var hourT;
	var hour;
	var dayT;
	var divider=':'

	secT = Math.floor(this.timeDelta/1000);
	ms = this.timeDelta - secT*1000;

	minT = Math.floor(secT/60);
	sec = secT - minT*60;

	hourT = Math.floor(minT/60);
	min = minT - hourT*60;

	dayT = Math.floor(hourT/24);
	hour = hourT - dayT*24;

	var timeFull = pad2(hour) + divider + pad2(min) + divider + pad2(sec);
	var timeMs = pad3(ms);

	timeDisplay.innerHTML = timeFull;
	timeDisplayMs.innerHTML = timeMs;

	if (addList) {
		this.addList = 0;
		console.log("inner:", timeDisplayLs.innerHTML);
		timeDisplayLs.innerHTML = timeDisplayLs.innerHTML + timeFull + "&nbsp;<h6>" + timeMs +"</h6><br>";
	}
}

function pad2(number) { 
	return (number < 10 ? '0' : '') + number;
}

function pad3(number) {
	number = pad2(number); 
	return (number < 100 ? '0' : '') + number;
}
/* ================================== 
			console.log("CALC DEL Zr:", timeZero, " Dl:", timeDelta);
			console.log("Zr:", timeZero, " Dl:", this.timeDelta);
	console.log(ms, sec, min, hour);
	console.log("eod:", this.timeDelta)
			console.log("Init! Zero:", timeZero, "  delta:", timeDelta);

 ================================== */
