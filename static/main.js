// static/main.js
function generateRandomNumber() {
    const count = 1; // Set count to 1 to generate only one random number
    const minValue = document.getElementById("minValue").value;
    const maxValue = document.getElementById("maxValue").value;

    if (!validateInput(count, minValue, maxValue)) {
        return;
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '<p>Generating...</p>';

    fetch(`/generate?count=${count}&min_value=${minValue}&max_value=${maxValue}`)
        .then(response => response.json())
        .then(data => {
            const generatedNumber = data.random_numbers[0]; // Extract the first number
            resultDiv.innerHTML = `<p>Generated Random Number: ${generatedNumber}</p>`;
            animateResult();
        })
        .catch(error => {
            console.error("Error:", error);
            resultDiv.innerHTML = '<p>Error generating random number. Please try again.</p>';
        });
}

function validateInput(count, minValue, maxValue) {
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.innerHTML = '';

    if (!count || !minValue || !maxValue) {
        errorMessageDiv.innerHTML = '<p>Please fill in all fields.</p>';
        return false;
    }

    if (count <= 0 || minValue >= maxValue) {
        errorMessageDiv.innerHTML = '<p>Invalid input. Please check your values.</p>';
        return false;
    }

    return true;
}

function animateResult() {
    const resultDiv = document.getElementById("result");
    resultDiv.classList.add("animate__animated", "animate__fadeIn");
    
    setTimeout(() => {
        resultDiv.classList.remove("animate__animated", "animate__fadeIn");
    }, 1000);
}
