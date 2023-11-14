function obteneRandom() {
	var randomValue = Math.random() < 0.2 ? 40 : -40;
	return randomValue;
}

var leftValue = 400,
	topValue = 480,
	enemyleftValue = 40 + obteneRandom(),
	enemytopValue = 40 + obteneRandom(),
	enemyleftValue2 = 680 + obteneRandom(),
	enemytopValue2 = 120 + obteneRandom(),
	enemyleftValue3 = 640 + obteneRandom(),
	enemytopValue3 = 160 + obteneRandom(),
	enemyleftValue4 = 680 + obteneRandom(),
	enemytopValue4 = 200 + obteneRandom(),
	enemyleftValue5 = 520 + obteneRandom(),
	enemytopValue5 = 280 + obteneRandom(),
	enemyleftValue6 = 40 + obteneRandom(),
	enemytopValu6 = 40 + obteneRandom(),
	enemyleftValue7 = 80 + obteneRandom(),
	enemytopValue7 = 120 + obteneRandom(),
	enemyleftValue8 = 120 + obteneRandom(),
	enemytopValue8 = 160 + obteneRandom(),
	enemyleftValue9 = 280 + obteneRandom(),
	enemytopValue9 = 200 + obteneRandom(),
	enemyleftValue10 = 320 + obteneRandom(),
	enemytopValue10 = 280 + obteneRandom(),
	alienleftValue = 560 + obteneRandom(),
	alientopValue = 280 + obteneRandom(),
	alienleftValue2 = 520 + obteneRandom(),
	alientopValue2 = 80 + obteneRandom(),
	alienleftValue3 = 640 + obteneRandom(),
	alientopValue3 = 240 + obteneRandom(),
	alienleftValue4 = 160 + obteneRandom(),
	alientopValue4 = 40 + obteneRandom(),
	alienleftValue5 = 200 + obteneRandom(),
	alientopValue5 = 80 + obteneRandom(),
	alienleftValue6 = 240 + obteneRandom(),
	alientopValue6 = 120 + obteneRandom(),
	tiempo = 0,
	puntaje = 0,
	lives = localStorage.getItem('lives') || 3,
	level = localStorage.getItem('level') || 1,
	estadoDisparo = false,
	deadenemy = 0;

setInterval(function () {
	tiempo++;
	document.getElementById('time').innerHTML = tiempo;
}, 1000);

setInterval(valaMovimiento, 25);

setInterval(moveEnemies, 250);

function moveEnemies() {
	const enemyElements = document.querySelectorAll('.enemy');
	const alienElements = document.querySelectorAll('.alien');

	alienElements.forEach((alienElement) => {
		const currentLeft = parseInt(alienElement.style.left);
		const currentTop = parseInt(alienElement.style.top);

		const randomX = obteneRandom();
		const randomY = obteneRandom();
		const newLeft = currentLeft + randomX;
		const newTop = currentTop + randomY;

		if (newLeft >= 0 && newLeft <= 800 && newTop >= 0 && newTop <= 440) {
			alienElement.style.left = newLeft + 'px';
			alienElement.style.top = newTop + 'px';
		}
	});

	enemyElements.forEach((enemyElement) => {
		const currentLeft = parseInt(enemyElement.style.left);
		const currentTop = parseInt(enemyElement.style.top);

		const randomX = obteneRandom();
		const randomY = obteneRandom();
		const newLeft = currentLeft + randomX;
		const newTop = currentTop + randomY;

		if (newLeft >= 0 && newLeft <= 800 && newTop >= 0 && newTop <= 440) {
			enemyElement.style.left = newLeft + 'px';
			enemyElement.style.top = newTop + 'px';
		}
	});
}

function valaMovimiento() {
	var balas = document.getElementsByClassName('bala');
	for (var i = 0; i < balas.length; i++) {
		var bala = balas[i];
		var top = parseInt(bala.style.top);
		var left = parseInt(bala.style.left);
		if (top > 0) {
			bala.style.top = top - 10 + 'px';
			var element = document.elementFromPoint(left, top);
			if (element.classList.contains('enemy') || element.classList.contains('alien')) {
				bala.remove();
				deadenemy++;
				estadoDisparo = false;
				if (element.classList.contains('enemy')) {
					puntaje += 10;
				} else if (element.classList.contains('alien')) {
					puntaje += 20;
				}
				document.getElementById('score').innerHTML = puntaje;
				element.classList.remove(...element.classList);
				element.dataset.puntos.remove = element.dataset.puntos;
			}
		} else {
			bala.remove();
			estadoDisparo = false;
		}
	}
}

function disparar() {
	if (!estadoDisparo) {
		var bala = document.createElement('div');
		bala.className = 'bala';
		bala.style.left = leftValue + 'px';
		bala.style.top = topValue - 20 + 'px';
		document.body.appendChild(bala);

		estadoDisparo = true;
	}
}

