function Liste_FilternAendern(formular_oeffnen, dom, title, ziel_id, instanz, liste) {
    if (formular_oeffnen) {
        const $neues_filtern_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "FILTERN");
        Schnittstelle_DomModalOeffnen($neues_filtern_modal);
        Liste_FilternFormularInitialisieren($neues_filtern_modal.find(".formular"), ziel_id, instanz, liste);
    } else {
        const $eigenschaft = dom.$filtern_eigenschaft;
        const eigenschaft = $eigenschaft.attr("data-eigenschaft");

        let filtern;
        if (typeof instanz !== "undefined") filtern = LISTEN[liste].instanz[instanz].filtern; // Liste filtern
        else if (typeof ziel_id !== "undefined") {
            // Personenkreis beschränken
            filtern = $("#" + ziel_id).val();
            if (typeof filtern !== "undefined" && isJson(filtern)) filtern = JSON.parse(filtern);
            else filtern = new Object();
        }

        if (!(eigenschaft in filtern)) filtern[eigenschaft] = new Object();
        const filtern_eigenschaft = filtern[eigenschaft];

        switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
            case "text":
                // (noch) kein filtern möglich
                break;
            case "zahl":
            case "zeitpunkt":
                $.each(["start", "ende"], function (position, filtern_klasse) {
                    const neuer_filtern_wert = $eigenschaft.find(".filtern_" + filtern_klasse).val();
                    if (neuer_filtern_wert != "") filtern_eigenschaft[filtern_klasse] = neuer_filtern_wert;
                    else delete filtern_eigenschaft[filtern_klasse];
                });
                break;
            case "janein":
                let neuer_filtern_wert_janein = $eigenschaft.find(".filtern_auswahl").val();
                if (neuer_filtern_wert_janein != "") {
                    neuer_filtern_wert_janein = Schnittstelle_VariableWertBereinigtZurueck(neuer_filtern_wert_janein);

                    if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                    if (!filtern_eigenschaft.inklusiv.includes(JANEIN[neuer_filtern_wert_janein].wert)) {
                        filtern_eigenschaft.inklusiv.push(JANEIN[neuer_filtern_wert_janein].wert);

                        const $neuer_filtern_wert = FILTERN.$blanko_filtern_wert.clone().removeClass("blanko invisible");
                        $neuer_filtern_wert.attr("data-wert", neuer_filtern_wert_janein);
                        $neuer_filtern_wert
                            .find(".beschriftung")
                            .text(Liste_WertFormatiertZurueck(JANEIN[neuer_filtern_wert_janein].wert, eigenschaft, liste));
                        $neuer_filtern_wert.appendTo($eigenschaft.find(".filtern_werte"));
                    }
                }
                break;
            case "vorgegebene_werte":
            case "element_id":
                let neuer_filtern_wert = $eigenschaft.find(".filtern_auswahl").val();
                if (neuer_filtern_wert != "") {
                    neuer_filtern_wert = Schnittstelle_VariableWertBereinigtZurueck(neuer_filtern_wert);

                    if (!("inklusiv" in filtern_eigenschaft)) filtern_eigenschaft.inklusiv = new Array();
                    if (!filtern_eigenschaft.inklusiv.includes(neuer_filtern_wert)) {
                        filtern_eigenschaft.inklusiv.push(neuer_filtern_wert);

                        const $neuer_filtern_wert = FILTERN.$blanko_filtern_wert.clone().removeClass("blanko invisible");
                        $neuer_filtern_wert.attr("data-wert", neuer_filtern_wert);
                        $neuer_filtern_wert.find(".beschriftung").text(Liste_WertFormatiertZurueck(neuer_filtern_wert, eigenschaft, liste));
                        $neuer_filtern_wert.appendTo($eigenschaft.find(".filtern_werte"));
                    }
                }
                break;
        }

        if (Object.keys(filtern_eigenschaft).length === 0) delete filtern[eigenschaft];

        if (typeof instanz !== "undefined") LISTEN[liste].instanz[instanz].filtern = filtern; // Liste filtern
        else if (typeof ziel_id !== "undefined") $("#" + ziel_id).val(JsonStringifiedZurueck(filtern)); // Personenkreis beschränken

        Schnittstelle_EventAusfuehren(
            [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
            { liste: liste }
        );
    }
}
