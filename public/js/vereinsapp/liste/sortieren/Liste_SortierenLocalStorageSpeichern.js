function Liste_SortierenLocalStorageSpeichern($quelle, instanz, liste) {
    let sortieren = $quelle.val();
    if (sortieren != "") sortieren = Schnittstelle_VariableWertBereinigtZurueck(sortieren);
    else sortieren = undefined;

    LISTEN[liste].instanz[instanz].sortieren = sortieren;

    Schnittstelle_EventAusfuehren(
        [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
        { liste: liste }
    );
}
