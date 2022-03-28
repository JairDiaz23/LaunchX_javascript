
const fetchPokemon = () => {
	const pokeName = document.getElementById("pokeName");
	const name = pokeName.value;
	const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

	 fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("../Content/img/pokemonwho.jpg")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.front_default;
            const namepoke = document.getElementById("namepokemon");
            namepoke.innerHTML = data.name;
            pokeTypes(data.types);
            setStats(data.stats);
            setSkill(data.abilities);
        }
    });
}


const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeimg");
    pokePhoto.src = url;
}

const pokeTypes = (data) =>{
	const typepoke = document.getElementById("types");
	typepoke.innerHTML ='Tipo:';
	let types=" ";
	for(type of data){
		console.log(type);
		console.log(type.type.name);
		types += " "  + type.type.name;
	}
	typepoke.innerHTML +=types;
}

const setSkill = (skills) => {
    for (skill of skills) {
        var item = document.createElement('span');
        item.innerText = skill.ability.name;
        item.classList.add('skill-box');
        document.getElementById("skills").appendChild(item);
    }
}

const setStats = (stats) => {
    const statName = [];
    const statValue = [];
    for (stat of stats) {
        statName.push(stat.stat.name);
        statValue.push(stat.base_stat);
    }
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: statName,
            datasets: [{
                label: 'Points',
                data: statValue,
                borderWidth: 1,
                backgroundColor: '#FFCC02',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}







