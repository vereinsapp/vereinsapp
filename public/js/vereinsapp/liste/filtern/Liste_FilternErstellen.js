function Liste_FilternErstellen($filtern_definition, instanz, liste) {
    const $filtern = $filtern_definition.closest(".filtern_formular").find(".filtern");

    const filtern = new Array();
    $filtern_definition.find(".filtern_wert").each(function () {
        const $filtern_wert = $(this);
        if ($filtern_wert.val())
            filtern.push({
                operator: $filtern_wert.attr("data-operator"),
                eigenschaft: $filtern_definition.attr("data-eigenschaft"),
                wert: Schnittstelle_VariableWertBereinigtZurueck($filtern_wert.val()),
            });
    });

    let filtern_knoten = filtern;
    if (filtern.length > 1) filtern_knoten = [{ verknuepfung: "&&", filtern: filtern }];

    const $filtern_knoten = Liste_Filtern2$FilternZurueck(filtern_knoten, instanz, liste);

    if ($filtern.find(".filtern_sammlung").length === 0 && $filtern.find(".filtern_element").length === 0) $filtern.append($filtern_knoten);
    else if ($filtern.find(".filtern_kind").length > 0) $filtern.find(".filtern_kind").first().append($filtern_knoten);
    else {
        const $filtern_zwischenspeicher = $filtern.children().clone();
        $filtern.empty().append(Liste_Filtern2$FilternZurueck([{ verknuepfung: "||", filtern: new Array() }], instanz, liste));
        $filtern.find(".filtern_kind").first().append($filtern_zwischenspeicher).append($filtern_knoten);
    }

    Liste_FilternSpeichern($filtern, instanz, liste);
}
