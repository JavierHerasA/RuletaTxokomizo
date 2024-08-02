const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spin");
const result = document.getElementById("result");


class WheelOption{
	constructor(name, color, emoji){
		this.name = name;
		this.color = color;
		this.emoji = emoji;
	}
}

const options = [
			{name: "Chupito", emoji: "😀", color: "#36A2EB"},
			{name: "Beso",emoji: "😘", color:"#36A2EB"},
			{name: "Torta",emoji: "✋", color: "#36A2EB"},
			{name:"Prueba otra vez", emoji: "🔄", color:"#36A2EB"}
];

let startAngle = 0;
const arcSize = (2 * Math.PI) / options.length;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function drawWheel() {
    for (let i = 0; i < options.length; i++) {
		const currentOption = options[i];
		
        const angle = startAngle + i * arcSize;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 200, angle, angle + arcSize);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = currentOption.color;
        ctx.fill();
        ctx.stroke();
        ctx.save();

		ctx.font = "22px Arial";
		ctx.fillStyle = "#000";
        ctx.translate(centerX + Math.cos(angle + arcSize / 2) * 150, centerY + Math.sin(angle + arcSize / 2) * 150);
        ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
        ctx.fillText(currentOption.name, -ctx.measureText(currentOption.name).width / 2, 15);
		
		ctx.font = "40px Arial"; // Tamaño de la fuente ajustado para los puntos
        ctx.fillText(options[i].emoji, -ctx.measureText(options[i].emoji).width / 2, 70); // Ajusta la posición del texto de los puntos

		
        ctx.restore();
    }
}

function rotateWheel() {
    const duration = 3000; // Duración del giro en ms
    const rotation = Math.random() * 360 + 720; // Rotación aleatoria + 2 vueltas completas
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const currentRotation = easeOutCubic(progress, 0, rotation, duration);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startAngle = (currentRotation * Math.PI) / 180;
        drawWheel();
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            showResult(currentRotation % 360);
        }
    }

    requestAnimationFrame(animate);
}

function easeOutCubic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
}

function showResult(angle) {
    const index = Math.floor((angle / 360) * options.length) % options.length;
    result.textContent = `Resultado: ${options[options.length - index - 1].name}`;
}

spinButton.addEventListener("click", rotateWheel);
drawWheel();




