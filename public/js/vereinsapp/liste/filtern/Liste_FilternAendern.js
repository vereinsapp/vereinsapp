function Liste_FilternAendern(formular_oeffnen, dom, title, instanz, liste) {
    if (formular_oeffnen) {
        const $neues_filtern_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "FILTERN");
        Schnittstelle_DomModalOeffnen($neues_filtern_modal);
        Liste_FilternFormularInitialisieren($neues_filtern_modal.find(".formular"), instanz, liste);
    } else {
        const $eigenschaft = dom.$filtern_eigenschaft;
        const eigenschaft = $eigenschaft.attr("data-eigenschaft");

        const filtern_eigenschaft = new Object();
        switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
            case "text":
                // (noch) kein filtern möglich
                break;
            case "zahl":
            case "zeitpunkt":
                $.each(["start", "ende"], function (position, filtern_klasse) {
                    const filtern = $eigenschaft.find(".filtern_" + filtern_klasse).val();
                    if (filtern != "") filtern_eigenschaft[filtern_klasse] = filtern;
                });
                break;
            case "vorgegebene_werte":
            case "element_id":
                break;
        }

        if (Object.keys(filtern_eigenschaft).length > 0)
            LISTEN[liste].instanz[instanz].filtern[eigenschaft] = Schnittstelle_VariableWertBereinigtZurueck(filtern_eigenschaft);
        else delete LISTEN[liste].instanz[instanz].filtern[eigenschaft];

        Schnittstelle_EventAusfuehren(
            [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
            { liste: liste }
        );

        Schnittstelle_DomModalSchliessen(dom.$modal);
    }
}
