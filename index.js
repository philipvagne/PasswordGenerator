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

    updateStrength(password1);
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

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
lengthValue.textContent = lengthSlider.value;

function updateSliderFill() {
    const min = parseInt(lengthSlider.min);
    const max = parseInt(lengthSlider.max);
    const val = parseInt(lengthSlider.value);
    const percent = ((val - min) / (max - min)) * 100;
    lengthSlider.style.background = `linear-gradient(to right, #4ADF86 0%, #4ADF86 ${percent}%, #374151 ${percent}%, #374151 100%)`;
}

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
    updateSliderFill();
});
updateSliderFill();

function updateStrength(password) {
    const fill = document.querySelector(".strength-fill");
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (password.length >= 12) strength++;

    const percent = (strength / 5) * 100;
    fill.style.width = percent + "%";

    if (strength < 3) fill.style.backgroundColor = "#F87171";
    else if (strength < 5) fill.style.backgroundColor = "#FACC15";
    else fill.style.backgroundColor = "#4ADF86";
}


document.getElementById("generateBtn").addEventListener("click", generatePasswords);
document.getElementById("password1").addEventListener("click", () => copyPassword("password1"));
document.getElementById("password2").addEventListener("click", () => copyPassword("password2"));