const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const origin = { x: 250, y: 250 };
const scale = 25; // Each unit represents 25 pixels on the canvas for the -10 to 10 range
let point = { x: 0, y: 0 }; // The initial position of the point

// Draw the initial point and axes
drawAxes();
drawPoint();

function drawAxes() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw x and y axes
    context.strokeStyle = "#bbb";
    context.lineWidth = 1;
    
    context.beginPath();
    context.moveTo(0, origin.y);
    context.lineTo(canvas.width, origin.y);
    context.moveTo(origin.x, 0);
    context.lineTo(origin.x, canvas.height);
    context.stroke();

    // Draw axis labels and stripes
    context.fillStyle = "#333";
    context.font = "10px Arial";
    
    // x-axis labels and stripes
    for (let i = -10; i <= 10; i++) {
        const xPos = origin.x + i * scale;
        
        // Draw stripes and labels
        context.beginPath();
        context.moveTo(xPos, origin.y - 5);
        context.lineTo(xPos, origin.y + 5);
        context.stroke();
        
        // Adjust label position for full visibility
        if (i !== 0) {
            context.fillText(i, xPos - 6, origin.y + 15);
        }
    }
    
    // y-axis labels and stripes
    for (let i = -10; i <= 10; i++) {
        const yPos = origin.y - i * scale;
        
        // Draw stripes and labels
        context.beginPath();
        context.moveTo(origin.x - 5, yPos);
        context.lineTo(origin.x + 5, yPos);
        context.stroke();
        
        // Adjust label position for full visibility
        if (i !== 0) {
            context.fillText(i, origin.x + 10, yPos + 3);
        }
    }
}

function drawPoint() {
    drawAxes();
    context.fillStyle = "#007bff";
    context.beginPath();
    const x = origin.x + point.x * scale; // Adjusted for -10 to 10 range
    const y = origin.y - point.y * scale;
    context.arc(x, y, 5, 0, 2 * Math.PI); // Draw the point as a circle with radius 5
    context.fill();

    // Draw the coordinates above the dot
    context.fillStyle = "#000";
    context.font = "10px Arial";
    context.fillText(`(${point.x}, ${point.y})`, x - 10, y - 10);

    // Update display to show only the point's coordinates
    updatePointCoordinates();
}

function updatePointCoordinates() {
    const coordinatesDisplay = document.getElementById("coordinates");
    coordinatesDisplay.innerHTML = `Coordinates: (${Math.round(point.x * 10) / 10}, ${Math.round(point.y * 10) / 10})`;
}

function rotatePoint(angle) {
    const radians = (Math.PI / 180) * angle;
    const x = point.x * Math.cos(radians) - point.y * Math.sin(radians);
    const y = point.x * Math.sin(radians) + point.y * Math.cos(radians);
    point = { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    drawPoint();
}

function resetPoint() {
    point = { x: 0, y: 0 }; // Reset to the initial position
    drawPoint();
}

function moveToInputCoordinates() {
    let xInput = document.getElementById("x-input").value;
    let yInput = document.getElementById("y-input").value;

    // Validate input range and set to 0 if out of bounds
    let x = parseFloat(xInput);
    let y = parseFloat(yInput);
    if (x < -10 || x > 10) {
        x = 0;
        document.getElementById("x-input").value = 0;
    }
    if (y < -10 || y > 10) {
        y = 0;
        document.getElementById("y-input").value = 0;
    }

    point = { x, y };
    drawPoint();
}

// Add event listeners for "Enter" key functionality
document.getElementById("x-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        moveToInputCoordinates();
    }
});

document.getElementById("y-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        moveToInputCoordinates();
    }
});
