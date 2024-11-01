const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const origin = { x: 250, y: 250 };
const scale = 25; // Each unit represents 25 pixels on the canvas for the -10 to 10 range
let point = { x: 2.5, y: 2.5 }; // The initial position of the point

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
        
        // Label every unit on x-axis
        if (i !== 0) {
            context.fillText(i, xPos - 3, origin.y + 15);
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
        
        // Label every unit on y-axis
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
    point = { x: 2.5, y: 2.5 }; // Reset to the initial position
    drawPoint();
}
