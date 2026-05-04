/**
 * @param {string} verknuepfungen
 */

function Liste_EventVariableVerknuepfungenAktualisieren(verknuepfungen) {
    if (verknuepfungen in VERKNUEPFUNGEN) {
        const verknuepfte_listen = VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen;

        LISTEN[verknuepfungen].tabelle = new Array();
        $.each(Localstorage_RausZurueck(verknuepfungen + "_tabelle", new Array()), function (position, verknuepfung) {
            LISTEN[verknuepfungen].tabelle[Number(verknuepfung.id)] = verknuepfung;

            $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
                if (verknuepfte_liste in LISTEN) {
                    const verknuepfte_element_id = Liste_VariableRausZurueck(
                        LISTEN[verknuepfte_liste].element + "_id",
                        verknuepfung.id,
                        verknuepfungen,
                        undefined,
                    );

                    if (typeof verknuepfte_element_id !== "undefined") {
                        const verknuepftes_element = LISTEN[verknuepfte_liste].tabelle[verknuepfte_element_id];

                        if (typeof verknuepftes_element !== "undefined") {
                            if (!("zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids" in verknuepftes_element))
                                LISTEN[verknuepfte_liste].tabelle[verknuepfte_element_id][
                                    "zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids"
                                ] = [verknuepfung.id];
                            else if (
                                !verknuepftes_element["zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids"].includes(verknuepfung_id)
                            )
                                LISTEN[verknuepfte_liste].tabelle[verknuepfte_element_id][
                                    "zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids"
                                ].push(verknuepfung.id);
                        }
                    }
                }
            });
        });

        // LISTEN[verknuepfungen].verknuepfung_ids_nach_liste = new Object();
        // $.each(
        //     Localstorage_RausZurueck(verknuepfungen + "_verknuepfung_ids_nach_liste", new Object()),
        //     function (liste, verknuepfung_ids_nach_element_id) {
        //         LISTEN[verknuepfungen].verknuepfung_ids_nach_liste[liste] = new Array();
        //         $.each(verknuepfung_ids_nach_element_id, function (element_id, verknuepfung_ids) {
        //             if (!(Number(element_id) in LISTEN[verknuepfungen].verknuepfung_ids_nach_liste[liste]))
        //                 LISTEN[verknuepfungen].verknuepfung_ids_nach_liste[liste] = new Array();
        //             LISTEN[verknuepfungen].verknuepfung_ids_nach_liste[liste].push(verknuepfung_ids);
        //         });
        //     },
        // );
    }
}
