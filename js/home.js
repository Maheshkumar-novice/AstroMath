let menubtn = document.querySelectorAll(".main__option");

menubtn.forEach((menu) => {
    menu.addEventListener("mouseenter", function(){
        let fire = document.querySelector(`img[data-tag="${this.dataset.value}"]`);
        fire.classList.remove("none");
    });
    menu.addEventListener("mouseleave", function(){
        let fire = document.querySelector(`img[data-tag="${this.dataset.value}"]`);
        fire.classList.add("none");
    });
});
