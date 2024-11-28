document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Extract form data
    const formData = new FormData(this);

    // Convert formData to an object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send the data to web3forms.com via fetch
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            Swal.fire({
                title: "Thank you!",
                text: "Your message has been sent successfully. We will get back to you soon.",
                icon: "success",
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "There was an issue sending your message. Please try again later.",
                icon: "error",
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: "Error!",
            text: "There was an issue sending your message. Please try again later.",
            icon: "error",
        });
    });
});