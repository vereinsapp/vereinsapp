function Liste_FilternFormularInitialisieren($formular, ziel_id, liste) {
    const $vorgegebene_filter = $formular.find(".vorgegebene_filter");
    const $vorgegebene_filter_auswahl = $vorgegebene_filter.find(".vorgegebene_filter_auswahl");
    $vorgegebene_filter_auswahl.empty();
    if (liste in VORGEGEBENE_FILTER) {
        $("<option selected></option>").appendTo($vorgegebene_filter_auswahl);
        $.each(VORGEGEBENE_FILTER[liste], function (vorgegebene_filter_id, eigenschaften) {
            $('<option value="' + vorgegebene_filter_id + '">' + eigenschaften.beschriftung + "</option>").appendTo($vorgegebene_filter_auswahl);
        });

        $vorgegebene_filter.attr("data-liste", liste).attr("data-ziel_id", ziel_id).removeClass("invisible");
    } else $vorgegebene_filter.addClass("invisible");

    $formular.find(".filtern_eigenschaft").remove();
    $.each(FILTERBARE_EIGENSCHAFTEN[liste], function (position, eigenschaft) {
        const typ = EIGENSCHAFTEN[liste][eigenschaft].typ;
        const beschriftung = EIGENSCHAFTEN[liste][eigenschaft].beschriftung;

        const $neue_filtern_eigenschaft = FILTERN.$blanko_filtern_eigenschaft[typ].clone().removeClass("blanko invisible");

        $neue_filtern_eigenschaft.attr("data-eigenschaft", eigenschaft).attr("data-liste", liste).attr("data-ziel_id", ziel_id);
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

    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern_kombiniert))
            .trigger("change");

    $.each(filtern_kombiniert, function (eigenschaft, filtern_eigenschaft) {
        Liste_FilternFormular$EigenschaftAktualisieren(
            $formular.find('.filtern_eigenschaft[data-eigenschaft="' + eigenschaft + '"]'),
            filtern_eigenschaft,
            liste
        );
    });
}
