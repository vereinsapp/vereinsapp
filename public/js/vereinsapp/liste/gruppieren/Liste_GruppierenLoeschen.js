function Liste_GruppierenLoeschen(dom, instanz, liste) {
    LISTEN[liste].instanz[instanz].gruppieren = undefined;

    Schnittstelle_EventAusfuehren(
        [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
        { liste: liste }
    );

    Schnittstelle_DomModalSchliessen(dom.$modal);
}