function move(newLeftValue, newTopValue) {
	var element = document.elementFromPoint(newLeftValue, newTopValue);
	console.log(element);
	if (element.classList.contains('enemy') || element.classList.contains('alien')) {
		lives--;
		alert('Perdiste una vida por chocar con un enemigo');
		puntaje -= parseInt(element.dataset.puntos);
		element.classList.remove(...element.classList);
		element.dataset.puntos.remove = element.dataset.puntos;
		if (lives == 0) {
			alert('Te quedaste sin vidas, perdiste');
			localStorage.setItem('level', 1);
			localStorage.setItem('lives', 3);
			window.location.href = 'game.html';
		}
	}
	if (deadenemy == 10) {
		alert('Ganaste Vida Extra, por destrozar 10 enemigos');
		lives++;
		deadenemy = 0;
	}
	if (puntaje >= 200) {
		alert('Ganaste, Felicidades, pasa al siguiente nivel');
		level++;
		localStorage.setItem('level', level);
		localStorage.setItem('lives', lives);
		window.location.href = 'game.html';
	}
	element.classList.remove(...element.classList);
	leftValue = newLeftValue;
	topValue = newTopValue;
}

function update() {
	document.getElementById('player').style.left = leftValue + 'px';
	document.getElementById('player').style.top = topValue + 'px';
	document.getElementById('enemy').style.left = enemyleftValue + 'px';
	document.getElementById('enemy').style.top = enemyleftValue + 'px';
	document.getElementById('enemy2').style.left = enemyleftValue2 + 'px';
	document.getElementById('enemy2').style.top = enemytopValue2 + 'px';
	document.getElementById('enemy3').style.left = enemyleftValue3 + 'px';
	document.getElementById('enemy3').style.top = enemytopValue3 + 'px';
	document.getElementById('enemy4').style.left = enemyleftValue4 + 'px';
	document.getElementById('enemy4').style.top = enemytopValue4 + 'px';
	document.getElementById('enemy5').style.left = enemyleftValue5 + 'px';
	document.getElementById('enemy5').style.top = enemytopValue5 + 'px';
	document.getElementById('enemy6').style.left = enemyleftValue6 + 'px';
	document.getElementById('enemy6').style.top = enemytopValu6 + 'px';
	document.getElementById('enemy7').style.left = enemyleftValue7 + 'px';
	document.getElementById('enemy7').style.top = enemytopValue7 + 'px';
	document.getElementById('enemy8').style.left = enemyleftValue8 + 'px';
	document.getElementById('enemy8').style.top = enemytopValue8 + 'px';
	document.getElementById('enemy9').style.left = enemyleftValue9 + 'px';
	document.getElementById('enemy9').style.top = enemytopValue9 + 'px';
	document.getElementById('enemy10').style.left = enemyleftValue10 + 'px';
	document.getElementById('enemy10').style.top = enemytopValue10 + 'px';
	document.getElementById('alien').style.left = alienleftValue + 'px';
	document.getElementById('alien').style.top = alientopValue + 'px';
	document.getElementById('alien2').style.left = alienleftValue2 + 'px';
	document.getElementById('alien2').style.top = alientopValue2 + 'px';
	document.getElementById('alien3').style.left = alienleftValue3 + 'px';
	document.getElementById('alien3').style.top = alientopValue3 + 'px';
	document.getElementById('alien4').style.left = alienleftValue4 + 'px';
	document.getElementById('alien4').style.top = alientopValue4 + 'px';
	document.getElementById('alien5').style.left = alienleftValue5 + 'px';
	document.getElementById('alien5').style.top = alientopValue5 + 'px';
	document.getElementById('alien6').style.left = alienleftValue6 + 'px';
	document.getElementById('alien6').style.top = alientopValue6 + 'px';
	document.getElementById('score').innerHTML = puntaje;
	document.getElementById('time').innerHTML = tiempo;
	document.getElementById('deadenemy').innerHTML = deadenemy;
	document.getElementById('lives').innerHTML = lives;
	document.getElementById('level').innerHTML = level;
}

document.onkeydown = function (e) {
	var newLeftValue = leftValue,
		newTopValue = topValue;
	if (e.keyCode == 37 && leftValue > 0) {
		rotateValue = 'rotateY(180deg)';
		newLeftValue = leftValue - 40;
	} else if (e.keyCode == 39 && leftValue < 800) {
		rotateValue = 'rotateY(0deg)';
		newLeftValue = leftValue + 40;
	} else if (e.keyCode == 40 && topValue < 520) {
		rotateValue = 'rotate(90deg)';
		newTopValue = topValue + 40;
	} else if (e.keyCode == 38 && topValue > 400) {
		rotateValue = 'rotate(270deg)';
		newTopValue = topValue - 40;
	} else if (e.keyCode == 32) {
		// Tecla espacio para disparar
		disparar();
	}
	move(newLeftValue, newTopValue);
	update();
};
