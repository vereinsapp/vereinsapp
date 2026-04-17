/**
 * @param {string} liste
 */

function Liste_EventLocalstorageUpdVariable(liste) {
    LISTEN[liste].tabelle = new Array();
    $.each(Localstorage_RausZurueck(liste + "_tabelle", new Array()), function (position, element) {
        LISTEN[liste].tabelle[element.id] = element;
    });

    $.each(LISTEN[liste].instanz, function (instanz) {
        LISTEN[liste].instanz[instanz].filtern = Localstorage_RausZurueck(liste + "_" + instanz + "_filtern", new Object());
        LISTEN[liste].instanz[instanz].sortieren = Localstorage_RausZurueck(liste + "_" + instanz + "_sortieren", undefined);
        LISTEN[liste].instanz[instanz].gruppieren = Localstorage_RausZurueck(liste + "_" + instanz + "_gruppieren", undefined);
        LISTEN[liste].instanz[instanz].bearbeiten_modus = Localstorage_RausZurueck(liste + "_" + instanz + "_bearbeiten_modus", false);
    });

    // VERKNUEPFUNGEN[verknuepfungen].tabelle = new Array();
    // $.each(Localstorage_RausZurueck(verknuepfungen + "_tabelle", new Array()), function (position, verknuepfung) {
    //     VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(verknuepfung.id)] = verknuepfung;
    // });

    // VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste = new Object();
    // $.each(
    //     Localstorage_RausZurueck(verknuepfungen + "_verknuepfung_ids_nach_liste", new Object()),
    //     function (liste, verknuepfung_ids_nach_element_id) {
    //         VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[liste] = new Array();
    //         $.each(verknuepfung_ids_nach_element_id, function (element_id, verknuepfung_ids) {
    //             if (!(Number(element_id) in VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[liste]))
    //                 VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[liste] = new Array();
    //             VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[liste].push(verknuepfung_ids);
    //         });
    //     },
    // );
}
