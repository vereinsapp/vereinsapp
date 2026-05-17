/**
 * @param {string} verknuepfungen
 */

function Liste_EventVariableVerknuepfungenAktualisieren(verknuepfungen) {
    if (verknuepfungen in VERKNUEPFUNGEN) {
        VERKNUEPFUNGEN[verknuepfungen].tabelle = new Array();
        $.each(Localstorage_RausZurueck(verknuepfungen + "_tabelle", new Array()), function (position, verknuepfung) {
            VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(verknuepfung.id)] = verknuepfung;
        });

        VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste = new Object();
        $.each(
            Localstorage_RausZurueck(verknuepfungen + "_verknuepfung_ids_nach_liste", new Object()),
            function (liste, verknuepfung_ids_nach_element_id) {
                VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[liste] = new Array();
                $.each(verknuepfung_ids_nach_element_id, function (element_id, verknuepfung_ids) {
                    if (typeof VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[liste][Number(element_id)] === "undefined")
                        VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[liste][Number(element_id)] = verknuepfung_ids;
                });
            },
        );
    }
}
