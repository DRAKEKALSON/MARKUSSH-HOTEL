
// MOBILE MENU
function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("show");
}

// CLOSE MENU AFTER CLICKING A LINK
document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navbar").classList.remove("show");
    });
});

// BOOKING FORM
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");

    // Set today's date as the earliest check-in date
    const today = new Date();
    const localDate = today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    checkIn.min = localDate;
    checkOut.min = localDate;

    // Update earliest check-out date
    checkIn.addEventListener("change", () => {
        checkOut.min = checkIn.value;

        if (checkOut.value && checkOut.value <= checkIn.value) {
            checkOut.value = "";
        }
    });

    // Automatically select room from Rooms page
    const params = new URLSearchParams(window.location.search);
    const selectedRoom = params.get("room");

    if (selectedRoom) {
        const roomOptions = {
            "Single": "Single - UGX 90,000 per night",
            "Double": "Double - UGX 130,000 per night",
            "Deluxe": "Deluxe - Price on request"
        };

        document.getElementById("roomType").value =
            roomOptions[selectedRoom] || "";
    }

    // SEND BOOKING TO WHATSAPP
    bookingForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const email = document.getElementById("customerEmail").value.trim();
        const room = document.getElementById("roomType").value;
        const arrival = checkIn.value;
        const departure = checkOut.value;
        const guests = document.getElementById("guests").value;
        const requests = document.getElementById("requests").value;

        if (!room) {
            alert("Please select a room.");
            return;
        }

        if (departure <= arrival) {
            alert("Check-out must be after check-in.");
            return;
        }

        const message =
`HELLO MARKUSSH HOTEL!

I would like to make a booking enquiry.

Customer Name: ${name}
Phone Number: ${phone}
Email: ${email || "Not provided"}

Room: ${room}
Check-in: ${arrival}
Check-out: ${departure}
Number of Guests: ${guests}

Additional Requests: ${requests || "None"}

Please confirm room availability and the total cost.

Thank you!`;

        const whatsappURL =
            "https://wa.me/256747189641?text=" +
            encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

    });
}
