function Schnittstelle_VariableElementZuordnen(liste) {
    if (typeof LISTEN[liste].element_zuordnen_aktion === "function")
        $.each(LISTEN[liste].tabelle, function () {
            const element = this;
            if ("id" in element) LISTEN[liste].element_zuordnen_aktion(element);
        });
}
