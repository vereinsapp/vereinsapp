function Liste_FilternWertLoeschen($filtern_wert, ziel_id, liste) {
    let filtern_wert = Schnittstelle_VariableWertBereinigtZurueck($filtern_wert.attr("data-wert"));
    const $filtern_eigenschaft = $filtern_wert.closest(".filtern_eigenschaft");
    const eigenschaft = $filtern_eigenschaft.attr("data-eigenschaft");

    let filtern;
    if (typeof ziel_id !== "undefined") {
        filtern = $("#" + ziel_id).val();
        if (typeof filtern !== "undefined" && isJson(filtern)) filtern = JSON.parse(filtern);
        else filtern = new Object();
    } else filtern = new Object();

    const filtern_eigenschaft = filtern[eigenschaft];

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
            if (EIGENSCHAFTEN[liste][eigenschaft].typ == "janein") filtern_wert = JANEIN[filtern_wert].wert;

            let filtern_klasse_alt, filtern_wert_position;
            $.each(["inklusiv", "exklusiv"], function (position, filtern_klasse) {
                if (filtern_klasse in filtern_eigenschaft && filtern_eigenschaft[filtern_klasse].includes(filtern_wert)) {
                    filtern_wert_position = filtern_eigenschaft[filtern_klasse].indexOf(filtern_wert);
                    filtern_klasse_alt = filtern_klasse;
                    return;
                }
            });

            filtern_eigenschaft[filtern_klasse_alt].splice(filtern_wert_position, 1);
            if (filtern_eigenschaft[filtern_klasse_alt].length === 0) delete filtern_eigenschaft[filtern_klasse_alt];

            break;
    }

    if (Object.keys(filtern_eigenschaft).length === 0) delete filtern[eigenschaft];

    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern))
            .trigger("change");

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

    const filtern_kombiniert = Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste);
    let filtern_kombiniert_eigenschaft;
    if (eigenschaft in filtern_kombiniert) filtern_kombiniert_eigenschaft = filtern_kombiniert[eigenschaft];
    else filtern_kombiniert_eigenschaft = new Object();

    Liste_FilternFormular$EigenschaftAktualisieren($filtern_eigenschaft, filtern_kombiniert_eigenschaft, liste);
}
