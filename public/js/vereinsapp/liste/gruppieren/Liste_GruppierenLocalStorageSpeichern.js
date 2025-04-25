function Liste_GruppierenLocalStorageSpeichern($quelle, instanz, liste) {
    let gruppieren = $quelle.val();
    if (gruppieren != "");
    else gruppieren = undefined;

    LISTEN[liste].instanz[instanz].gruppieren = gruppieren;

    Schnittstelle_EventAusfuehren(
        [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
        { liste: liste }
    );
}
