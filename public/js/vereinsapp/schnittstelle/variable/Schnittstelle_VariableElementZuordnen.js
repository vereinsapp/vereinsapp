function Schnittstelle_VariableElementZuordnen(liste) {
    if ("zuordnen_aktion" in ELEMENTE[LISTEN[liste].element] && typeof ELEMENTE[LISTEN[liste].element].zuordnen_aktion === "function")
        $.each(LISTEN[liste].tabelle, function () {
            const element = this;
            if ("id" in element) ELEMENTE[LISTEN[liste].element].zuordnen_aktion(element);
        });
}
