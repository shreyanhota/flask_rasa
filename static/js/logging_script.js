window.onload = () => {
    console.log("JavaScript is loaded and running!");
};

const track = document.getElementById("image-track");

const handleOnDown = e => {
    console.log("Mouse down / touch start detected:", e);
    track.dataset.mouseDownAt = e.touches ? e.touches[0].clientX : e.clientX;
};

const handleOnUp = () => {
    console.log("Mouse up / touch end detected");
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    console.log("Mouse move detected, new percentage:", nextPercentage);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
};

/* Event bindings with logging */
window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp();
window.ontouchend = e => handleOnUp();

window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

/*JS for sending messages to Flask and logging responses */
function sendMessage() {
    const input = document.getElementById('userInput').value;
    const chatbox = document.getElementById('chatbox');
    console.log("Sending message:", input);

    if (input) {
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.textContent = input;
        chatbox.appendChild(userMessage);

        fetch('/webhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Received response:", data);
            const botMessage = document.createElement('div');
            botMessage.className = 'bot-message';
            botMessage.textContent = data.message;
            chatbox.appendChild(botMessage);
            chatbox.scrollTop = chatbox.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
            const botMessage = document.createElement('div');
            botMessage.className = 'bot-message';
            botMessage.textContent = 'There was an error processing your request.';
            chatbox.appendChild(botMessage);
        });
    }
}
