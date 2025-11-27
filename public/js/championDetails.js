'use strict'
//get the element clicked
document.querySelectorAll(".spell").forEach(spellElement => {
    spellElement.addEventListener("click", () => {
        const index = spellElement.dataset.index;

        // Hide ALL descriptions
        document.querySelectorAll(".spellDescription")
            .forEach(desc => desc.classList.remove("activeSpell"));

        // Show the matching one
        document
            .querySelector(`.spellDescription[data-index="${index}"]`)
            .classList.add("activeSpell");
    });
});