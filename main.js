'use strict';
var MAX_RESULT = 20;
var TYPES_MAISONS = {
	'Hutte':14,
	'Maison sur pilotis':22,
	'Chaumière':27,
	'Chalet':32,
	'Maison':73,
	'Maisonnette':44,
	'Maison en bois':111,
	'Maison à charpente':67,
	'Maison de ville':156,
	'Maison en grès brun':94,
	'Appartement':205,
	'Propriété':123,
	'Maison de campagne':207,
	'Maison à arcade':155,
	'Maison à mansarde':259,
	'Pension':380,
	'Maison victorienne':474,
	"Maison d'ouvrier":285,
	'Logement social':680,
	'Immeuble':510,
	"Tour d'habitation":1087,
	'Motel':900,
	'Maison en préfabriqué':1380,
	'Maison de banlieue':1330,
	'Maison à deux appartements':1040,
	"Tour d'habitation en préfabriqué":2120,
	'Pavillon':1150
};
var PLURIALS = {
	'Hutte':'Huttes',
	'Maison sur pilotis':'Maisons sur pilotis',
	'Chaumière':'Chaumières',
	'Chalet':'Chalets',
	'Maison':'Maisons',
	'Maisonnette':'Maisonnettes',
	'Maison en bois':'Maisons en bois',
	'Maison à charpente':'Maisons à charpentes',
	'Maison de ville':'Maisons de ville',
	'Maison en grès brun':'Maisons en grès brun',
	'Appartement':'Appartements',
	'Propriété':'Propriétés',
	'Maison de campagne':'Maisons de campagne',
	'Maison à arcade':'Maisons à arcades',
	'Maison à mansarde':'Maisons à mansardes',
	'Pension':'Pensions',
	'Maison victorienne':'Maisons victoriennes',
	"Maison d'ouvrier":"Maisons d'ouvriers",
	'Logement social':'Logements sociaux',
	'Immeuble':'Immeubles',
	"Tour d'habitation":"Tours d'habitation",
	'Motel':'Motels',
	'Maison en préfabriqué':'Maisons en préfabriqués',
	'Maison de banlieue':'Maisons de banlieue',
	'Maison à deux appartements':'Maisons à deux appartements',
	"Tour d'habitation en préfabriqué":"Tours d'habitation en préfabriqué",
	'Pavillon':'Pavillons'

};
function Solver(target,incrementAllowed){
	var self = this;
	self.target = target;
	self.incrementAllowed = incrementAllowed;
	self.increments = {};
	self.reponses = [];
	initIncrements();

	try{
		while(1) incrementIncrements();
	} catch(e){
		if (e == 'All possibility have been tried.'){
			if(self.reponses.length) self.reponses.push("Toutes les solutions possibles ont été trouvées.");
			else self.reponses.push("Aucune solution n'est possible sans réduire préalablement votre population actuelle.");
		}
		else if (e == 'Too many possibility'){
			self.reponses.push("Seules les premières solutions ont été affichées, augmentez votre population actuelle pour réduire le nombre de possibilité.");
		}
		else throw e;
	}
	var resultNode = document.getElementById('result');
	var last = self.reponses.pop();
	if(self.reponses.length==1) resultNode.innerHTML = 'Solution trouvée :<br/>'+ self.reponses[0]+'<br/>'+last;
	if(self.reponses.length>1) resultNode.innerHTML = 'Plusieurs solutions ont été trouvées :<br/><ul><li>'+ self.reponses.join('</li><li>')+'</li></ul>'+last;
	if(!self.reponses.length) resultNode.innerHTML = last;



		function initIncrements(){
		for (var key in self.incrementAllowed) {
			self.increments[key]=0;
		}
	}
	function incrementIncrements(){
		for (var key in self.incrementAllowed) {
			self.increments[key]++;
			var sum = sumIncrements();
			if (sum==self.target) addSolution();
			if (sum<=self.target) return;
			else self.increments[key] = 0;
		}
		throw 'All possibility have been tried.';
	}
	function sumIncrements() {
		var sum = 0;
		for (var key in self.increments) {
			sum += self.incrementAllowed[key] * self.increments[key];
		}
		return sum;
	}
	function addSolution(){
		if(self.reponses.length>=MAX_RESULT) throw 'Too many possibility';
		var message = [];
		for (var key in self.incrementAllowed) {
			if (self.increments[key]>1) message.push('<strong>'+self.increments[key]+' '+PLURIALS[key]+'</strong>');
			else if (self.increments[key]==1) message.push('<strong>'+self.increments[key]+' '+key+'</strong>');
		}
		var last = message.pop();
		self.reponses.push(message.join(', ')+' et '+last);
	}
}
function solve(){
	var actualPopulation = document.getElementById('actual').value;
	var targetPopulation = document.getElementById('target').value;
	new Solver(targetPopulation-actualPopulation,TYPES_MAISONS);
}

