function Liste_FilternLoeschen(dom, instanz, liste) {
    const $eigenschaft = dom.$filtern_eigenschaft;
    const eigenschaft = $eigenschaft.attr("data-eigenschaft");

    delete LISTEN[liste].instanz[instanz].filtern[eigenschaft];

    let filtern_data = $("#" + instanz + ".liste").attr("data-filtern");
    if (typeof filtern_data !== "undefined") filtern_data = Schnittstelle_VariableWertBereinigtZurueck(filtern_data);
    else filtern_data = new Object();

    let filtern_eigenschaft;
    if (eigenschaft in filtern_data) filtern_eigenschaft = filtern_data[eigenschaft];
    else filtern_eigenschaft = new Object();

    Liste_FilternFormularEigenschaftAktualisieren($eigenschaft, filtern_eigenschaft, liste);

    Schnittstelle_EventAusfuehren(
        [Schnittstelle_EventVariableUpdLocalstorage, Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom],
        { liste: liste }
    );
}
