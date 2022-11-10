const contentForDesktop = document.getElementById("responsive-only-desktop");
const contentForSmartphone = document.getElementById("responsive-only-smartphone");
if (window.innerWidth > 1024) {
    contentForSmartphone.style.display = "none";
} else {
    contentForDesktop.style.display = "none";
}