'use strict';
var batiments = {
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
	'Appartements':205,
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
}
function Solver(target,incrementAllowed){
	var self = this;
	self.target = target;
	self.incrementAllowed = incrementAllowed;
	self.increments = {};
	initIncrements();

	try{
		while(1) incrementIncrements();
	} catch(e){
		if (e == 'All possibility have been tried.') console.log(e);
		else throw e;
	}


	function initIncrements(){
		for (var key in self.incrementAllowed) {
			self.increments[key]=0;
		}
	}
	function incrementIncrements(){
		for (var key in self.incrementAllowed) {
			self.increments[key]++;
			var sum = sumIncrements();
			if (sum==self.target) displaySolution();
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
	function displaySolution(){
		var message = 'Solution found : '+self.target+' =';
		for (var key in self.incrementAllowed) {
			if (self.increments[key]) message += ' '+self.increments[key]+'*'+self.incrementAllowed[key]+'('+key+')';
		}
		console.log(message);
	}
}
new Solver(6750-6715+155+207-285,batiments);