function Liste_FilternEigenschaftLoeschen($filtern_eigenschaft, ziel_id, liste) {
    const eigenschaft = $filtern_eigenschaft.attr("data-eigenschaft");

    let filtern;
    if (typeof ziel_id !== "undefined") {
        filtern = $("#" + ziel_id).val();
        if (typeof filtern !== "undefined" && isJson(filtern)) filtern = JSON.parse(filtern);
        else filtern = new Object();
    } else filtern = new Object();

    delete filtern[eigenschaft];

    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern))
            .trigger("change");

    let filtern_prio_niedrig;
    if (typeof ziel_id !== "undefined") {
        filtern_prio_niedrig = $("#" + ziel_id).attr("data-filtern_prio_niedrig");
        if (typeof filtern_prio_niedrig !== "undefined") filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_niedrig);
        else filtern_prio_niedrig = new Object();
    } else {
        filtern_prio_niedrig = new Object();
    }

    let filtern_prio_niedrig_eigenschaft;
    if (eigenschaft in filtern_prio_niedrig) filtern_prio_niedrig_eigenschaft = filtern_prio_niedrig[eigenschaft];
    else filtern_prio_niedrig_eigenschaft = new Object();

    Liste_FilternFormular$EigenschaftAktualisieren($filtern_eigenschaft, filtern_prio_niedrig_eigenschaft, liste);
}
