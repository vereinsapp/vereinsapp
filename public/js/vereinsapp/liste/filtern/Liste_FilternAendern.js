function Liste_FilternAendern(formular_oeffnen, $quelle_ziel, title, ziel_id, liste) {
    if (formular_oeffnen) {
        const $ziel = $quelle_ziel;
        const ziel_id = zufaelligeZeichenketteZurueck(8);

        $ziel.attr("id", ziel_id);

        const $neues_filtern_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "FILTERN");
        Schnittstelle_DomModalOeffnen($neues_filtern_modal);
        Liste_FilternFormularInitialisieren($neues_filtern_modal.find(".formular"), ziel_id, liste);
    } else {
        const $filtern_eigenschaft = $quelle_ziel;
        const eigenschaft = $filtern_eigenschaft.attr("data-eigenschaft");

        let filtern;
        if (typeof ziel_id !== "undefined") {
            filtern = $("#" + ziel_id).val();
            if (typeof filtern !== "undefined" && isJson(filtern)) filtern = JSON.parse(filtern);
            else filtern = new Object();
        } else filtern = new Object();

        if (!(eigenschaft in filtern)) filtern[eigenschaft] = new Object();
        const filtern_eigenschaft = filtern[eigenschaft];

        switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
            case "text":
                // (noch) kein filtern möglich
                break;
            case "zahl":
            case "zeitpunkt":
                $.each(["start", "ende"], function (position, filtern_klasse) {
                    const neuer_filtern_wert = $filtern_eigenschaft.find(".filtern_" + filtern_klasse).val();
                    if (neuer_filtern_wert != "") filtern_eigenschaft[filtern_klasse] = neuer_filtern_wert;
                    else delete filtern_eigenschaft[filtern_klasse];
                });
                break;
            case "janein":
                let neuer_filtern_wert_janein = $filtern_eigenschaft.find(".filtern_auswahl").val();
                if (neuer_filtern_wert_janein != "") {
                    neuer_filtern_wert_janein = Schnittstelle_VariableWertBereinigtZurueck(neuer_filtern_wert_janein);
                    if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                    if (!filtern_eigenschaft.inklusiv.includes(JANEIN[neuer_filtern_wert_janein].wert))
                        filtern_eigenschaft.inklusiv.push(JANEIN[neuer_filtern_wert_janein].wert);
                }
                break;
            case "vorgegebene_werte":
            case "element_id":
                let neuer_filtern_wert = $filtern_eigenschaft.find(".filtern_auswahl").val();
                if (neuer_filtern_wert != "") {
                    neuer_filtern_wert = Schnittstelle_VariableWertBereinigtZurueck(neuer_filtern_wert);
                    if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                    if (!filtern_eigenschaft.inklusiv.includes(neuer_filtern_wert)) filtern_eigenschaft.inklusiv.push(neuer_filtern_wert);
                }
                break;
        }

        if (Object.keys(filtern_eigenschaft).length === 0) delete filtern[eigenschaft];

        if (typeof ziel_id !== "undefined") $("#" + ziel_id).val(JsonStringifiedZurueck(filtern));

        let filtern_prio_niedrig, filtern_prio_hoch;
        if (typeof ziel_id !== "undefined") {
            filtern_prio_niedrig = $("#" + ziel_id).attr("data-filtern_prio_niedrig");
            if (typeof filtern_prio_niedrig !== "undefined") filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_niedrig);
            else filtern_prio_niedrig = new Object();

            filtern_prio_hoch = $("#" + ziel_id).val();
            if (typeof filtern_prio_hoch !== "undefined" && isJson(filtern_prio_hoch)) filtern_prio_hoch = JSON.parse(filtern_prio_hoch);
            else filtern_prio_hoch = new Object();
        } else {
            filtern_prio_niedrig = new Object();
            filtern_prio_hoch = new Object();
        }

        const filtern_kombiniert = Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste);
        let filtern_kombiniert_eigenschaft;
        if (eigenschaft in filtern_kombiniert) filtern_kombiniert_eigenschaft = filtern_kombiniert[eigenschaft];
        else filtern_kombiniert_eigenschaft = new Object();

        Liste_FilternFormular$EigenschaftAktualisieren($filtern_eigenschaft, filtern_kombiniert_eigenschaft, liste);
    }
}
