function Liste_FilternVerknuepfungAendern($btn) {
    const liste = $btn.attr("data-liste");
    const instanz = $btn.attr("data-instanz");
    const eigenschaft = $btn.attr("data-eigenschaft");
    const filtern_liste = $btn.attr("data-filtern_liste");
    const element_id = $btn.attr("data-element_id");

    const $filtern = $btn.closest(".filtern");
    const $verknuepfung = $btn.closest(".filtern_sammlung").find(".verknuepfung").first();
    const verknuepfung = $verknuepfung.attr("data-verknuepfung");

    if (verknuepfung == "&&") $verknuepfung.attr("data-verknuepfung", "||");
    else if (verknuepfung == "||") $verknuepfung.attr("data-verknuepfung", "&&");

    if (typeof instanz !== "undefined") {
        G.LISTEN[liste].instanz[instanz].filtern = Liste_$Filtern2FilternZurueck($filtern, liste);
        Schnittstelle_EventVariableUpdLocalstorage(liste, [Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom]);
    }
    if (typeof eigenschaft !== "undefined") {
        Schnittstelle_VariableRein(Liste_$Filtern2FilternZurueck($filtern, filtern_liste), eigenschaft, element_id, liste, "tmp");
        Schnittstelle_EventVariableUpdDom(liste);
    }
}
