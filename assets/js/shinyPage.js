---
---

// Load CSV
const dataShiny 		= {{ site.data.sh_shiny 			| jsonify }};
const dataPokemon		= {{ site.data.data_localisations 	| jsonify }};
const dataEquipes		= {{ site.data.game_equipes			| jsonify }};

// Language Gestion
const language_code		= window.pageData.language;
var language			= "Anglais";
if (language_code == "fr") { language = "Français"; }

////////////////////////////////////
//  M A I N     F U N C T I O N S //
////////////////////////////////////

// Show the list of Shiny Pokémon
function showList() {
	document.getElementById("pokemonPage")	.style.display = 'none';  
	document.getElementById("shinyList")	.style.display = 'block';  
};

// Show the Shiny Pokémon
function showPokemon(pokemonNumber)
{
	// Hide the list, show the Pokémon Page
	document.getElementById("shinyList")	.style.display = 'none';  
	document.getElementById("pokemonPage")	.style.display = 'block'; 

	// Get data of Pokémon
	const shiny 	= dataShiny.find( p => p.Compte == pokemonNumber );
	const dresseur	= dataEquipes.find(p => p.ID == shiny["ID"]) != undefined ? dataEquipes.find(p => p.ID == shiny["ID"]) : "";
			
	// A Shiny Was Found!
	if (shiny) {
		// Writting the data of the Pokémon
		document.getElementById("p_spot")		.src				= "/assets/images/spots/spot_s_" + shiny.Compte + ".png";
		document.getElementById("p_shinyCount")	.textContent 		= parseInt(shiny.Compte,10);
		document.getElementById("p_number")		.textContent 		= shiny["Numéro"];
		document.getElementById("p_name")		.textContent		= shiny.Nom;
		document.getElementById("p_tale")		.textContent		= shiny["Récit - " + language];
		document.getElementById("p_game")		.textContent		= getTranslation(shiny["Jeu"]		, language);
		document.getElementById("p_specie")		.textContent		= getTranslation(shiny["Pokémon"]	, language);
		fillIfExist("", 					"p_form", 			"t_form");
		fillIfExist(shiny["Début"], 		"p_startDate", 		"t_startDate");
		fillIfExist(shiny.Nombre, 			"p_count", 			"t_count");
		fillIfExist(shiny["Nombre Depuis Dernier"], 			"p_countlast", 		"t_countlast");
		fillIfExist(shiny.Date, 			"p_date", 			"t_date");
		fillIfExist(shiny.Niveau, 			"p_level", 			"t_level");
		fillIfExist(shiny.Taille,	 		"p_height", 		"t_height");
		fillIfExist(shiny.Poids,	 		"p_weight", 		"t_weight");
		fillIfExist(shiny.IVs,		 		"p_ivs", 			"t_ivs");
		fillIfExist(shiny.ID,		 		"p_id", 			"t_id");
		fillIfExist(dresseur.Dresseur,		"p_ot", 			"t_ot");
		fillTarget(shiny.Cible);
		fillIfExistWithLink(shiny.Référence, shiny["Lien Référence - " + language] ? shiny["Lien Référence - " + language] : shiny["Lien Référence - Anglais"], "p_reference", "t_reference");
		fillAndTranslateIfExist(shiny["Lieu"], 				"p_place", 			"t_place", 		language);
		fillAndTranslateIfExist(shiny["Ball"], 				"p_ball", 			"t_ball", 		language);
		fillAndTranslateIfExist(shiny["Genre"], 			"p_gender", 		"t_gender", 	language);
		fillAndTranslateIfExist(shiny["Nature"], 			"p_nature", 		"t_nature", 	language);
		fillAndTranslateIfExist(shiny["Talent"], 			"p_ability", 		"t_ability", 	language);
		fillAndTranslateIfExist(shiny["Caractéristique"], 	"p_chara", 			"t_chara", 		language);
		fillAndTranslateIfExist(shiny["Forme"], 			"p_form", 			"t_form", 		language);
		fillAndTranslateIfExist(shiny["Spécificité"], 		"p_specificity", 	"t_specificity",language);
		fillInfluence(shiny["Influence"],  	language);
		fillIntermediaries(shiny["Intermédiaire"]);
		fillAndTranslateIfExist(shiny["Objet"], 			"p_item", 			"t_item", 		language);
		fillAndTranslateMultiIfExistWithImages(shiny["Méthode"], 			"p_method", 		"t_method",		"p_method_img", language);
		// Write the color
		document.querySelectorAll(".color").forEach(el => { el.style.color = shiny.Couleur; });
		// Write images
		if (shiny.Ball) { document.getElementById("p_ball_img").src= "/assets/images/items/ball_" + getTranslation(shiny.Ball, "Anglais").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ".png"; }
		if (shiny.Objet) { document.getElementById("p_item_img").src= "/assets/images/items/item_" + getTranslation(shiny.Objet, "Anglais").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '') + ".png"; }
		document.getElementById("p_game_img").src= "/assets/images/games/" + getGameImage(shiny.Jeu) + ".png";
				
		// Filter photos
		const images = document.querySelectorAll(".photos");
		images.forEach(img => {
			const name = img.dataset.name.toLowerCase();
			if (name.includes(pokemonNumber))
				img.style.display = "flex";
			else
				img.style.display = "none";
		});
			
		// Navigation
		const index = dataShiny.findIndex(p => p.Compte == pokemonNumber );
		const prev = dataShiny[index - 1];
		const next = dataShiny[index + 1];
		const prevLink = document.getElementById("prevLink");
		const nextLink = document.getElementById("nextLink");

		if (prev) {
			prevLink.style.display = "flex";
			prevLink.href = "#" + prev.Compte;
			prevLink.textContent = "« " + prev.Nom;
		} else
			prevLink.style.display = "none";

		if (next) {
			nextLink.style.display = "flex";
			nextLink.href = "#" + next.Compte;
			nextLink.textContent = next.Nom + " »";
		} else
			nextLink.style.display = "none";
		return;
	}
	else {
		showList();
		return;
	}
};

