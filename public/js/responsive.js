const contentForDesktop = document.getElementById("responsive-only-desktop");
if (window.innerWidth > 1024) {
    contentForDesktop.style.display = "block";
} else {
    contentForDesktop.style.display = "none";
}