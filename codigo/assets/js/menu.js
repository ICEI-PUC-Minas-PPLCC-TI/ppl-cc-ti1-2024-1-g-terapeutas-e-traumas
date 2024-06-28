function toggleMode() {
    const html = document.documentElement;
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "light") {
        html.classList.remove("light");
        localStorage.setItem("theme", "dark");
    } else {
        html.classList.add("light");
        localStorage.setItem("theme", "light");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const theme = localStorage.getItem("theme");

    if (theme === "light") {
        html.classList.add("light");
    } else {
        html.classList.remove("light");
    }
});
