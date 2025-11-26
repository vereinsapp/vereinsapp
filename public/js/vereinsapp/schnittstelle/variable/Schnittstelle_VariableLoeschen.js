/**
 * @param {number} element_id
 * @param {string} liste
 */

function Schnittstelle_VariableLoeschen(element_id, liste) {
    if (typeof element_id !== "undefined" && typeof liste !== "undefined") {
        element_id = Number(element_id);

        // Elemente in anderen Listen suchen und löschen, die auf das zu löschende Element verlinken (mittels [x]_id oder zugeordnete_[x]]_ids)
        $.each(EIGENSCHAFTEN, function (gegen_liste, eigenschaften) {
            if (LISTEN[liste].element + "_id" in eigenschaften)
                $.each(LISTEN[gegen_liste].tabelle, function (gegen_element_id, gegen_element) {
                    if ("id" in gegen_element && gegen_element[LISTEN[liste].element + "_id"] == element_id)
                        Schnittstelle_VariableLoeschen(gegen_element_id, gegen_liste);
                });
            if ("zugeordnete_" + LISTEN[liste].element + "_id" in eigenschaften)
                $.each(LISTEN[gegen_liste].tabelle, function (gegen_element_id, gegen_element) {
                    if ("id" in gegen_element && gegen_element["zugeordnete_" + LISTEN[liste].element + "_ids"].includes(element_id))
                        LISTEN[gegen_liste].tabelle[gegen_element_id]["zugeordnete_" + LISTEN[liste].element + "_ids"] =
                            Schnittstelle_VariableRausZurueck(
                                "zugeordnete_" + LISTEN[liste].element + "_ids",
                                gegen_element_id,
                                gegen_liste,
                                new Array()
                            ).filter((id) => id != element_id);
                });
        });

        // Eigentliches Element löschen
        LISTEN[liste].tabelle[element_id] = undefined;
    }
}
