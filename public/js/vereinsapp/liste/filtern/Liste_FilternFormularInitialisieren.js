function Liste_FilternFormularInitialisieren($formular, instanz, liste) {
    $formular.attr("data-liste", liste).attr("data-instanz", instanz);

    $.each(FILTERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
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
        }

        $neue_filtern_eigenschaft.appendTo($formular);
    });

    let filtern_data = $("#" + instanz + ".liste").attr("data-filtern");
    if (typeof filtern_data !== "undefined") filtern_data = Schnittstelle_VariableWertBereinigtZurueck(filtern_data);
    else filtern_data = new Object();
    // filtern aus LocalStorage
    const filtern_LocalStorage = LISTEN[liste].instanz[instanz].filtern;

    $.each(Liste_FilternMitPrioKombiniertZurueck(filtern_data, filtern_LocalStorage, liste), function (eigenschaft, filtern_eigenschaft) {
        Liste_FilternFormularEigenschaftAktualisieren(
            $formular.find('.filtern_eigenschaft[data-eigenschaft="' + eigenschaft + '"]'),
            filtern_eigenschaft,
            liste
        );
    });
}
