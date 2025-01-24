// Function to handle the image upload and convert to base64
function encodeImageToBase64(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);  // Extract base64 part of the result
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);  // Convert the image to base64 format
    });
}

// Function to send the base64 encoded image to the API Gateway
async function sendImage() {
    const imageInput = document.getElementById("imageInput");
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        alert("Please select an image first.");
        return;
    }

    try {
        // Convert image to base64
        const base64Image = await encodeImageToBase64(imageFile);

        // Prepare the API request body
        const requestBody = {
            "image": base64Image
        };

        // Make the API call to the API Gateway
        const response = await fetch("https://z9a3wwpusl.execute-api.us-east-1.amazonaws.com/dev/celebrityrecognition", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json(); // Parse the JSON response

        // Handle the response and display results
        if (response.ok) {
            // Parse the body as a JSON object (since it's a string inside the "body" key)
            const responseBody = JSON.parse(data.body);

            displayResults(responseBody); // Pass the parsed response to display function
        } else {
            alert("Error: " + (data.error || "Something went wrong."));
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Function to display the results from the API
function displayResults(data) {
    const celebritiesDiv = document.getElementById("celebrities");
    const emotionsDiv = document.getElementById("emotions");
    const resultDiv = document.getElementById("result");

    celebritiesDiv.innerHTML = '<h3>🌟 Celebrities:</h3>';
    emotionsDiv.innerHTML = '<h3>😄 Emotions:</h3>';

    if (data.Celebrities && data.Celebrities.length > 0) {
        data.Celebrities.forEach(celebrity => {
            celebritiesDiv.innerHTML += `<p><strong>${celebrity.Name}</strong> (Label: ${celebrity.Label})</p>`;
        });
    } else {
        celebritiesDiv.innerHTML += "<p>No celebrities detected. Try again!</p>";
    }

    if (data.Emotions && data.Emotions.length > 0) {
        data.Emotions.forEach(face => {
            emotionsDiv.innerHTML += "<ul>";
            face.Emotions.forEach(emotion => {
                emotionsDiv.innerHTML += `<li>${emotion.Type}: ${emotion.Confidence.toFixed(2)}%</li>`;
            });
            emotionsDiv.innerHTML += "</ul>";
        });
    } else {
        emotionsDiv.innerHTML += "<p>No emotions detected. Try again!</p>";
    }

    resultDiv.style.display = 'block'; // Show the result section
}
