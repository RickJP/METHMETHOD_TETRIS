const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local');

const connectionManager = new ConnectionManager(tetrisManager);
connectionManager.connect('ws://localhost:9000');

const matrix = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0],
];

function playClearSound() {
	var sound = new Howl({
  	src: ['audio/clear.mp3']
});
sound.play();
}

const keyListener = (event) => 
{
	[
		[65, 68, 81, 69, 83 ],
		[72, 75, 89, 73, 74 ],
	].forEach((key, index) => {
		const player = localTetris.player;

		if (event.type === 'keydown') {
			if (event.keyCode === key[0]) { 
			player.move(-1);
			} else if(event.keyCode === key[1]) {  
				player.move(1);
			} else if(event.keyCode === key[2]) {  
				player.rotate(-1); 
			} else if (event.keyCode === key[3]) { 
				player.rotate(1);
			}
		}
		if (event.keyCode === key[4]) { 
			if ((event.type === 'keydown') && (player.dropInterval !== player.DROP_FAST)) {
				player.drop();
				player.dropInterval = player.DROP_FAST;
			} else {
				player.dropInterval = player.DROP_SLOW;
			}
			
		}
	});	
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);






