function Liste_SortierenAendern(formular_oeffnen, dom, title, instanz, liste) {
    if (formular_oeffnen) {
        const $neues_sortieren_modal = Schnittstelle_DomNeuesModalInitialisiertZurueck(title, "SORTIEREN");
        Schnittstelle_DomModalOeffnen($neues_sortieren_modal);
        Liste_SortierenFormularInitialisieren($neues_sortieren_modal.find(".formular"), instanz, liste);
    } else {
        const sortieren = {
            richtung: Number(dom.$formular.find(".sortieren_richtung:checked").val()),
            eigenschaft: dom.$formular.find(".sortieren_eigenschaft").val(),
        };
        LISTEN[liste].instanz[instanz].sortieren = sortieren;
        Schnittstelle_EventAusfuehren(
            [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
            { liste: liste }
        );

        Schnittstelle_DomModalSchliessen(dom.$modal);
    }
}
