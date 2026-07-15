---
---

// Load CSV

const dataTraductions 	= {{ site.data.data_traductions 	| jsonify }};

// Find and return translation
function getTranslation (value, language) {
	return dataTraductions.find(row => Object.values(row).includes(value)) != undefined && 
			dataTraductions.find(row => Object.values(row).includes(value))[language] != null 
			? dataTraductions.find(row => Object.values(row).includes(value))[language] 
			: value;
};

// Get the Game image name
function getGameImage (gameName)
{
	switch (gameName) {
		case "Rouge":
			return "red";
		case "Bleu":
			return "blue";
		case "Jaune":
			return "yellow";
		case "Or":
			return "gold";
		case "Argent":
			return "silver";
		case "Cristal":
			return "crystal";
		case "Rubis":
			return "ruby";
		case "Saphir":
			return "sapphire";
		case "Emeraude":
		case "Emeraude (patché)":
			return "emerald";
		case "Rouge-Feu":
			return "firered";
		case "Vert-Feuille":
			return "leafgreen";
		case "Diamant":
			return "diamond";
		case "Perle":
			return "pearl";
		case "Platine":
			return "platinum";
		case "Or HeartGold":
			return "heartgold";
		case "Argent SoulSilver":
			return "soulsilver";
		case "Noire":
		case "Noir":
			return "black";
		case "Blanche":
		case "Blanc":
			return "white";
		case "Noire2":
		case "Noir2":
		case "Noire 2":
		case "Noir 2":
			return "black2";
		case "Blanche2":
		case "Blanc2":
		case "Blanche 2":
		case "Blanc 2":
			return "white2";
		case "X":
			return "x";
		case "Y":
			return "y";
		case "Rubis Omega":
		case "Rubis Oméga":
			return "omegaruby";
		case "Saphir Alpha":
			return "alphasapphire";
		case "Soleil":
			return "sun";
		case "Lune":
			return "moon";
		case "UltraSoleil":
		case "Ultra Soleil":
			return "ultrasun";
		case "UltraLune":
		case "Ultra Lune":
			return "ultramoon";
		case "Let's Go Evoli":
			return "letsgoeevee";
		case "Let's Go Pikachu":
			return "letsgopikachu";
		case "Epée":
		case "Épée":
			return "sword";
		case "Bouclier":
			return "shield";
		case "Diamant Étincelant":
			return "brilliantdiamond";
		case "Perle Scintillante":
			return "shiningpearl";
		case "Légendes : Arceus":
			return "legendsarceus";
		case "Écarlate":
		case "Ecarlate":
			return "scarlet";
		case "Violet":
			return "violet";
		case "Légendes ZA":
			return "legendsza";
		case "GO":
			return "go";
		case "Sleep":
			return "sleep";
		default:
			return gameName.toLowerCase().replace(/\s/g, '');
	}
}

// Get the Merhod image name
function getMethodImage (methodName)
{
	switch (methodName) {
		case "Aléatoire":
			return "";
		case "Rencontres":
		case "Safari des Amis":
		case "Intrusion":
			return "encounter";
		case "Resets":
		case "Soft Resets":
		case "Hard Resets":
			return "reset";
		case "Troupeau":
		case "Apparition massive de Pokémon":
			return "swarm";
		case "Oeufs":
		case "Oeufs Masuda":
			return "egg";
		case "Surf":
			return "surfing";
		case "Pêche":
		case "Canne":
		case "Méga Canne":
		case "Super Canne":
			return "fishing";
		case "Charme Chroma":
			return "shinycharm";
		case "Poké Radar Taux Plein":
		case "Poké Radar":
			return "pokeradar";
		default:
			return methodName.toLowerCase();
	}
}
