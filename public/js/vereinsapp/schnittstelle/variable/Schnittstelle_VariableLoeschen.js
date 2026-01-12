/**
 * @param {number} element_id
 * @param {string} liste
 */

function Schnittstelle_VariableLoeschen(element_id, liste) {
    // Eigentliches Element löschen
    LISTEN[liste].tabelle[element_id] = undefined;
    Schnittstelle_EventVariableUpdLocalstorage(liste);
    Schnittstelle_EventLocalstorageUpdVariable(liste);
    Schnittstelle_VariableElementZuordnen(liste);
    Schnittstelle_VariableElementErgaenzen(liste);

    // Zuordnungen auflösen
    $.each(EIGENSCHAFTEN, function (liste_mit_zuordnungen, eigenschaften) {
        if ("zugeordnete_" + LISTEN[liste].element + "_ids" in eigenschaften)
            $.each(LISTEN[liste_mit_zuordnungen].tabelle, function () {
                const element_mit_zuordnungen = this;
                if ("id" in element_mit_zuordnungen) {
                    const neue_zugeordnete_element_ids = new Array();
                    $.each(
                        Schnittstelle_VariableRausZurueck(
                            "zugeordnete_" + LISTEN[liste].element + "_ids",
                            element_mit_zuordnungen.id,
                            liste_mit_zuordnungen,
                            new Array()
                        ),
                        function (position, zugeordnete_element_id) {
                            if (zugeordnete_element_id !== element_id) neue_zugeordnete_element_ids.push(zugeordnete_element_id);
                        }
                    );
                    Schnittstelle_VariableRein(
                        neue_zugeordnete_element_ids,
                        "zugeordnete_" + LISTEN[liste].element + "_ids",
                        element_mit_zuordnungen.id,
                        liste_mit_zuordnungen
                    );
                }
            });
    });

    // Elemente in anderen Listen suchen und auch die anderen Elemente löschen, die auf das zu löschende Element verlinken
    $.each(EIGENSCHAFTEN, function (liste_mit_verlinkungen, eigenschaften) {
        if (LISTEN[liste].element + "_id" in eigenschaften) {
            $.each(LISTEN[liste_mit_verlinkungen].tabelle, function () {
                const element_mit_verlinkungen = this;
                if ("id" in element_mit_verlinkungen) {
                    if (element_mit_verlinkungen[LISTEN[liste].element + "_id"] === element_id)
                        Schnittstelle_VariableLoeschen(element_mit_verlinkungen.id, liste_mit_verlinkungen);
                }
            });
            Schnittstelle_EventVariableUpdDom(liste_mit_verlinkungen);
        }
    });
}