// Load the Shiny Page
function loadShinyPage() {
	const pokemonNumber = window.location.hash.substring(1);
	
	window.scrollTo(0, 0); // Return to top of the page
	
	if (!pokemonNumber) {
		showList();
		return;
	}
	else
	{
		showPokemon(pokemonNumber);
		return;
	}
};

// Page Event Listeners
window.addEventListener("hashchange", loadShinyPage);
window.addEventListener("DOMContentLoaded", loadShinyPage);

////////////////////////////////////////
// U T I L I T Y    F U N C T I O N S //
////////////////////////////////////////

// Image Viewer
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");

document.querySelectorAll(".clickable-img").forEach(img => {
	img.addEventListener("click", () => {
		modal.style.display = "flex";
		modalImg.src = img.src;
	});
});

document.querySelector(".close").addEventListener("click", () => {
	modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
	if (e.target === modal) {
		modal.style.display = "none";
	}
});

// Target
function fillTarget(targetValue) {
	if (targetValue != null && targetValue != "")
	{
		document.getElementById("t_target").style.display = '';
		
		if (targetValue == "Oui")
			document.getElementById("p_target").textContent = dataTraductions.find(row => Object.values(row).includes("Oui"))[language];
		else
		{
			const pokemonList = targetValue.split(",");
			var innerHtml = "";
			if (pokemonList.length == 1)
			{
			
				if (targetValue.includes("♂"))
				{
					var values = targetValue.split(" ♂");
					var pokemonName = dataTraductions.find(row => Object.values(row).includes(values[0]))[language];
					var pokemonNameFr = dataTraductions.find(row => Object.values(row).includes(values[0]))["Français"];
					const pokemonFromCsv = dataPokemon.find(p => p["Pokémon"] == pokemonName);
					innerHtml = pokemonName.concat(" ♂", " <img src='/assets/images/minis/mini_", pokemonFromCsv["Numéro"], ".png'/>");
				}
				else
				{
					var pokemonName = getTranslation(targetValue, language)
					const pokemonFromCsv = dataPokemon.find(p => p["Pokémon"] == targetValue);
					if (pokemonFromCsv != null)
						innerHtml = pokemonName.concat(" <img src='/assets/images/minis/mini_", pokemonFromCsv["Numéro"], ".png'/>");
					else
						innerHtml = findShiny(targetValue, true);
				}
			}
			else
			{
				for (const pokemon of pokemonList) {
					if (pokemon.trim() != "Mâle" && pokemon.trim() != "Femelle")
					{
						const pokemonFromCsv = dataPokemon.find(p => p["Pokémon"] == pokemon.trim().replace(/ /g,''));
						if (innerHtml == "")
							innerHtml = getTranslation(pokemon.trim(), language) + " <img src='/assets/images/minis/mini_" + pokemonFromCsv["Numéro"] + ".png'/>";
						else
							innerHtml = innerHtml + ", " + getTranslation(pokemon.trim(), language) + " <img src='/assets/images/minis/mini_" + pokemonFromCsv["Numéro"] + ".png'/>";
					}
					else
						innerHtml = innerHtml + getTranslation(pokemon.trim(), language);
				}
			}
			document.getElementById("p_target").innerHTML = innerHtml;
		}
	}
	else
		document.getElementById("t_target").style.display = 'none';
}

// Intermediaries
function fillIntermediaries(interValue) {
	if (interValue != null && interValue != "")
	{
		const pokemonList = interValue.split(",");
		var completeInter = "";
		
		for (const pokemon of pokemonList) {
			if (completeInter == "")
				completeInter = findShiny(pokemon.trim(), true);
			else
				completeInter = completeInter + ", " + findShiny(pokemon.trim(), true);
		}
		
		document.getElementById("p_intermediaries").innerHTML = completeInter;
		document.getElementById("t_intermediaries").style.display = '';
	}
	else
		document.getElementById("t_intermediaries").style.display = 'none';
}
	
