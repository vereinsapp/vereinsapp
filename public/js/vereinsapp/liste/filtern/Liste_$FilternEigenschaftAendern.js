/**
 * @param {JQuery} $filtern_eigenschaft
 */

function Liste_$FilternEigenschaftAendern($filtern_eigenschaft) {
    const liste = Liste_WertBereinigtZurueck($filtern_eigenschaft.attr("liste"), undefined);
    const eigenschaft = Liste_WertBereinigtZurueck($filtern_eigenschaft.attr("eigenschaft"), undefined);

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste]) {
        if (liste in FILTERBARE_EIGENSCHAFTEN && FILTERBARE_EIGENSCHAFTEN[liste].includes(eigenschaft)) {
            const $werkzeug = Dom_$ZielZu$QuelleZurueck($filtern_eigenschaft);

            // Definition von filtern_manip
            const filtern_manip = Liste_WertBereinigtZurueck($werkzeug.val(), new Object());
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
                        const neuer_filtern_wert = Liste_WertBereinigtZurueck(
                            $filtern_eigenschaft.find(".filtern_" + filtern_klasse).val(),
                            undefined,
                        );
                        if (neuer_filtern_wert !== "") filtern_eigenschaft[filtern_klasse] = neuer_filtern_wert;
                        else delete filtern_eigenschaft[filtern_klasse];
                    });
                    break;
                case "janein":
                    const neuer_filtern_wert_janein = Liste_WertBereinigtZurueck($filtern_eigenschaft.find(".filtern_auswahl").val(), undefined);
                    if (neuer_filtern_wert_janein === 0 || neuer_filtern_wert_janein === 1) {
                        if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                        if (!filtern_eigenschaft.inklusiv.includes(JANEIN[neuer_filtern_wert_janein].wert))
                            filtern_eigenschaft.inklusiv.push(JANEIN[neuer_filtern_wert_janein].wert);
                    }
                    break;
                case "vorgegebene_werte":
                    const neuer_filtern_wert = Liste_WertBereinigtZurueck($filtern_eigenschaft.find(".filtern_auswahl").val(), undefined);
                    if (neuer_filtern_wert.length > 0) {
                        if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                        if (!filtern_eigenschaft.inklusiv.includes(neuer_filtern_wert)) filtern_eigenschaft.inklusiv.push(neuer_filtern_wert);
                    }
                    break;
                case "element_id":
                case "element_ids":
                    const neuer_filtern_wert_id = Liste_WertBereinigtZurueck($filtern_eigenschaft.find(".filtern_auswahl").val(), undefined);
                    if (neuer_filtern_wert_id > 0) {
                        if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                        if (!filtern_eigenschaft.inklusiv.includes(neuer_filtern_wert_id)) filtern_eigenschaft.inklusiv.push(neuer_filtern_wert_id);
                    }
                    break;
            }

            // Überschreiben des bisherigen filtern_manip mit geändertem filtern_manip
            $werkzeug.val(JsonStringifiedZurueck(filtern_manip, new Object())).trigger("change");

            // Aktualisieren der $filtern_eigenschaft
            Liste_$FilternEigenschaftAktualisieren($filtern_eigenschaft);
        } else
            Log_InDieKonsole(
                "Liste_$FilternEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in FILTERBARE_EIGENSCHAFTEN." + liste + "!",
            );
    } else Log_InDieKonsole("Liste_$FilternEigenschaftAendern: Eigenschaft " + eigenschaft + " existiert nicht in EIGENSCHAFTEN." + liste + "!");
}
