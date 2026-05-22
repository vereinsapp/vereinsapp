/**
 * @param {string} verknuepfungen
 */

function Liste_EventVerknuepfungenLocalstorageSpeichern(verknuepfungen) {
    // tabelle_LocalStorage wird aus der Variable geholt
    const tabelle_LocalStorage = new Array();
    $.each(VERKNUEPFUNGEN[verknuepfungen].tabelle, function () {
        const element = this;
        if ("id" in element) tabelle_LocalStorage.push(element);
    });

    // tabelle_LocalStorage wird im LocalStorage gespeichert
    Localstorage_Rein(verknuepfungen + "_tabelle", tabelle_LocalStorage);

    // verknuepfung_ids_nach_liste_LocalStorage wird aus der Variable geholt
    const verknuepfung_ids_nach_liste_LocalStorage = new Object();
    $.each(VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste, function (verknuepfte_liste, verknuepfung_ids_nach_element_id) {
        verknuepfung_ids_nach_liste_LocalStorage[verknuepfte_liste] = new Object();
        $.each(verknuepfung_ids_nach_element_id, function (element_id, verknuepfung_ids) {
            if (isArray(verknuepfung_ids)) verknuepfung_ids_nach_liste_LocalStorage[verknuepfte_liste][element_id] = verknuepfung_ids;
        });
    });

    // verknuepfung_ids_nach_liste_LocalStorage wird im LocalStorage gespeichert
    Localstorage_Rein(verknuepfungen + "_verknuepfung_ids_nach_liste", verknuepfung_ids_nach_liste_LocalStorage);
}
