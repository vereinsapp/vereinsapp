function Liste_FilternLoeschen($btn) {
    const liste = $btn.attr("data-liste");
    const instanz = $btn.attr("data-instanz");
    const eigenschaft = $btn.attr("data-eigenschaft");
    let filtern_liste = $btn.attr("data-filtern_liste");
    if (typeof filtern_liste === "undefined") filtern_liste = liste;
    const element_id = $btn.attr("data-element_id");
    const $formular = $btn.closest(".modal");

    const $filtern = $formular.find(".filtern");
    const $element = $btn.closest(".filtern_element");
    const $sammlung = $btn.closest(".filtern_sammlung");

    let $knoten;
    if ($element.exists()) {
        $knoten = $element;
    } else $knoten = $sammlung;

    let $knoten_parallel = $knoten.siblings(".filtern_element, .filtern_sammlung");
    let $sammlung_ebene_hoeher = $knoten.closest(".filtern_sammlung");

    $knoten.remove();
    while ($knoten_parallel.length == 1) {
        const $knoten_ebene_hoeher = $sammlung_ebene_hoeher.siblings(".filtern_element, .filtern_sammlung");
        $sammlung_ebene_hoeher.replaceWith($knoten_parallel);
        $knoten_parallel = $knoten_ebene_hoeher;
        sammlung_ebene_hoeher = $knoten_parallel.first().closest(".filtern_sammlung");
    }

    if (typeof instanz !== "undefined") {
        G.LISTEN[liste].instanz[instanz].filtern = Liste_$Filtern2FilternZurueck($filtern, filtern_liste);
        Schnittstelle_EventVariableUpdLocalstorage(liste, [Schnittstelle_EventLocalstorageUpdVariable, Schnittstelle_EventVariableUpdDom]);
    }
    if (typeof eigenschaft !== "undefined")
        Schnittstelle_VariableRein(Liste_$Filtern2FilternZurueck($filtern, filtern_liste), eigenschaft, element_id, liste, "tmp");

    Liste_FilternAktualisieren($formular, liste);
}
