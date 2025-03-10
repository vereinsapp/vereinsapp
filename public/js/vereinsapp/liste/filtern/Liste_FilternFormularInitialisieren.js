function Liste_FilternFormularInitialisieren($formular, instanz, liste) {
    const $filtern_eigenschaft = $formular.find(".filtern_eigenschaft");

    $formular.attr("data-liste", liste).attr("data-instanz", instanz);

    $.each(FILTERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        const typ = EIGENSCHAFTEN[liste][eigenschaft].typ;
        const beschriftung = EIGENSCHAFTEN[liste][eigenschaft].beschriftung;

        const $neue_filtern_eigenschaft = FILTERN.$blanko_filtern_eigenschaft[typ].clone().removeClass("blanko invisible");

        $neue_filtern_eigenschaft.attr("data-eigenschaft", eigenschaft);
        $neue_filtern_eigenschaft.find(".beschriftung").text(beschriftung);

        if (typ == "vorgegebene_werte") {
            $neue_filtern_eigenschaft.find(".filtern_wert").empty();
            $.each(VORGEGEBENE_WERTE[liste][eigenschaft], function (wert, eigenschaften) {
                $('<option value="' + wert + '">' + eigenschaften.beschriftung + "</option>").appendTo(
                    $neue_filtern_eigenschaft.find(".filtern_wert")
                );
            });
        }

        $neue_filtern_eigenschaft.appendTo($formular);
    });

    let filtern = LISTEN[liste].instanz[instanz].filtern;
    if (typeof filtern === "undefined") {
        filtern = $("#" + instanz + ".liste").attr("data-filtern");
        if (typeof filtern !== "undefined") filtern = JSON.parse(filtern);
    }

    if (typeof filtern !== "undefined") {
    }
}
