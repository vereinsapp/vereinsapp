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
    $.each(EIGENSCHAFTEN, function (gegen_liste, eigenschaften) {
        if ("zugeordnete_" + LISTEN[liste].element + "_ids" in eigenschaften) {
            $.each(LISTEN[gegen_liste].tabelle, function () {
                const gegen_element = this;
                if ("id" in gegen_element) {
                    const neue_zugeordnete_element_ids = new Array();
                    $.each(
                        Schnittstelle_VariableRausZurueck(
                            "zugeordnete_" + LISTEN[liste].element + "_ids",
                            gegen_element.id,
                            gegen_liste,
                            new Array()
                        ),
                        function (position, zugeordnete_element_id) {
                            if (zugeordnete_element_id !== element_id) neue_zugeordnete_element_ids.push(zugeordnete_element_id);
                        }
                    );
                    Schnittstelle_VariableRein(
                        neue_zugeordnete_element_ids,
                        "zugeordnete_" + LISTEN[liste].element + "_ids",
                        gegen_element.id,
                        gegen_liste
                    );
                }
            });
        }

        // $.each(Object.keys(LISTEN), function () {
        //     if ("zugeordnete_" + LISTEN[this].element + "_ids_via_" + liste in eigenschaften) {
        //     }
        // });
    });

    // Elemente in anderen Listen suchen und auch die anderen Elemente löschen, die auf das zu löschende Element verlinken
    $.each(EIGENSCHAFTEN, function (gegen_liste, eigenschaften) {
        if (LISTEN[liste].element + "_id" in eigenschaften) {
            $.each(LISTEN[gegen_liste].tabelle, function () {
                const gegen_element = this;
                if ("id" in gegen_element) {
                    if (gegen_element[LISTEN[liste].element + "_id"] === element_id) Schnittstelle_VariableLoeschen(gegen_element.id, gegen_liste);
                }
            });
            Schnittstelle_EventVariableUpdDom(gegen_liste);
        }
    });
}
