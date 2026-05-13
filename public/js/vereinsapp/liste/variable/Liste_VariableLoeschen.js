/**
 * @param {number} element_id
 * @param {string} liste
 */

function Liste_VariableLoeschen(element_id, liste) {
    // Eigentliches Element löschen
    LISTEN[liste].tabelle[element_id] = undefined;

    // Zuordnungen auflösen
    $.each(EIGENSCHAFTEN, function (liste_mit_zuordnungen, eigenschaften) {
        if ("zugeordnete_" + LISTEN[liste].element + "_ids" in eigenschaften)
            $.each(LISTEN[liste_mit_zuordnungen].tabelle, function () {
                const element_mit_zuordnungen = this;
                if ("id" in element_mit_zuordnungen) {
                    const neue_zugeordnete_element_ids = new Array();
                    $.each(
                        Liste_ElementWertRausZurueck(
                            "zugeordnete_" + LISTEN[liste].element + "_ids",
                            element_mit_zuordnungen.id,
                            liste_mit_zuordnungen,
                            new Array(),
                        ),
                        function (position, zugeordnete_element_id) {
                            if (zugeordnete_element_id !== element_id) neue_zugeordnete_element_ids.push(zugeordnete_element_id);
                        },
                    );
                    Liste_ElementWertRein(
                        neue_zugeordnete_element_ids,
                        "zugeordnete_" + LISTEN[liste].element + "_ids",
                        element_mit_zuordnungen.id,
                        liste_mit_zuordnungen,
                    );
                }
            });
    });
}
