/**
 * @param {JQuery} $filtern_eigenschaft
 * @param {string} filtern_wert
 */

function Liste_$FilternEigenschaftWertLoeschen($filtern_eigenschaft, filtern_wert) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-eigenschaft"), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $filtern_prio = Schnittstelle_Dom$ZielZu$QuelleZurueck($filtern_eigenschaft);

            // Definition von filtern_prio_hoch
            const filtern_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($filtern_prio.val(), new Object());
            if (!(eigenschaft in filtern_prio_hoch)) filtern_prio_hoch[eigenschaft] = new Object();

            // Ändern von filtern_prio_hoch
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
                    filtern_wert = JANEIN[filtern_wert].wert;
                case "element_id":
                case "element_ids":
                    let filtern_wert_position, filtern_klasse_alt;
                    $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                        if (filtern_klasse in filtern_eigenschaft && filtern_eigenschaft[filtern_klasse].includes(filtern_wert)) {
                            filtern_wert_position = filtern_eigenschaft[filtern_klasse].indexOf(filtern_wert);
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
                        const filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(
                            $filtern_prio.attr("data-filtern_prio_niedrig"),
                            new Object(),
                        );
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

            // Überschreiben des bisherigen filtern_prio_hoch mit geändertem filtern_prio_hoch
            $filtern_prio.val(JsonStringifiedZurueck(filtern_prio_hoch, new Object())).trigger("change");

            // Aktualisieren der $filtern_eigenschaft
            Liste_$FilternEigenschaftAktualisieren($filtern_eigenschaft);
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$FilternEigenschaftWertLoeschen: Eigenschaft " + eigenschaft + " existiert nicht in FILTERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$FilternEigenschaftWertLoeschen: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );
}
