function Liste_FilternWertLoeschen($filtern_wert, ziel_id, liste) {
    const $filtern_eigenschaft = $filtern_wert.closest(".filtern_eigenschaft");
    const eigenschaft = $filtern_eigenschaft.attr("data-eigenschaft");
    let filtern_wert = Schnittstelle_VariableWertBereinigtZurueck($filtern_wert.attr("data-wert"), undefined);
    if (EIGENSCHAFTEN[liste][eigenschaft].typ == "janein") filtern_wert = JANEIN[filtern_wert].wert;

    // Definition von filtern_prio_niedrig und filtern_prio_hoch
    let filtern_prio_niedrig, filtern_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).attr("data-filtern_prio_niedrig"), new Object());
        filtern_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).val(), new Object());
    } else {
        filtern_prio_niedrig = new Object();
        filtern_prio_hoch = new Object();
    }

    // Änderung von filtern_prio_hoch
    if (!(eigenschaft in filtern_prio_hoch)) filtern_prio_hoch[eigenschaft] = new Object();
    const filtern_eigenschaft = filtern_prio_hoch[eigenschaft];

    switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
        case "text":
            // (noch) nicht möglich
            break;
        case "zahl":
        case "zeitpunkt":
            // (noch) keine Vielzahl an Werten
            break;
        case "vorgegebene_werte":
        case "janein":
        case "element_id":
        case "element_ids":
            let filtern_wert_position, filtern_klasse_alt;
            $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                if (filtern_klasse in filtern_prio_hoch[eigenschaft] && filtern_prio_hoch[eigenschaft][filtern_klasse].includes(filtern_wert)) {
                    filtern_wert_position = filtern_prio_hoch[eigenschaft][filtern_klasse].indexOf(filtern_wert);
                    filtern_klasse_alt = filtern_klasse;
                    return;
                }
            });

            if (typeof filtern_wert_position !== "undefined" && typeof filtern_klasse_alt !== "undefined") {
                // filtern_wert_position und filtern_klasse_alt sind definiert, d.h. eigenschaft existiert in filtern_prio_hoch
                filtern_eigenschaft[filtern_klasse_alt].splice(filtern_wert_position, 1);
                if (filtern_eigenschaft[filtern_klasse_alt].length === 0) delete filtern_eigenschaft[filtern_klasse_alt];
            } else {
                // filtern_wert_position oder filtern_klasse_alt ist nicht definiert, d.h. eigenschaft existiert noch nicht in filtern_prio_hoch
                $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                    if (
                        filtern_klasse in filtern_prio_niedrig[eigenschaft] &&
                        filtern_prio_niedrig[eigenschaft][filtern_klasse].includes(filtern_wert)
                    ) {
                        filtern_wert_position = filtern_prio_niedrig[eigenschaft][filtern_klasse].indexOf(filtern_wert);
                        filtern_klasse_alt = filtern_klasse;
                        return;
                    }
                });

                if (typeof filtern_wert_position !== "undefined" && typeof filtern_klasse_alt !== "undefined") {
                    // filtern_wert_position und filtern_klasse_alt sind definiert, d.h. eigenschaft existiert in filtern_prio_niedrig
                } else {
                    // filtern_wert_position oder filtern_klasse_alt ist nicht definiert, d.h. irgendwas läuft schief
                }
            }

            break;
    }

    // Überschreiben des value mit geänderten filtern_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern_prio_hoch, new Object()))
            .trigger("change");

    // Aktualisieren der $filtern_eigenschaft
    Liste_FilternFormular$EigenschaftAktualisieren(
        $filtern_eigenschaft,
        Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste)[eigenschaft],
        liste
    );
}
