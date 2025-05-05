function Liste_FilternEigenschaftZuruecksetzen($filtern_eigenschaft, ziel_id, liste) {
    const eigenschaft = $filtern_eigenschaft.attr("data-eigenschaft");

    let filtern_prio_niedrig, filtern_prio_hoch;
    if (typeof ziel_id !== "undefined") {
        filtern_prio_niedrig = $("#" + ziel_id).attr("data-filtern_prio_niedrig");
        if (typeof filtern_prio_niedrig !== "undefined") filtern_prio_niedrig = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_niedrig);
        else filtern_prio_niedrig = new Object();

        filtern_prio_hoch = $("#" + ziel_id).val();
        if (filtern_prio_hoch != "") filtern_prio_hoch = Schnittstelle_VariableWertBereinigtZurueck(filtern_prio_hoch);
        else filtern_prio_hoch = new Object();
    } else {
        filtern_prio_niedrig = new Object();
        filtern_prio_hoch = new Object();
    }

    if (eigenschaft in filtern_prio_niedrig) filtern_prio_hoch[eigenschaft] = filtern_prio_niedrig[eigenschaft];
    else filtern_prio_hoch[eigenschaft] = new Object();

    if (typeof ziel_id !== "undefined")
        $("#" + ziel_id)
            .val(JsonStringifiedZurueck(filtern_prio_hoch))
            .trigger("change");

    const filtern_kombiniert = Liste_FilternMitPrioKombiniertZurueck(filtern_prio_niedrig, filtern_prio_hoch, liste);

    Liste_FilternFormular$EigenschaftAktualisieren($filtern_eigenschaft, filtern_kombiniert[eigenschaft], liste);
}
