function Liste_Aktualisieren($liste, liste) {
    const instanz = $liste.attr("id");

    // TABELLE FILTERN
    const filtern_data = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-filtern"), new Object());
    const filtern_LocalStorage = LISTEN[liste].instanz[instanz].filtern;
    const tabelle_gefiltert = Liste_TabelleGefiltertZurueck(
        Liste_FilternMitPrioKombiniertZurueck(filtern_data, filtern_LocalStorage, liste),
        LISTEN[liste].tabelle,
        liste
    );

    // TABELLE SORTIEREN
    const sortieren_data = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-sortieren"), undefined);
    const sortieren_LocalStorage = LISTEN[liste].instanz[instanz].sortieren;
    let sortieren_kombiniert;
    if (typeof sortieren_LocalStorage !== "undefined") sortieren_kombiniert = sortieren_LocalStorage;
    else sortieren_kombiniert = sortieren_data;
    const tabelle_gefiltert_sortiert = Liste_ArraySortiertZurueck(tabelle_gefiltert, sortieren_kombiniert);

    // ELEMENTE IM DOM LÖSCHEN
    $liste.find(".element").each(function () {
        const $element = $(this);
        const element_id = Number($element.attr("data-element_id"));
        const element = LISTEN[liste].tabelle[element_id];
        if (!tabelle_gefiltert_sortiert.includes(element)) $element.remove();
    });

    // ELEMENTE IM DOM ERGÄNZEN
    $.each(tabelle_gefiltert_sortiert, function (position, element) {
        const element_id = element["id"];
        const $element = $liste.find('.element[data-element_id="' + element_id + '"]');

        // Element wird nur hinzugefügt, falls es noch nicht existiert
        if (!$element.exists()) {
            const $neues_element = LISTEN[liste].instanz[instanz].$blanko_element.clone().removeClass("blanko invisible");

            $neues_element.attr("data-liste", liste).attr("data-element_id", element_id);

            const gegen_liste = $liste.attr("data-gegen_liste");
            const gegen_element_id = $liste.attr("data-gegen_element_id");
            if (typeof $neues_element.attr("data-gegen_liste") === "undefined" && typeof gegen_liste !== "undefined")
                $neues_element.attr("data-gegen_liste", gegen_liste);
            if (typeof $neues_element.attr("data-gegen_element_id") === "undefined" && typeof gegen_element_id !== "undefined")
                $neues_element.attr("data-gegen_element_id", gegen_element_id);

            // Element wird hinzugefügt (je nachdem, wo es in der Liste positioniert ist)
            if (position === 0) $neues_element.appendTo($liste);
            else $neues_element.insertAfter($liste.find('.element[data-element_id="' + tabelle_gefiltert_sortiert[position - 1]["id"] + '"]'));
        }
    });

    // ELEMENTE IM DOM SORTIEREN
    $.each(tabelle_gefiltert_sortiert, function (position, element) {
        const element_id = element["id"];
        const $element = $liste.find('.element[data-element_id="' + element_id + '"]');

        if (position === 0) $element.appendTo($liste);
        else $element.insertAfter($liste.find('.element[data-element_id="' + tabelle_gefiltert_sortiert[position - 1]["id"] + '"]'));
    });
}
