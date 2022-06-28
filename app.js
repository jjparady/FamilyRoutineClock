
// ############################################################

// Data

const routine = {
	sundays: [["Breakfast", "7:00", "7:30", "red"],
		["Tidy", "7:30", "8:30", "green"],
		["Play Outside", "8:30", "9:30", "orange"],
		["Penn Bed", "9:30", "10:00", "#f148d6"],
		["School", "10:00", "11:30", "teal"],
		["Lunch", "11:30", "12:30", "red"],
		["Get Ready","12:30","13:30","green"],
		["Church", "13:30", "15:30", "grey"],
		["Independent Play", "15:30", "17:00", "blue"],
		["Dinner", "17:00", "18:00", "red"],
		["Family Play", "18:00", "18:30", "blue"],
		["Penn Bed", "18:30", "19:00", "#f148d6"],
		["Pete Play", "19:00", "19:30", "blue"],
		["Pete Bed", "19:30", "20:00", "#154c79"],
		["No Kids Time", "20:00", "22:30", "purple"],
		["Sleep", "22:30", "07:00", "black"]
	],
	mondays: [],
	tuesdays: [],
	wednesdays: [],
	thursdays: [],
	fridays: [],
	saturdays: [["Breakfast", "7:00", "7:30", "red"],
		["Tidy", "7:30", "8:30", "green"],
		["Play Outside", "8:30", "9:30", "orange"],
		["Penn Bed", "9:30", "10:00", "#f148d6"],
		["School", "10:00", "11:30", "teal"],
		["Lunch", "11:30", "12:30", "red"],
		["Errands", "12:30", "14:00", "grey"],
		["Penn Bed", "14:00", "14:30", "#f148d6"],
		["Independent Play", "14:30", "17:00", "blue"],
		["Dinner", "17:00", "18:00", "red"],
		["Family Play", "18:00", "18:30", "blue"],
		["Penn Bed", "18:30", "19:00", "#f148d6"],
		["Pete Play", "19:00", "19:30", "blue"],
		["Pete Bed", "19:30", "20:00", "#154c79"],
		["No Kids Time", "20:00", "22:30", "purple"],
		["Sleep", "22:30", "07:00", "black"]
		],
	everyday: [],
	weekends: [],
	weekdays: [
		["Breakfast", "7:00", "7:30", "red"],
		["Tidy", "7:30", "8:30", "green"],
		["Independent Play", "8:30", "9:30", "blue"],
		["Penn Bed", "9:30", "10:00", "#f148d6"],
		["School", "10:00", "11:30", "teal"],
		["Lunch", "11:30", "12:30", "red"],
		["Errands", "12:30", "14:00", "grey"],
		["Penn Bed", "14:00", "14:30", "#f148d6"],
		["Play Outside", "14:30", "16:00", "orange"],
		["Independent Play", "16:00", "17:00", "blue"],
		["Dinner", "17:00", "18:00", "red"],
		["Family Play", "18:00", "18:30", "blue"],
		["Penn Bed", "18:30", "19:00", "#f148d6"],
		["Pete Play", "19:00", "19:30", "blue"],
		["Pete Bed", "19:30", "20:00", "#154c79"],
		["No Kids Time", "20:00", "22:30", "purple"],
		["Sleep", "22:30", "07:00", "black"],
	]
};

const sun = {
	sunrise: "5:30",
	sunset: "18:50"
};

// ############################################################
/* SVG Arc */
// Draw arcs

function timeToAngle(time) {
	const hrMin = time.split(":");
	const hourAngle = (hrMin[0] / 24) * 360 - 180;
	const minutesAngle = ((360 / 24) * hrMin[1]) / 60;
	return hourAngle + minutesAngle;
}

// console.log(timeToAngle("18:00"));

for (let i = 0; i < routine.everyday.length; i++) {
	const label = routine.everyday[i][0];
	const startAngle = timeToAngle(routine.everyday[i][1]);
	const endAngle = timeToAngle(routine.everyday[i][2]);
	const color = routine.everyday[i][3];

	// console.log(label, startAngle, endAngle, color);
}

const arrayToDraw = [];

arrayToDraw.push(routine["everyday"]);

let day = "";

today = new Date().getDay();

switch (today) {
	case 0:
		day = "sundays";
		break;
	case 1:
		day = "mondays";
		break;
	case 2:
		day = "tuesdays";
		break;
	case 3:
		day = "wednesdays";
		break;
	case 4:
		day = "thursdays";
		break;
	case 5:
		day = "fridays";
		break;
	case 6:
		day = "saturdays";
		break;
}

for (let key of Object.keys(routine)) {
	if (routine[key].length !== 0 && key === day) {
		arrayToDraw.push(routine[key]);
	}

	if (routine["weekdays"].length !== 0 && key === day) {
		if (
			today === 1 ||
			today === 2 ||
			today === 3 ||
			today === 4 ||
			today === 5
		) {
			arrayToDraw.push(routine["weekdays"]);
		}
	}

	if (routine["weekends"].length !== 0 && key === day) {
		if (today === 0 || today === 6) {
			arrayToDraw.push(routine["weekends"]);
		}
	}
}

