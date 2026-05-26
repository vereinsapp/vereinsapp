/**
 * @param {string} verknuepfungen
 */

function Liste_EventVerknuepfungenBereitstellen(verknuepfungen) {
    if (verknuepfungen in VERKNUEPFUNGEN) {
        VERKNUEPFUNGEN[verknuepfungen].tabelle = new Array();
        VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste = new Object();
        $.each(Localstorage_RausZurueck(verknuepfungen + "_tabelle", new Array()), function (position, verknuepfung) {
            VERKNUEPFUNGEN[verknuepfungen].tabelle[Number(verknuepfung.id)] = verknuepfung;

            $.each(VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen, function (position, verknuepfte_liste) {
                const verknuepfte_element_id = verknuepfung[LISTEN[verknuepfte_liste].element + "_id"];

                if (!(verknuepfte_liste in VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste))
                    VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste] = new Array();
                if (typeof VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][verknuepfte_element_id] === "undefined")
                    VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][verknuepfte_element_id] = new Array();
                VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][verknuepfte_element_id].push(verknuepfung.id);
            });
        });

        // $.each(
        //     Localstorage_RausZurueck(verknuepfungen + "_verknuepfung_ids_nach_liste", new Object()),
        //     function (verknuepfte_liste, verknuepfung_ids_nach_element_id) {
        //         VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste] = new Array();
        //         $.each(verknuepfung_ids_nach_element_id, function (element_id, verknuepfung_ids) {
        //             VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][Number(element_id)] = verknuepfung_ids;
        //         });
        //     },
        // );
    }
}
