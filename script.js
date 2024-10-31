const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const origin = { x: 250, y: 250 };
let shape = [
    { x: 100, y: 100 },
    { x: 150, y: 100 },
    { x: 150, y: 150 },
    { x: 100, y: 150 },
];

// Draw the initial shape and axes
drawAxes();
drawShape();

function drawAxes() {
    context.strokeStyle = "#bbb";
    context.beginPath();
    context.moveTo(0, origin.y);
    context.lineTo(canvas.width, origin.y);
    context.moveTo(origin.x, 0);
    context.lineTo(origin.x, canvas.height);
    context.stroke();
}

function drawShape() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    context.fillStyle = "#007bff";
    context.beginPath();
    shape.forEach((point, index) => {
        const x = origin.x + point.x;
        const y = origin.y - point.y;
        if (index === 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
    });
    context.closePath();
    context.fill();

    // Update coordinates display with only the four points of the square
    updateCoordinates();
}

function updateCoordinates() {
    const coordinatesDisplay = document.getElementById("coordinates");
    coordinatesDisplay.innerHTML = "Square Coordinates: " + shape.map(p => `(${p.x}, ${p.y})`).join(", ");
}

function rotateShape(angle) {
    const radians = (Math.PI / 180) * angle;
    shape = shape.map(point => {
        const x = point.x * Math.cos(radians) - point.y * Math.sin(radians);
        const y = point.x * Math.sin(radians) + point.y * Math.cos(radians);
        return { x: Math.round(x), y: Math.round(y) };
    });
    drawShape();
}

function resetShape() {
    shape = [
        { x: 100, y: 100 },
        { x: 150, y: 100 },
        { x: 150, y: 150 },
        { x: 100, y: 150 },
    ];
    drawShape();
}
