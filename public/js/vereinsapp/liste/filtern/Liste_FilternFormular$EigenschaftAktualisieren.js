function Liste_FilternFormular$EigenschaftAktualisieren($eigenschaft, filtern_eigenschaft, liste) {
    const eigenschaft = $eigenschaft.attr("data-eigenschaft");

    if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft))
        switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
            case "text":
                // (noch) kein filtern möglich
                break;
            case "zahl":
            case "zeitpunkt":
                $.each(["start", "ende"], function (position, filtern_klasse) {
                    const $filtern_klasse = $eigenschaft.find(".filtern_" + filtern_klasse);

                    let wert_formatiert;
                    if (filtern_klasse in filtern_eigenschaft) {
                        wert_formatiert = filtern_eigenschaft[filtern_klasse];
                        // Wenn aber die Eigenschaft ein Datum ist
                        if ($filtern_klasse.attr("type") == "date") wert_formatiert = filtern_eigenschaft[filtern_klasse].toISODate();
                        // Oder wenn aber die Eigenschaft eine Uhrzeit ist
                        else if ($filtern_klasse.attr("type") == "time")
                            wert_formatiert = filtern_eigenschaft[filtern_klasse].set({ seconds: 0, milliseconds: 0 }).toISOTime({
                                includeOffset: false,
                                suppressSeconds: true,
                                suppressMilliseconds: true,
                            });
                        // Oder wenn aber die Eigenschaft ein Datum und eine Uhrzeit ist
                        else if ($filtern_klasse.attr("type") == "datetime-local")
                            wert_formatiert = filtern_eigenschaft[filtern_klasse].set({ seconds: 0, milliseconds: 0 }).toISO({
                                includeOffset: false,
                                suppressSeconds: true,
                                suppressMilliseconds: true,
                            });
                    } else wert_formatiert = "";

                    $filtern_klasse.val(wert_formatiert);
                });
                break;
            case "vorgegebene_werte":
                const $filtern_werte = $eigenschaft.find(".filtern_werte").empty();

                $.each(Object.keys(filtern_eigenschaft), function (position, filtern_klasse) {
                    $.each(filtern_eigenschaft[filtern_klasse], function (position, filtern_wert) {
                        const $neuer_filtern_wert = FILTERN.$blanko_filtern_wert.clone().removeClass("blanko invisible");
                        $neuer_filtern_wert.attr("data-wert", filtern_wert);
                        $neuer_filtern_wert.find(".beschriftung").text(Liste_WertFormatiertZurueck(filtern_wert, eigenschaft, liste));
                        if (filtern_klasse == "exklusiv") $neuer_filtern_wert.find(".beschriftung").addClass("text-decoration-line-through");
                        else if (filtern_klasse == "inklusiv") $neuer_filtern_wert.find(".beschriftung").removeClass("text-decoration-line-through");
                        $neuer_filtern_wert.appendTo($filtern_werte);
                    });
                });

                $eigenschaft.find(".filtern_auswahl").val("");
                break;
            case "janein":
                const $filtern_werte_janein = $eigenschaft.find(".filtern_werte").empty();

                $.each(Object.keys(filtern_eigenschaft), function (position, filtern_klasse) {
                    $.each(filtern_eigenschaft[filtern_klasse], function (position, filtern_wert_janein) {
                        const $neuer_filtern_wert_janein = FILTERN.$blanko_filtern_wert.clone().removeClass("blanko invisible");
                        $neuer_filtern_wert_janein.attr("data-wert", Number(filtern_wert_janein));
                        $neuer_filtern_wert_janein
                            .find(".beschriftung")
                            .text(Liste_WertFormatiertZurueck(JANEIN[Number(filtern_wert_janein)].wert, eigenschaft, liste));
                        if (filtern_klasse == "exklusiv") $neuer_filtern_wert_janein.find(".beschriftung").addClass("text-decoration-line-through");
                        else if (filtern_klasse == "inklusiv")
                            $neuer_filtern_wert_janein.find(".beschriftung").removeClass("text-decoration-line-through");
                        $neuer_filtern_wert_janein.appendTo($filtern_werte_janein);
                    });
                });

                $eigenschaft.find(".filtern_auswahl").val("");
                break;
            case "element_id":
            case "element_ids":
                // (noch) kein filtern möglich
                break;
        }
    else
        Schnittstelle_LogInDieKonsole(
            "Es wurde versucht, die Eigenschaft " + eigenschaft + " zu aktualisieren, die nicht existiert in FILTERBARE_EIGENSCHAFTEN."
        );
}
