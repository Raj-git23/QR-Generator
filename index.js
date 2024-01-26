let qrText = document.getElementById("qrText");
let qrImg = document.getElementById("qrImg");
let ImgBox = document.getElementById("ImgBox");
let btnText = document.querySelector("#btn");

// ... (Your existing code)

function generateQR() {
    if (qrText.value.length > 0) {
        qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;
        ImgBox.classList.add("show-img");

        document.getElementById("btn").classList.add("hidden");
        document.getElementById("shareBtn").classList.remove("hidden");
        document.getElementById("downloadbtn").classList.remove("hidden");
    } else {
        qrText.classList.add("error");
        setTimeout(() => {
            qrText.classList.remove("error");
        }, 1000);
    }
}

qrText.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generateQR();
    }
});

function shareQR() {
    if (navigator.share) {
        navigator.share({
            title: "QR Code",
            text: "Check out this QR Code",
            url: qrImg.src
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
        alert("Sharing is not supported in your browser.");
    }
}

function downloadQR() {
    if (qrText.value.length > 0) {
        let link = document.createElement("a");

        link.href = qrImg.src;

        link.download = "qrcode.png";

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    }
}

