function Liste_FilternAendern(formular_oeffnen, dom, title, instanz, liste) {
    if (formular_oeffnen) {
        const $neues_filtern_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "FILTERN");
        Schnittstelle_DomModalOeffnen($neues_filtern_modal);
        Liste_FilternFormularInitialisieren($neues_filtern_modal.find(".formular"), instanz, liste);
    } else {
        const $eigenschaft = dom.$filtern_eigenschaft;
        const eigenschaft = $eigenschaft.attr("data-eigenschaft");

        const filtern = LISTEN[liste].instanz[instanz].filtern;
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

        Schnittstelle_EventAusfuehren(
            [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
            { liste: liste }
        );
    }
}
