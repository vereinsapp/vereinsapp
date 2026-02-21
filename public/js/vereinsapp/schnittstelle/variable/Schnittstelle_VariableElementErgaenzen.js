function Schnittstelle_VariableElementErgaenzen(liste) {
    if (typeof LISTEN[liste].element_ergaenzen_aktion === "function")
        $.each(LISTEN[liste].tabelle, function () {
            const element = this;
            if ("id" in element) LISTEN[liste].element_ergaenzen_aktion(element);
        });
}