let toPlot = [];

for (let i = 0; i < arrayToDraw.length; i++) {
	toPlot = toPlot.concat(arrayToDraw[i]);
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians)
	};
}

const arcProp = {
	cx: 200, // <-- center x
	cy: 200, // <-- center y
	radius: 180 // <-- circle radius
};

// arc = {
// 	start_angle: 15, // <-- start angle in degrees
// 	end_angle: 90 // <-- end angle in degrees
// };

document
	.getElementById("svg")
	.removeChild(document.getElementById("svg").childNodes[3]);

function appendG() {
	document
		.getElementById("svg")
		.removeChild(document.getElementById("svg").childNodes[3]);

	const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

	for (let i = 0; i < toPlot.length; i++) {
		const label = toPlot[i][0];
		const startAngle = timeToAngle(toPlot[i][1]);
		const endAngle = timeToAngle(toPlot[i][2]);
		const color = toPlot[i][3];

		const start = polarToCartesian(
			arcProp.cx,
			arcProp.cy,
			arcProp.radius,
			startAngle
		);
		const end = polarToCartesian(
			arcProp.cx,
			arcProp.cy,
			arcProp.radius,
			endAngle
		);

		largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

		let d = [
			"M",
			start.x,
			start.y,
			"A",
			arcProp.radius,
			arcProp.radius,
			0,
			largeArcFlag,
			1,
			end.x,
			end.y
		].join(" ");

		// console.log(label, startAngle, endAngle, color);

		const path = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"path"
		);
		const text = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"text"
		);
		const textPath = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"textPath"
		);
		const tspan = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"tspan"
		);

		textPath.setAttributeNS(
			"http://www.w3.org/1999/xlink",
			"xlink:href",
			`#arc${i}`
		);
		textPath.setAttribute("fill", color);
		tspanText = document.createTextNode(label);
		tspan.appendChild(tspanText);
		textPath.appendChild(tspan);
		text.appendChild(textPath);

		path.setAttribute("id", `arc${i}`);
		path.setAttribute("stroke", color);
		path.setAttribute("d", d);

		g.appendChild(path);
		g.appendChild(text);

		// document.getElementById("arc1").setAttribute("d", d);
	}

	document.getElementById("svg").appendChild(g);
}

setInterval(appendG, 1800000);

appendG();

// ############################################################
/* Digital and Hand */

// console.log(toPlot);

const sortedToPlot = toPlot.sort((a, b) => {
	return timeToAngle(a[1]) > timeToAngle(b[1]) ? 1 : -1;
});

console.log(sortedToPlot);

const hand = document.querySelector(".hand");
const digital = document.querySelector(".digital");
const time = document.querySelector(".time");
const meridiem = document.querySelector(".meridiem");
const task = document.querySelector(".task");

function setDigital() {
	const now = new Date();
	const hour = now.getHours();
	const minutes = now.getMinutes();
	const minFull = minutes => (minutes < 10 ? `0${minutes}` : minutes);
	const shortHour = hour => (hour > 12 ? hour - 12 : hour === 0 ? 12 : hour);
	const handDegrees = (360 / 24) * hour + 180 + (360 / 1440) * minutes;
	hand.style.transform = `rotate(${handDegrees}deg)`;

	let currentTask = "";
	let taskColor = "";
	let stop = 0;

	for (let i = 0; i < sortedToPlot.length; i++) {
		if (
			timeToAngle(sortedToPlot[i][1]) <=
				timeToAngle(`${hour}:${minFull(minutes)}`)  /* &&
			timeToAngle(`${hour}:${minFull(minutes)}`) - 180 <
				timeToAngle(sortedToPlot[i][2]) */ &&
			stop !== 1
		) {
			currentTask = sortedToPlot[i][0];
			taskColor = sortedToPlot[i][3];
		} else {
			stop = 1;
		}
	}

	digital.innerHTML = "";
	const time = document.createElement("div");
	time.innerHTML = `
		<div class="time">
			${shortHour(hour)}<span class="separator">:</span>${minFull(minutes)}<span class="meridiem"> ${
		hour >= 12 ? "PM" : "AM"
	}</span>
		</div>
 		<div class="task" style="color:${taskColor}">${currentTask} <br> <img src="${currentTask}.png" class="sprite"></div> 
	`; // TODO
	digital.appendChild(time);

	// console.log(`${hour}:${minutes}`);
}

setInterval(setDigital, 1000);

setDigital();

// ############################################################
/* Calendar */
// From here: https://www.cssscript.com/filterable-calendar-vanilla/

let myCalendar = new VanillaCalendar({
	selector: "#myCalendar",
	pastDates: true,
	shortWeekday: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
});
