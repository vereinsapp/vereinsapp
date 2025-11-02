function Schnittstelle_VariableLoeschen(element_id, liste) {
    if (typeof element_id !== "undefined" && typeof liste !== "undefined") {
        // Zugeordnete Element-IDs in anderen Listen suchen und löschen
        $.each(LISTEN, function (gegen_liste) {
            if (LISTEN[gegen_liste].element + "_id" in EIGENSCHAFTEN[liste]) {
                const gegen_element_id = Schnittstelle_VariableRausZurueck(LISTEN[gegen_liste].element + "_id", Number(element_id), liste, undefined);
                LISTEN[gegen_liste].tabelle[gegen_element_id].zugeordnete_element_ids_nach_liste[liste] = Schnittstelle_VariableRausZurueck(
                    "zugeordnete_element_ids_nach_liste",
                    gegen_element_id,
                    gegen_liste,
                    { [liste]: new Array() }
                )[liste].filter((id) => id != Number(element_id));
            }
        });

        // Eigentliches Element löschen
        LISTEN[liste].tabelle[Number(element_id)] = undefined;

        // Elemente in anderen Listen suchen und löschen, die auf das zu löschende Element verlinken (mittels [x]_id oder mittels liste und element_id)
        $.each(EIGENSCHAFTEN, function (verlinkte_liste, eigenschaften) {
            if (LISTEN[liste].element + "_id" in eigenschaften)
                $.each(LISTEN[verlinkte_liste].tabelle, function () {
                    const verlinktes_element = this;
                    if (
                        "id" in verlinktes_element &&
                        LISTEN[liste].element + "_id" in verlinktes_element &&
                        verlinktes_element[LISTEN[liste].element + "_id"] == Number(element_id)
                    )
                        Schnittstelle_VariableLoeschen(verlinktes_element.id, verlinkte_liste);
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
