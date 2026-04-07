function generatePassword(length = 15) {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById("uppercase").checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById("numbers").checked) chars += "0123456789";
    if (document.getElementById("symbols").checked) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (chars.length === 0) return "";

    let password = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}

function generatePasswords() {
    const lengthInput = parseInt(document.getElementById("length").value) || 15;
    let password1 = generatePassword(lengthInput);
    let password2 = generatePassword(lengthInput);

    while (password1 === password2) {
        password2 = generatePassword(lengthInput);
    }

    const box1 = document.getElementById("password1");
    const box2 = document.getElementById("password2");

    box1.textContent = password1;
    box2.textContent = password2;

    box1.dataset.password = password1;
    box2.dataset.password = password2;
}

function copyPassword(passwordId) {
    const box = document.getElementById(passwordId);
    const password = box.dataset.password;

    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
        box.classList.add("copied");
        setTimeout(() => box.classList.remove("copied"), 1000);
    }).catch(err => {
        alert("Failed to copy password");
        console.error(err);
    });
}

document.getElementById("generateBtn").addEventListener("click", generatePasswords);
document.getElementById("password1").addEventListener("click", () => copyPassword("password1"));
document.getElementById("password2").addEventListener("click", () => copyPassword("password2"));