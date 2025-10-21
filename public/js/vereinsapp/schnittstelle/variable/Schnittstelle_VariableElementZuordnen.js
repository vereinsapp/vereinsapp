function Schnittstelle_VariableElementZuordnen(liste) {
    if (typeof ELEMENTE[LISTEN[liste].element].zuordnen_aktion === "function")
        $.each(LISTEN[liste].tabelle, function () {
            const element = this;
            if ("id" in element) ELEMENTE[LISTEN[liste].element].zuordnen_aktion(element);
        });
}