// Influence
function fillInfluence(valueInfluence, language) {
	if (valueInfluence) {
		const influences = valueInfluence.split(",");
		var completeInfluences = ""
		if (influences.length == 1)
			completeInfluences = getTranslation(valueInfluence, language); 
		else {
			if (influences[0] == "Joli Sourire")
			{
				var pour = "";
				if (language == "Anglais") pour = "for";
				if (language == "Français") pour = "pour";
				completeInfluences = getTranslation(influences[0].trim(), language) + " " + pour + " " + getTranslation(influences[1].trim(), language);
			}
			if (influences[0] == "Rappel")
			{
				var niveau = "";
				if (language == "Anglais") niveau = "level";
				if (language == "Français") niveau = "niveau";
				completeInfluences = getTranslation(influences[0].trim(), language) + " " + niveau + " " + influences[1].trim();
			}
		}
			
		
		document.getElementById("p_influence").textContent = completeInfluences;
		document.getElementById("t_influence").style.display='';
	} else
		document.getElementById("t_influence").style.display='none';
}
	
// Take the name of a shiny and return the link with or without a mini icon
function findShiny(shinyName, withMini) { 
	const wantedShiny = shinyData.find(p => p.name == shinyName);
	if (wantedShiny == undefined)
		return shinyName;
	else
	{
	var returnValue = "<a href='/shiny/#"+ wantedShiny.shinyCount+"'>"+ wantedShiny.name +"</a>";
	if (withMini == true)
		if (wantedShiny.pokemonForm)
			returnValue +=" <img src='/assets/images/minis/mini_"+ wantedShiny.pokemonNumber+"_"+ wantedShiny.pokemonForm.toLowerCase()+".png'/>";
		else
			returnValue +=" <img src='/assets/images/minis/mini_"+ wantedShiny.pokemonNumber+".png'/>";
	return returnValue;		
	}
}
  
 // Functions to fill the values
 // - Une valeur
function fillIfExist(valueToUse, spanToFill, divToHide) {
	if (valueToUse) {
		document.getElementById(spanToFill).textContent=valueToUse;
		document.getElementById(divToHide).style.display='';
	} else
		document.getElementById(divToHide).style.display='none';
}

function fillIfExistWithLink(valueToUse, linkToUse, spanToFill, divToHide) {
	if (valueToUse) {
		if (linkToUse != "" && linkToUse != null)
			document.getElementById(spanToFill).innerHTML= "<a href='" + linkToUse + "'>" + valueToUse + "</a>";
		else
			document.getElementById(spanToFill).textContent=valueToUse;
		document.getElementById(divToHide).style.display='';
	} else
		document.getElementById(divToHide).style.display='none';
}
	
function fillAndTranslateIfExist(valueToUse, spanToFill, divToHide, language) {
	if (valueToUse) {
		document.getElementById(spanToFill).textContent= getTranslation(valueToUse, language);
		document.getElementById(divToHide).style.display='';
	} else
		document.getElementById(divToHide).style.display='none';
}

// - Plusieurs valeurs		
function fillMultiIfExist(valueToUse, spanToFill, divToHide) {
	if (valueToUse) {
		var completeValue = "";
		const values = valueToUse.split(",");
		values.forEach(value => { 
			if (completeValue == "")
				completeValue = value;
			else
				completeValue = completeValue + ", " + value;
		});
		document.getElementById(spanToFill).textContent=completeValue;
		document.getElementById(divToHide).style.display='';
	} else
		document.getElementById(divToHide).style.display='none';
}
	
function fillAndTranslateMultiIfExist(valueToUse, spanToFill, divToHide, language) {
	if (valueToUse) {
		var completeValue = "";
		const values = valueToUse.split(",");
		values.forEach(value => { 
			if (completeValue == "")
				completeValue = getTranslation(value.trim(), language);
			else
				completeValue = completeValue + ", " + getTranslation(value.trim(), language);
		});
		document.getElementById(spanToFill).textContent=completeValue;
		document.getElementById(divToHide).style.display='';
	} else
		document.getElementById(divToHide).style.display='none';
}
	
function fillAndTranslateMultiIfExistWithImages(valueToUse, spanToFill, divToHide, imagesToFill, language) {
	if (valueToUse) {
		var completeValue = "";
		var completeImages = "";
		const values = valueToUse.split(",");
		values.forEach(value => { 
			if (completeValue == "")
				completeValue = getTranslation(value.trim(), language);
			else
				completeValue = completeValue + ", " + getTranslation(value.trim(), language);
			if (imagesToFill == "p_method_img" && getMethodImage(value.trim()) != "")
				completeImages = completeImages + "<img src='/assets/images/methods/method_" + getMethodImage(value.trim()) + ".png'/>";
		});
		document.getElementById(spanToFill).textContent=completeValue;
		document.getElementById(divToHide).style.display='';
		document.getElementById(imagesToFill).innerHTML = completeImages;
	} else
		document.getElementById(divToHide).style.display='none';
}