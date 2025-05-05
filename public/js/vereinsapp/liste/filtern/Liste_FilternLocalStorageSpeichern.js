function Liste_FilternLocalStorageSpeichern(filtern, instanz, liste) {
    if (typeof filtern !== "undefined" && filtern != "") filtern = Schnittstelle_VariableWertBereinigtZurueck(filtern);
    else filtern = new Object();

    LISTEN[liste].instanz[instanz].filtern = filtern;

    Schnittstelle_EventAusfuehren(
        [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
        { liste: liste }
    );
}
