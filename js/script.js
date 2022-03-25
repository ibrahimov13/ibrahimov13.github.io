const container = document.querySelector('.container'),
qrInput = container.querySelector('.form input'),
createBtn = container.querySelector('.form button'),
qrImg = container.querySelector('.qr-code img');

createBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if(!qrValue) return;
    createBtn.innerText = "Creating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        createBtn.innerText = "Create QR Code";
    })
})