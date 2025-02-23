function Liste_GruppierenAendern(formular_oeffnen, dom, title, instanz, liste) {
    if (formular_oeffnen) {
        const $neues_gruppieren_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "GRUPPIEREN");
        Schnittstelle_DomModalOeffnen($neues_gruppieren_modal);
        Liste_GruppierenFormularInitialisieren($neues_gruppieren_modal.find(".formular"), instanz, liste);
    } else {
        const gruppieren = dom.$formular.find(".gruppieren_eigenschaft").val();
        LISTEN[liste].instanz[instanz].gruppieren = gruppieren;
        Schnittstelle_EventAusfuehren(
            [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
            { liste: liste }
        );

        Schnittstelle_DomModalSchliessen(dom.$modal);
    }
}
