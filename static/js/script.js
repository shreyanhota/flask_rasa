/* slide photos animation javascript on mouse down and slide */
window.onload = () => {
    console.log("JavaScript is loaded and running!");
};
const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;	
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);




/*JS for server to RASA, listens on flask's (5006) port's webhook for POST messages from RASA 5005 server (which itself listens to RASA actions server 5055) */
function sendMessage() {
            const input = document.getElementById('userInput').value;
            const chatbox = document.getElementById('chatbox');
			
			// Clear the input box after the message is stored
			document.getElementById('userInput').value = '';

            if (input) {
                const userMessage = document.createElement('div');
                userMessage.className = 'user-message';
                userMessage.textContent = input;
                chatbox.appendChild(userMessage);

                // Send the message to Flask server
                fetch('/webhook', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: input })
                })
                .then(response => response.json())
                .then(data => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'bot-message';
                    botMessage.textContent = data.message;  // The bot's response text
                    chatbox.appendChild(botMessage);

                    // Clear the input box after the message is sent
                    <!-- document.getElementById('userInput').value = ''; 
                    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
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
		
		