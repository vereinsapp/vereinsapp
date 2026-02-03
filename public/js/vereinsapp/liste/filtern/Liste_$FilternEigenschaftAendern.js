/**
 * @param {JQuery} $filtern_eigenschaft
 */

function Liste_$FilternEigenschaftAendern($filtern_eigenschaft) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-liste"), undefined);
    const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-eigenschaft"), undefined);
    const ziel_id = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.attr("data-ziel_id"), undefined);

    // Definition von bisherigem filtern_prio_niedrig und filtern_prio_hoch
    let filtern_prio_niedrig, filtern_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).attr("data-filtern_prio_niedrig"), new Object());
        filtern_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck($("#" + ziel_id).val(), new Object());
    } else {
        filtern_prio_niedrig = new Object();
        filtern_prio_hoch = new Object();
    }

    // Änderung von filtern_prio_hoch
    if (!(eigenschaft in filtern_prio_hoch)) filtern_prio_hoch[eigenschaft] = new Object();
    const filtern_eigenschaft = filtern_prio_hoch[eigenschaft];

    if (liste in EIGENSCHAFTEN && eigenschaft in EIGENSCHAFTEN[liste])
        switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
            case "text":
                // (noch) nicht möglich
                break;
            case "zahl":
            case "zeitpunkt":
                $.each(["start", "ende"], function (position, filtern_klasse) {
                    const neuer_filtern_wert = $filtern_eigenschaft.find(".filtern_" + filtern_klasse).val();
                    if (neuer_filtern_wert !== "") filtern_eigenschaft[filtern_klasse] = neuer_filtern_wert;
                    else delete filtern_eigenschaft[filtern_klasse];
                });
                break;
            case "vorgegebene_werte":
                const neuer_filtern_wert = Schnittstelle_VariableWertBereinigtZurueck($filtern_eigenschaft.find(".filtern_auswahl").val(), undefined);
                if (neuer_filtern_wert.length > 0) {
                    if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                    if (!filtern_eigenschaft.inklusiv.includes(neuer_filtern_wert)) filtern_eigenschaft.inklusiv.push(neuer_filtern_wert);
                }
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

    // Überschreiben des bisherigen filtern_prio_hoch mit geändertem filtern_prio_hoch
    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern_prio_hoch, new Object()))
            .trigger("change");

    // Aktualisieren der $filtern_eigenschaft
    const filtern_aktualisieren = Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste);
    let filtern_eigenschaft_aktualisieren;
    if (eigenschaft in filtern_aktualisieren) filtern_eigenschaft_aktualisieren = filtern_aktualisieren[eigenschaft];
    else filtern_eigenschaft_aktualisieren = new Object();
    Liste_FilternFormular$EigenschaftAktualisieren($filtern_eigenschaft, filtern_eigenschaft_aktualisieren, liste);
}
