function Liste_VerknuepfungenZuordnen(verknuepfungen) {
    if (verknuepfungen in VERKNUEPFUNGEN)
        $.each(LISTEN[verknuepfungen].tabelle, function () {
            const verknuepfung_id = this.id;

            const verknuepfte_listen = VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen;
            $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
                if (verknuepfte_liste in LISTEN) {
                    const verknuepfte_element_id = Liste_VariableRausZurueck(
                        LISTEN[verknuepfte_liste].element + "_id",
                        verknuepfung_id,
                        verknuepfungen,
                        undefined,
                    );

                    if (typeof verknuepfte_element_id !== "undefined") {
                        const verknuepftes_element = LISTEN[verknuepfte_liste].tabelle[verknuepfte_element_id];

                        if (typeof verknuepftes_element !== "undefined") {
                            if (!("zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids" in verknuepftes_element))
                                LISTEN[verknuepfte_liste].tabelle[verknuepfte_element_id][
                                    "zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids"
                                ] = [verknuepfung_id];
                            else if (
                                !verknuepftes_element["zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids"].includes(verknuepfung_id)
                            )
                                LISTEN[verknuepfte_liste].tabelle[verknuepfte_element_id][
                                    "zugeordnete_" + VERKNUEPFUNGEN[verknuepfungen].verknuepfung + "_ids"
                                ].push(verknuepfung_id);
                        }
                    }
                }
            });
        });
}
