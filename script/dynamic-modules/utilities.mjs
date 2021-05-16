export function getStylesheetRules(sheetName, selectorName = null) {
	const rulesList = document.querySelector(`link[href*=${sheetName}]`).sheet
		.cssRules;
	if (selectorName) {
		for (let rule of rulesList) {
			if (rule.selectorText === selectorName) {
				return rule.style;
			}
		}
	}
	return rulesList;
}

export function getRandomIntegerTo(max) {
	return Math.floor(Math.random() * max);
}

export function getRandomNumberFromTo(min, max) {
	return Math.random() * (max - min) + min;
}
