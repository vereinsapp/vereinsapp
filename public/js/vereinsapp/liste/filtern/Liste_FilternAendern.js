function Liste_FilternAendern(formular_oeffnen, dom, title, instanz, liste) {
    if (formular_oeffnen) {
        const $neues_filtern_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "FILTERN");
        Schnittstelle_DomModalOeffnen($neues_filtern_modal);
        Liste_FilternFormularInitialisieren($neues_filtern_modal.find(".formular"), instanz, liste);
    } else {
        Schnittstelle_LogInDieKonsole("filtern wird jetzt gespeichert");

        // const eigenschaft = dom.$filtern_eigenschaft.attr("data-eigenschaft");

        // todo: abhängig machen von eigenschaft!
        // const filtern_eigenschaft = {
        //     verknuepfung: "&&",
        //     filtern: new Object(),
        // };

        // $.each(dom.$filtern_eigenschaft.find(".filtern_wert"), function () {
        //     const $filtern_wert = $(this);

        //     if ($filtern_wert.val() != "")
        //         filtern_eigenschaft.filtern.push({
        //             operator: $filtern_wert.attr("data-operator"),
        //             wert: Schnittstelle_VariableWertBereinigtZurueck($filtern_wert.val()),
        //         });
        // });

        // LISTEN[liste].instanz[instanz].filtern[eigenschaft] = filtern_eigenschaft;

        Schnittstelle_EventAusfuehren(
            [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
            { liste: liste }
        );

        // Schnittstelle_DomModalSchliessen(dom.$modal);
    }
}
