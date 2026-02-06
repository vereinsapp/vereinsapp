/**
 * @param {JQuery} $filtern_eigenschaft
 */

function Liste_$FilternEigenschaftAendern($filtern_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-eigenschaft"), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $filtern_manip = Schnittstelle_Dom$ZielZu$QuelleZurueck($filtern_eigenschaft);

            // Definition von filtern_manip
            const filtern_manip = Schnittstelle_VariableWertBereinigtZurueck($filtern_manip.val(), new Object());
            if (!(eigenschaft in filtern_manip)) filtern_manip[eigenschaft] = new Object();

            // Ändern von filtern_manip
            const filtern_eigenschaft = filtern_manip[eigenschaft];
            switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
                case "text":
                    // (noch) nicht möglich
                    break;
                case "zahl":
                case "zeitpunkt":
                    $.each(["start", "ende"], function (position, filtern_klasse) {
                        const neuer_filtern_wert = Schnittstelle_VariableWertBereinigtZurueck(
                            $filtern_eigenschaft.find(".filtern_" + filtern_klasse).val(),
                            undefined,
                        );
                        if (neuer_filtern_wert !== "") filtern_eigenschaft[filtern_klasse] = neuer_filtern_wert;
                        else delete filtern_eigenschaft[filtern_klasse];
                    });
                    break;
                case "janein":
                    const neuer_filtern_wert_janein = Schnittstelle_VariableWertBereinigtZurueck(
                        $filtern_eigenschaft.find(".filtern_auswahl").val(),
                        undefined,
                    );
                    if (neuer_filtern_wert_janein === 0 || neuer_filtern_wert_janein === 1) {
                        if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                        if (!filtern_eigenschaft.inklusiv.includes(JANEIN[neuer_filtern_wert_janein].wert))
                            filtern_eigenschaft.inklusiv.push(JANEIN[neuer_filtern_wert_janein].wert);
                    }
                    break;
                case "vorgegebene_werte":
                    const neuer_filtern_wert = Schnittstelle_VariableWertBereinigtZurueck(
                        $filtern_eigenschaft.find(".filtern_auswahl").val(),
                        undefined,
                    );
                    if (neuer_filtern_wert.length > 0) {
                        if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                        if (!filtern_eigenschaft.inklusiv.includes(neuer_filtern_wert)) filtern_eigenschaft.inklusiv.push(neuer_filtern_wert);
                    }
                    break;
                case "element_id":
                case "element_ids":
                    const neuer_filtern_wert_id = Schnittstelle_VariableWertBereinigtZurueck(
                        $filtern_eigenschaft.find(".filtern_auswahl").val(),
                        undefined,
                    );
                    if (neuer_filtern_wert_id > 0) {
                        if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                        if (!filtern_eigenschaft.inklusiv.includes(neuer_filtern_wert_id)) filtern_eigenschaft.inklusiv.push(neuer_filtern_wert_id);
                    }
                    break;
            }

            // Überschreiben des bisherigen filtern_manip mit geändertem filtern_manip
            $filtern_manip.val(JsonStringifiedZurueck(filtern_manip, new Object())).trigger("change");

            // Aktualisieren der $filtern_eigenschaft
            Liste_$FilternEigenschaftAktualisieren($filtern_eigenschaft);
        } else
            Schnittstelle_LogInDieKonsole(
                "Liste_$FilternEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in FILTERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else
        Schnittstelle_LogInDieKonsole(
            "Liste_$FilternEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!",
        );
}
