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

    // Elemente in anderen Listen suchen und auch die anderen Elemente löschen, die auf das zu löschende Element verlinken
    $.each(EIGENSCHAFTEN, function (gegen_liste, eigenschaften) {
        if (LISTEN[liste].element + "_id" in eigenschaften)
            $.each(LISTEN[gegen_liste].tabelle, function () {
                const gegen_element = this;
                if ("id" in gegen_element) {
                    if (gegen_element[LISTEN[liste].element + "_id"] === element_id) Schnittstelle_VariableLoeschen(gegen_element.id, gegen_liste);
                }
            });
    });

    // Zuordnungen auflösen
    const gegen_liste_neu_zuordnen = new Array();
    $.each(EIGENSCHAFTEN, function (gegen_liste, eigenschaften) {
        if ("zugeordnete_" + LISTEN[liste].element + "_ids" in eigenschaften && !gegen_liste_neu_zuordnen.includes(gegen_liste))
            gegen_liste_neu_zuordnen.push(gegen_liste);

        $.each(Object.keys(LISTEN), function () {
            if ("zugeordnete_" + LISTEN[this].element + "_ids_via_" + liste in eigenschaften && !gegen_liste_neu_zuordnen.includes(gegen_liste))
                gegen_liste_neu_zuordnen.push(gegen_liste);
        });
    });
    $.each(gegen_liste_neu_zuordnen, function () {
        const gegen_liste = this;
        Schnittstelle_EventLocalstorageUpdVariable(gegen_liste);
        Schnittstelle_VariableElementZuordnen(gegen_liste);
        Schnittstelle_VariableElementErgaenzen(gegen_liste);
    });
}
