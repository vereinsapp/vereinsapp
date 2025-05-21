function Liste_FilternWertInExklusivVerschieben($filtern_wert, ziel_id, liste) {
    const $filtern_eigenschaft = $filtern_wert.closest(".filtern_eigenschaft");
    const eigenschaft = $filtern_eigenschaft.attr("data-eigenschaft");
    let filtern_wert = Schnittstelle_VariableWertBereinigtZurueck($filtern_wert.attr("data-wert"));
    if (EIGENSCHAFTEN[liste][eigenschaft].typ == "janein") filtern_wert = JANEIN[filtern_wert].wert;

    // Definition von filtern_prio_niedrig und filtern_prio_hoch
    let filtern_prio_niedrig, filtern_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        filtern_prio_niedrig = $("#" + ziel_id).attr("data-filtern_prio_niedrig");
        if (typeof filtern_prio_niedrig !== "undefined") filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_niedrig);
        else filtern_prio_niedrig = new Object();

        filtern_prio_hoch = $("#" + ziel_id).val();
        if (filtern_prio_hoch != "") filtern_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_hoch);
        else filtern_prio_hoch = new Object();
    } else {
        filtern_prio_niedrig = new Object();
        filtern_prio_hoch = new Object();
    }

    // Änderung von filtern_prio_hoch
    if (!(eigenschaft in filtern_prio_hoch)) filtern_prio_hoch[eigenschaft] = new Object();
    const filtern_eigenschaft = filtern_prio_hoch[eigenschaft];

    switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
        case "text":
            // (noch) kein filtern möglich
            break;
        case "zahl":
        case "zeitpunkt":
            // (noch) keine Vielzahl an Werten
            break;
        case "vorgegebene_werte":
        case "janein":
        case "element_id":
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

            let filtern_klasse_neu;
            if (filtern_klasse_alt == "inklusiv") filtern_klasse_neu = "exklusiv";
            else if (filtern_klasse_alt == "exklusiv") filtern_klasse_neu = "inklusiv";

            if (!(filtern_klasse_neu in filtern_eigenschaft)) filtern_eigenschaft[filtern_klasse_neu] = new Array();
            if (!filtern_eigenschaft[filtern_klasse_neu].includes(filtern_wert)) filtern_eigenschaft[filtern_klasse_neu].push(filtern_wert);
            else {
                // filtern_wert steht bereits in filtern_klasse_neu (und stand auch schon in filtern_klasse_alt), d.h. irgendwas läuft schief
            }

            break;
    }

    // Überschreiben des value mit geänderten filtern_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern_prio_hoch))
            .trigger("change");

    // Aktualisieren der $filtern_eigenschaft
    const filtern_aktualisieren = Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste);
    let filtern_eigenschaft_aktualisieren;
    if (eigenschaft in filtern_aktualisieren) filtern_eigenschaft_aktualisieren = filtern_aktualisieren[eigenschaft];
    else filtern_eigenschaft_aktualisieren = new Object();
    Liste_FilternFormular$EigenschaftAktualisieren($filtern_eigenschaft, filtern_eigenschaft_aktualisieren, liste);
}
