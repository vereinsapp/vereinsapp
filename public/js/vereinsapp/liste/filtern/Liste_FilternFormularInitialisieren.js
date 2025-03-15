function Liste_FilternFormularInitialisieren($formular, instanz, liste) {
    // const $filtern_eigenschaft = $formular.find(".filtern_eigenschaft");

    $formular.attr("data-liste", liste).attr("data-instanz", instanz);

    $.each(FILTERBARE_EIGENSCHAFTEN[liste], function (index, eigenschaft) {
        const typ = EIGENSCHAFTEN[liste][eigenschaft].typ;
        const beschriftung = EIGENSCHAFTEN[liste][eigenschaft].beschriftung;

        const $neue_filtern_eigenschaft = FILTERN.$blanko_filtern_eigenschaft[typ].clone().removeClass("blanko invisible");

        $neue_filtern_eigenschaft.attr("data-eigenschaft", eigenschaft);
        $neue_filtern_eigenschaft.find(".beschriftung").text(beschriftung);

        if (typ == "vorgegebene_werte") {
            $neue_filtern_eigenschaft.find(".filtern_auswahl").empty();
            $.each(VORGEGEBENE_WERTE[liste][eigenschaft], function (wert, eigenschaften) {
                $('<option value="' + wert + '">' + eigenschaften.beschriftung + "</option>").appendTo(
                    $neue_filtern_eigenschaft.find(".filtern_auswahl")
                );
            });
        }

        $neue_filtern_eigenschaft.appendTo($formular);
    });

    let filtern = LISTEN[liste].instanz[instanz].filtern;
    if (Object.keys(filtern).length === 0) {
        filtern = $("#" + instanz + ".liste").attr("data-filtern");
        if (typeof filtern !== "undefined") filtern = Schnittstelle_VariableWertBereinigtZurueck(filtern);
    }

    if (typeof filtern !== "undefined")
        $.each(filtern, function (eigenschaft, filtern_eigenschaft) {
            const $eigenschaft = $formular.find('.filtern_eigenschaft[data-eigenschaft="' + eigenschaft + '"]');

            switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
                case "text":
                    // (noch) kein filtern möglich
                    break;
                case "zahl":
                case "zeitpunkt":
                    $.each(Object.keys(filtern_eigenschaft), function (position, filtern_klasse) {
                        const $filtern = $eigenschaft.find(".filtern_" + filtern_klasse);

                        let wert_formatiert = filtern_eigenschaft[filtern_klasse];
                        // Wenn aber die Eigenschaft ein Datum ist
                        if ($filtern.attr("type") == "date") wert_formatiert = filtern_eigenschaft[filtern_klasse].toISODate();
                        // Oder wenn aber die Eigenschaft eine Uhrzeit ist
                        else if ($filtern.attr("type") == "time")
                            wert_formatiert = filtern_eigenschaft[filtern_klasse].set({ seconds: 0, milliseconds: 0 }).toISOTime({
                                includeOffset: false,
                                suppressSeconds: true,
                                suppressMilliseconds: true,
                            });
                        // Oder wenn aber die Eigenschaft ein Datum und eine Uhrzeit ist
                        else if ($filtern.attr("type") == "datetime-local")
                            wert_formatiert = filtern_eigenschaft[filtern_klasse].set({ seconds: 0, milliseconds: 0 }).toISO({
                                includeOffset: false,
                                suppressSeconds: true,
                                suppressMilliseconds: true,
                            });

                        $filtern.val(wert_formatiert);
                    });
                    break;
                case "vorgegebene_werte":
                    break;
                case "element_id":
                    break;
            }
        });
}
