function Schnittstelle_VariableLoeschen(element_id, liste) {
    if (typeof element_id !== "undefined" && typeof liste !== "undefined") {
        delete LISTEN[liste].tabelle[Number(element_id)];

        // Elemente in anderen Listen suchen und löschen, die auf das zu löschende Element verlinken (mittels [x]_id oder mittels liste und element_id)
        $.each(EIGENSCHAFTEN, function (verlinkte_liste, eigenschaften) {
            if (LISTEN[liste].element + "_id" in eigenschaften)
                $.each(LISTEN[verlinkte_liste].tabelle, function () {
                    const element = this;
                    if ("id" in element && LISTEN[liste].element + "_id" in element && element[LISTEN[liste].element + "_id"] == Number(element_id))
                        Schnittstelle_VariableLoeschen(element.id, verlinkte_liste);
                });
            else if ("zugeordnete_liste" in eigenschaften && "zugeordnete_element_id" in eigenschaften)
                $.each(LISTEN[verlinkte_liste].tabelle, function () {
                    const element = this;
                    if (
                        "id" in element &&
                        "zugeordnete_liste" in element &&
                        element.zugeordnete_liste == liste &&
                        "zugeordnete_element_id" in element &&
                        element.zugeordnete_element_id == Number(element_id)
                    )
                        Liste_ElementLoeschen(false, new Object(), new Object(), undefined, element.id, verlinkte_liste);
                });
        });
    }
}
