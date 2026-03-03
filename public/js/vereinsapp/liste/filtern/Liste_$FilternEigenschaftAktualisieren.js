/**
 * @param {JQuery} $filtern_eigenschaft
 */

function Liste_$FilternEigenschaftAktualisieren($filtern_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("eigenschaft"), undefined);
    const $werkzeug = Schnittstelle_Dom$ZielZu$QuelleZurueck($filtern_eigenschaft);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            // Definition von filtern_eigenschaft
            const filtern_manipuliert = Liste_FilternManipuliertZurueck(
                Schnittstelle_VariableWertBereinigtZurueck($werkzeug.attr("filtern_basis"), new Object()),
                Schnittstelle_VariableWertBereinigtZurueck($werkzeug.val(), new Object()),
                liste,
            );
            if (!(eigenschaft in filtern_manipuliert)) filtern_manipuliert[eigenschaft] = new Object();
            const filtern_eigenschaft = filtern_manipuliert[eigenschaft];

            // Aktualisieren der $filtern_eigenschaft
            switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
                case "text":
                    // (noch) nicht möglich
                    break;
                case "zahl":
                case "zeitpunkt":
                    $.each(Object.keys(filtern_eigenschaft), function (position, filtern_klasse) {
                        const $filtern_klasse = $filtern_eigenschaft.find(".filtern_" + filtern_klasse);

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
                case "janein":
                    const $filtern_werte_janein = $filtern_eigenschaft.find(".filtern_werte").empty();

                    $.each(Object.keys(filtern_eigenschaft), function (position, filtern_klasse) {
                        $.each(filtern_eigenschaft[filtern_klasse], function (position, filtern_wert_janein) {
                            const $neuer_filtern_wert = FILTERN.$blanko_filtern_wert.clone().removeClass("blanko invisible");
                            $neuer_filtern_wert.attr("wert", Number(filtern_wert_janein));
                            const $neuer_filtern_wert_beschriftung = $neuer_filtern_wert.find(".filtern_wert_beschriftung").find(".beschriftung");
                            $neuer_filtern_wert_beschriftung.text(
                                Liste_WertNachEigenschaftFormatiertZurueck(JANEIN[Number(filtern_wert_janein)].wert, eigenschaft, liste),
                            );
                            if (filtern_klasse == "exklusiv") $neuer_filtern_wert_beschriftung.addClass("text-decoration-line-through");
                            else if (filtern_klasse == "inklusiv") $neuer_filtern_wert_beschriftung.removeClass("text-decoration-line-through");
                            $neuer_filtern_wert.appendTo($filtern_werte_janein);
                        });
                    });

                    $filtern_eigenschaft.find(".filtern_auswahl").val("");
                    break;
                case "vorgegebene_werte":
                    const $filtern_werte = $filtern_eigenschaft.find(".filtern_werte").empty();

                    $.each(Object.keys(filtern_eigenschaft), function (position, filtern_klasse) {
                        $.each(filtern_eigenschaft[filtern_klasse], function (position, filtern_wert) {
                            const $neuer_filtern_wert = FILTERN.$blanko_filtern_wert.clone().removeClass("blanko invisible");
                            $neuer_filtern_wert.attr("wert", filtern_wert);
                            const $neuer_filtern_wert_beschriftung = $neuer_filtern_wert.find(".filtern_wert_beschriftung").find(".beschriftung");
                            $neuer_filtern_wert_beschriftung.text(Liste_WertNachEigenschaftFormatiertZurueck(filtern_wert, eigenschaft, liste));
                            if (filtern_klasse == "exklusiv") $neuer_filtern_wert_beschriftung.addClass("text-decoration-line-through");
                            else if (filtern_klasse == "inklusiv") $neuer_filtern_wert_beschriftung.removeClass("text-decoration-line-through");
                            $neuer_filtern_wert.appendTo($filtern_werte);
                        });
                    });

                    $filtern_eigenschaft.find(".filtern_auswahl").val("");
                    break;
                case "element_id":
                case "element_ids":
                    // (noch) kein Filter setzen möglich
                    break;
            }
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$FilternEigenschaftAktualisieren: Eigenschaft " + eigenschaft + " existiert nicht in FILTERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$FilternEigenschaftAktualisieren: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );
}
