/**
 * @param {Array} tabelle
 * @param {Object} filtern
 * @param {string} liste
 */

function Liste_TabelleGefiltertZurueck(tabelle, filtern, liste) {
    let tabelle_vorgefiltert;
    if (isObject(filtern) && "id" in filtern && isObject(filtern.id) && "inklusiv" in filtern.id && isArray(filtern.id.inklusiv)) {
        tabelle_vorgefiltert = new Array();
        $.each(filtern.id.inklusiv, function (position, element_id) {
            tabelle_vorgefiltert.push(tabelle[element_id]);
        });
    } else tabelle_vorgefiltert = tabelle;

    const tabelle_gefiltert = new Array();
    $.each(tabelle_vorgefiltert, function () {
        const element = this;
        if ("id" in element) {
            let filtern_ergebnis = true;
            $.each(filtern, function (eigenschaft) {
                if (isObject(filtern[eigenschaft])) {
                    let typ = undefined;
                    if (eigenschaft in VERKNUEPFUNGEN) typ = "verknuepfungen";
                    else typ = EIGENSCHAFTEN[liste][eigenschaft].typ;
                    switch (typ) {
                        case "text":
                            // (noch) nicht möglich
                            break;
                        case "zahl":
                        case "zeitpunkt":
                            if ("start" in filtern[eigenschaft]) {
                                filtern_ergebnis_start = false;
                                if (filtern[eigenschaft].start <= element[eigenschaft]) filtern_ergebnis_start = true;
                                filtern_ergebnis &= filtern_ergebnis_start;
                            }
                            if ("ende" in filtern[eigenschaft]) {
                                filtern_ergebnis_ende = false;
                                if (filtern[eigenschaft].ende >= element[eigenschaft]) filtern_ergebnis_ende = true;
                                filtern_ergebnis &= filtern_ergebnis_ende;
                            }
                            break;
                        case "janein":
                        case "vorgegebene_werte":
                        case "element_id":
                            if ("inklusiv" in filtern[eigenschaft]) {
                                filtern_ergebnis_inklusiv = false;
                                const wert = element[eigenschaft];
                                if (isArray(filtern[eigenschaft].inklusiv) && filtern[eigenschaft].inklusiv.includes(wert)) {
                                    filtern_ergebnis_inklusiv = true;
                                }
                                filtern_ergebnis &= filtern_ergebnis_inklusiv;
                            }
                            if ("exklusiv" in filtern[eigenschaft]) {
                                filtern_ergebnis_exklusiv = false;
                                const wert = element[eigenschaft];
                                if (isArray(filtern[eigenschaft].exklusiv) && !filtern[eigenschaft].exklusiv.includes(wert)) {
                                    filtern_ergebnis_exklusiv = true;
                                }
                                filtern_ergebnis &= filtern_ergebnis_exklusiv;
                            }
                            break;
                        case "element_ids":
                            if ("inklusiv" in filtern[eigenschaft]) {
                                filtern_ergebnis_inklusiv = false;
                                $.each(element[eigenschaft], function (position, wert) {
                                    if (isArray(filtern[eigenschaft].inklusiv) && filtern[eigenschaft].inklusiv.includes(wert)) {
                                        filtern_ergebnis_inklusiv = true;
                                        return false;
                                    }
                                });
                                filtern_ergebnis &= filtern_ergebnis_inklusiv;
                            }
                            if ("exklusiv" in filtern[eigenschaft]) {
                                filtern_ergebnis_exklusiv = false;
                                $.each(element[eigenschaft], function (position, wert) {
                                    if (isArray(filtern[eigenschaft].exklusiv) && !filtern[eigenschaft].exklusiv.includes(wert)) {
                                        filtern_ergebnis_exklusiv = true;
                                        return false;
                                    }
                                });
                                filtern_ergebnis &= filtern_ergebnis_exklusiv;
                            }
                            break;
                        case "verknuepfungen":
                            const verknuepfungen = eigenschaft;
                            const verknuepfte_liste = liste;
                            const verknuepfte_element_id = element.id;
                            const verknuepfte_listen = VERKNUEPFUNGEN[verknuepfungen].verknuepfte_listen;
                            let andere_verknuepfte_liste = liste;
                            $.each(verknuepfte_listen, function (position, verknuepfte_liste) {
                                if (verknuepfte_liste !== liste) andere_verknuepfte_liste = verknuepfte_liste;
                                else {
                                    /* nächster Schleifendurchlauf */
                                }
                            });
                            if ("inklusiv" in filtern[eigenschaft]) {
                                filtern_ergebnis_inklusiv = false;
                                $.each(
                                    VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][verknuepfte_element_id],
                                    function (position, verknuepfung_id) {
                                        const andere_verknuepfte_element_id = Liste_VerknuepfungWertRausZurueck(
                                            LISTEN[andere_verknuepfte_liste].element + "_id",
                                            verknuepfung_id,
                                            verknuepfungen,
                                            undefined,
                                        );
                                        const wert = andere_verknuepfte_element_id;
                                        if (isArray(filtern[eigenschaft].inklusiv) && filtern[eigenschaft].inklusiv.includes(wert)) {
                                            filtern_ergebnis_inklusiv = true;
                                            return false;
                                        }
                                    },
                                );
                                filtern_ergebnis &= filtern_ergebnis_inklusiv;
                            }
                            if ("exklusiv" in filtern[eigenschaft]) {
                                filtern_ergebnis_exklusiv = false;
                                $.each(
                                    VERKNUEPFUNGEN[verknuepfungen].verknuepfung_ids_nach_liste[verknuepfte_liste][verknuepfte_element_id],
                                    function (position, verknuepfung_id) {
                                        const andere_verknuepfte_element_id = Liste_VerknuepfungWertRausZurueck(
                                            LISTEN[andere_verknuepfte_liste].element + "_id",
                                            verknuepfung_id,
                                            verknuepfungen,
                                            undefined,
                                        );
                                        const wert = andere_verknuepfte_element_id;
                                        if (isArray(filtern[eigenschaft].exklusiv) && !filtern[eigenschaft].exklusiv.includes(wert)) {
                                            filtern_ergebnis_exklusiv = true;
                                            return false;
                                        }
                                    },
                                );
                                filtern_ergebnis &= filtern_ergebnis_exklusiv;
                            }
                            break;
                    }
                }
            });

            if (filtern_ergebnis) tabelle_gefiltert.push(element);
        }
    });

    return tabelle_gefiltert;
}
