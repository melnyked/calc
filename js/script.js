var btn = document.getElementById("btn")
	, out = document.getElementById("out")
	;

	btn.onclick = calc;

function calc () {	
	var   oneTarCounter = document.getElementById("oneTarCounter")
		, twoTarCounter = document.getElementById("twoTarCounter")
		, threeTarCounter = document.getElementById("threeTarCounter")

		, section = document.getElementsByClassName("section")

		, currentOneTariff = document.getElementById("currentOneTariff")
		, earlierOneTariff = document.getElementById("earlierOneTariff")

		, currentTwoTariffDay = document.getElementById("currentTwoTariffDay")
		, earlierTwoTariffDay = document.getElementById("earlierTwoTariffDay")
		, currentTwoTariffNight = document.getElementById("currentTwoTariffNight")
		, earlierTwoTariffNight = document.getElementById("earlierTwoTariffNight")

		, currentThreeTariffPeack = document.getElementById("currentThreeTariffPeack")
		, earlierThreeTariffPeack = document.getElementById("earlierThreeTariffPeack")
		, currentThreeTariffhalf = document.getElementById("currentThreeTariffhalf")
		, earlierThreeTariffhalf = document.getElementById("earlierThreeTariffhalf")
		, currentThreeTariffNight = document.getElementById("currentThreeTariffNight")
		, earlierThreeTariffNight = document.getElementById("earlierThreeTariffNight")

		, totalConsumption 				//Загальне споживання
		, levelСonsumption = [100, 600] //Границі рівнів споживання
		, tariff = [0.714, 1.29, 1.638] //Діючі тарифи для трьох рівнів
		, y1							//Споживання 1 рівня
		, y2							//Споживання 2 рівня
		, y3							//Споживання 3 рівня
		, nightСonsumption				//Споживання вночі
		, dayСonsumption				//Споживання вдень
		, peackConsumption
		, halfConsumption
		, coeffReduceCost				//Коефіцієнт здешевлення вартості
		, totalCost						//Загальна вартість електроенергії
		;


	if (oneTarCounter.value == "oneTarCounter") { // Тут щось не пряцює
		section[1].style.display = "none";
		section[2].style.display = "none";
		totalConsumption = +currentOneTariff.value - +earlierOneTariff.value;
		coeffReduceCost = 1;

	} else if (twoTarCounter.value == "twoTarCounter") {
		section[0].style.display = "none";
		section[2].style.display = "none";

		dayСonsumption = (+currentTwoTariffDay.value - +earlierTwoTariffDay.value);
		nightСonsumption = (+currentTwoTariffNight.value - +earlierTwoTariffNight.value);

		totalConsumption = dayСonsumption + nightСonsumption;
		coeffReduceCost = (+nightСonsumption * 0.5 + +dayСonsumption * 1) / totalConsumption;

	} else if (threeTarCounter.value == "threeTarCounter") {
		section[0].style.display = "none";
		section[1].style.display = "none";

		peackConsumption = (+currentThreeTariffPeack - +earlierThreeTariffPeack);
		halfConsumption = (+currentThreeTariffhalf - +earlierThreeTariffhalf);
		nightСonsumption = (+currentThreeTariffNight.value - +earlierThreeTariffNight.value);

		totalConsumption = peackConsumption + halfConsumption + nightСonsumption;
		coeffReduceCost = (nightСonsumption * 0.4 + halfConsumption * 1 +peackConsumption * 1.5) / totalConsumption;
	}


	if (totalConsumption - levelСonsumption[1] > 0){
		y3 = totalConsumption - levelСonsumption[1];
		y2 = levelСonsumption[1]-levelСonsumption[0];
		y1 = levelСonsumption[0];
	} else if(totalConsumption - levelСonsumption[0] > 0){
		y3 = 0;
		y2 = totalConsumption - levelСonsumption[0];
		y1 = levelСonsumption[0];
	} else {
		y3 = 0;
		y2 = 0;
		y1 = totalConsumption;
	}

	i1 = coeffReduceCost*y1*tariff[0];

	i2 = coeffReduceCost*y2*tariff[1];

	i3 = coeffReduceCost*y3*tariff[2];

	totalCost = i1 + i2 + i3;

	out.innerHTML = "Ваше загальне споживання "+totalConsumption + "кВт*г." +"<br>"+ "Загальна вартість за споживану електроенергію складає: " + totalCost.toFixed(2) + "грн."
}
