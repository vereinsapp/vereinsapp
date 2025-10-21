function Schnittstelle_VariableElementErgaenzen(liste) {
    if (typeof ELEMENTE[LISTEN[liste].element].ergaenzen_aktion === "function")
        $.each(LISTEN[liste].tabelle, function () {
            const element = this;
            if ("id" in element) ELEMENTE[LISTEN[liste].element].ergaenzen_aktion(element);
        });
}
