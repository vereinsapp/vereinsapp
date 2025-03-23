function Liste_FilternFormularInitialisieren($formular, ziel_id, instanz, liste) {
    $formular.attr("data-liste", liste).attr("data-ziel_id", ziel_id).attr("data-instanz", instanz);

    $.each(FILTERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        const typ = EIGENSCHAFTEN[liste][eigenschaft].typ;
        const beschriftung = EIGENSCHAFTEN[liste][eigenschaft].beschriftung;

        const $neue_filtern_eigenschaft = FILTERN.$blanko_filtern_eigenschaft[typ].clone().removeClass("blanko invisible");

        $neue_filtern_eigenschaft.attr("data-eigenschaft", eigenschaft);
        $neue_filtern_eigenschaft.find(".beschriftung").text(beschriftung);

        if (typ == "vorgegebene_werte") {
            $neue_filtern_eigenschaft.find(".filtern_auswahl, .filtern_werte").empty();
            $("<option selected></option>").appendTo($neue_filtern_eigenschaft.find(".filtern_auswahl"));
            $.each(VORGEGEBENE_WERTE[liste][eigenschaft], function (wert, eigenschaften) {
                $('<option value="' + wert + '">' + eigenschaften.beschriftung + "</option>").appendTo(
                    $neue_filtern_eigenschaft.find(".filtern_auswahl")
                );
            });
        } else if (typ == "janein") {
            $neue_filtern_eigenschaft.find(".filtern_auswahl, .filtern_werte").empty();
            $("<option selected></option>").appendTo($neue_filtern_eigenschaft.find(".filtern_auswahl"));
            $.each(JANEIN, function (wert, eigenschaften) {
                $('<option value="' + wert + '">' + eigenschaften.beschriftung + "</option>").appendTo(
                    $neue_filtern_eigenschaft.find(".filtern_auswahl")
                );
            });
        }

        $neue_filtern_eigenschaft.appendTo($formular);
    });

    let filtern_prio_niedrig, filtern_prio_hoch;
    if (typeof instanz !== "undefined") {
        // Liste filtern
        filtern_prio_niedrig = $("#" + instanz + ".liste").attr("data-filtern");
        if (typeof filtern_prio_niedrig !== "undefined") filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_niedrig);
        else filtern_prio_niedrig = new Object();

        filtern_prio_hoch = LISTEN[liste].instanz[instanz].filtern;
    } else if (typeof ziel_id !== "undefined") {
        // Personenkreis beschränken
        const $ziel = $("#" + ziel_id);

        /* speziell für filtern_mitglieder bei termine */
        const kategorie = $ziel.closest('.formular[data-liste="termine"]').find('.eingabe[data-eingabe="kategorie"]').val();
        if (typeof kategorie !== "undefined" && kategorie in TERMINE_KATEGORIE_FILTERN_MITGLIEDER)
            filtern_prio_niedrig = TERMINE_KATEGORIE_FILTERN_MITGLIEDER[kategorie];
        else filtern_prio_niedrig = new Object();

        filtern_prio_hoch = $ziel.val();
        if (typeof filtern_prio_hoch !== "undefined" && isJson(filtern_prio_hoch)) filtern_prio_hoch = JSON.parse(filtern_prio_hoch);
        else filtern_prio_hoch = new Object();
    }

    $.each(Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste), function (eigenschaft, filtern_eigenschaft) {
        Liste_FilternFormularEigenschaftAktualisieren(
            $formular.find('.filtern_eigenschaft[data-eigenschaft="' + eigenschaft + '"]'),
            filtern_eigenschaft,
            liste
        );
    });
}
