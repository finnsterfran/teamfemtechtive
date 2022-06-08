//textElement and optionButtonsElement are the links between the buttons and text in the HTML document and this document.
const textElement = document.getElementById('text'); // Add the ID of the element you want to change
const optionButtonsElement = document.getElementById('option-buttons'); // Add the ID of the element you want to change

//----- You probably don't want to touch the following block of code -----

//state stores the state that you can set with setState in textNodes.
let state = {};

//startGame starts the game at the textNode with id 1.
function startGame() {
	state = {};
	showTextNode(1);
}

//showTextNode shows and gives functionality to the text and the buttons, and code can be added to allow styling of the buttons.
function showTextNode(textNodeIndex) {
	const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
	textElement.innerText = textNode.text;
	while (optionButtonsElement.firstChild) {
		optionButtonsElement.removeChild(optionButtonsElement.firstChild);
	}

	textNode.options.forEach((option) => {
		if (showOption(option)) {
			const button = document.createElement('button');
			button.innerText = option.text;
			//Exception; You may add a line here
			button.addEventListener('click', () => selectOption(option));
			optionButtonsElement.appendChild(button);
		}
	});
}

//showOption gives you the choices in the buttons.
function showOption(option) {
	return option.requiredState == null || option.requiredState(state);
}

//selectOption lets the button go to the assigned textNode id.
function selectOption(option) {
	const nextTextNodeId = option.nextText;
	if (nextTextNodeId <= 0) {
		return startGame();
	}
	state = Object.assign(state, option.setState);
	showTextNode(nextTextNodeId);
}

//----- You probably don't want to touch the above block of code -----

//----- This is the code block to alter -----
// textNodes lets you input the text, state(s), choices and the next textNode the choices go to.
const textNodes = [
	{
		id: 1,
		text: 'The train is almost leaving the station, you make a mad dash for it and just managed to board it.',
		options: [
			{
				text: 'Go find a seat',
				setState: { stateOne: true },
				nextText: 2
			},
			{
				text: 'Go find the toilet',
				nextText: 12
			}
		]
	},
	{
		id: 2,
		text:
			'You enter the cabin and look around for a seat. The train cabin is very full, you have to sit with some other passengers... or sit on the floor.',
		options: [
			{
				text: 'Pick a 2 seater',
				nextText: 3
			},
			{
				text: 'Pick a 4 seater',
				requiredState: (currentState) => currentState.stateOne,
				setState: { stateOne: false, stateTwo: true },
				nextText: 4
			}
		]
	},
	{
		id: 3,
		text: 'You plonk yourself down on a 2 seater. What to do now...what to do now...?',
		options: [
			{
				text: 'Read a book',
				setState: { stateOne: true },
				nextText: 5
			},
			{
				text: 'Take a nap',
				nextText: 5
			}
		]
	},
	{
		id: 4,
		text: 'You plonk yourself down on a 4 seater. What to do now...what to do now...?',
		options: [
			{
				text: 'Make chit-chat with your seat-mates',
				setState: { stateOne: true },
				nextText: 5
			},
			{
				text: 'Take a nap',
				nextText: 5
			}
		]
	},
	{
		id: 5,
		text:
			'The train enters a long and dark tunnel. Upon exiting the tunnel, the train cabin fills with light and people start screaming! What do you do?',
		options: [
			{
				text: 'Scream along?',
				setState: { stateOne: true },
				nextText: 7
			},
			{
				text: 'Ask someone what is going on',
				nextText: 6
			},
			{
				text: 'Play deaf...',
				nextText: 7
			}
		]
	},
	{
		id: 6,
		text: 'You rush forward towards the scene. A dead man is found lying in front of the train toilet door. ',
		options: [
			{
				text: 'Next',
				nextText: 8
			}
		]
	},
	{
		id: 7,
		text: 'Someone nudges you and says "Ey, is that a dead body?!',
		options: [
			{
				text: 'Next',
				nextText: 6
			}
		]
	},
	{
		id: 8,
		text:
			'The train pulls into the nearest station, and a bunch of police officers board the train. They start investigating the crime scene. When your turn to be questioned arrives, what do you say?',
		options: [
			{
				text: 'I have no idea, I was sleeping',
				nextText: 9
			},
			{
				text: 'I am in total and utter shock!',
				nextText: 9
			}
		]
	},
	{
		id: 9,
		text: '"Try to remember. We also need to check your bag." the police officer barks impatiently at you.',
		options: [
			{
				text: 'Hand over your bag',
				nextText: 10
			},
			{
				text: 'No! My precious!',
				nextText: 11
			}
		]
	},
	{
		id: 11,
		text: 'The police officers yank the bag out of your hand, glaring at you.',
		options: [
			{
				text: 'Next',
				nextText: 10
			}
		]
	},
	{
		id: 10,
		text:
			'The police officers find a picture of the victim with a target mark on their face in your bag. AHA! Evidence!',
		options: [
			{
				text: 'YOU ARE ARRESTED FOR THE MURDER!',
				nextText: 20
			}
		]
	},
	{
		id: 12,
		text: 'You go in search of the toilet... ',
		options: [
			{
				text: 'Follow the signs',
				nextText: 14
			},
			{
				text: 'Ask someone for directions',
				nextText: 13
			},
			{
				text: 'Use google maps',
				nextText: 13
			}
		]
	},
	{
		id: 13,
		text: 'Found the toilet, but the lock is jammed',
		options: [
			{
				text: 'Pee anyway',
				nextText: 15
			},
			{
				text: 'Go back to seat',
				nextText: 15
			}
		]
	},

	{
		id: 14,
		text: 'Cannot find it',
		options: [
			{
				text: 'Ask someone',
				nextText: 13
			}
		]
	},
	{
		id: 15,
		text:
			'The train enters a long and dark tunnel. Upon exiting the tunnel, the train cabin brightens and people start screaming!',
		options: [
			{
				text: 'What is going on?',
				nextText: 16
			}
		]
	},
	{
		id: 16,
		text: 'SORRY, SOMEONE KILLED YOU. YOU ARE SO DEAD.',
		options: [
			{
				text: 'Play Again?',
				nextText: 1
			}
		]
	},

	{
		id: 20,
		text:
			'Turns out that you were sent to assasinate this person, but since this was your first assignment, you completely blew it like the amateur you are... enjoy jail! I heard Orange is the new Black! THE END!',
		options: [
			{
				text: 'Play Again?',
				nextText: 1
			}
		]
	}
];
//----- This is the code block to alter -----

startGame();
