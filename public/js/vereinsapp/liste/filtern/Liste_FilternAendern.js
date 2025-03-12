function Liste_FilternAendern(formular_oeffnen, dom, title, instanz, liste) {
    if (formular_oeffnen) {
        const $neues_filtern_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "FILTERN");
        Schnittstelle_DomModalOeffnen($neues_filtern_modal);
        Liste_FilternFormularInitialisieren($neues_filtern_modal.find(".formular"), instanz, liste);
    } else {
        Schnittstelle_LogInDieKonsole("filtern wird jetzt gespeichert");

        const $eigenschaft = dom.$filtern_eigenschaft;
        const eigenschaft = $eigenschaft.attr("data-eigenschaft");

        const filtern_eigenschaft = new Object();
        switch (EIGENSCHAFTEN[liste][eigenschaft].typ) {
            case "text":
                // (noch) kein filtern möglich
                break;
            case "zahl":
            case "zeitpunkt":
                const filtern_start = $eigenschaft.find(".filtern_start").val();
                if (filtern_start != "") filtern_eigenschaft.start = filtern_start;
                const filtern_ende = $eigenschaft.find(".filtern_ende").val();
                if (filtern_ende != "") filtern_eigenschaft.ende = filtern_ende;
                break;
            case "vorgegebene_werte":
            case "element_id":
                break;
        }

        LISTEN[liste].instanz[instanz].filtern[eigenschaft] = Schnittstelle_VariableWertBereinigtZurueck(filtern_eigenschaft);

        Schnittstelle_EventAusfuehren(
            [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
            { liste: liste }
        );

        // Schnittstelle_DomModalSchliessen(dom.$modal);
    }
}
