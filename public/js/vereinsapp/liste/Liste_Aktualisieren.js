function Liste_Aktualisieren($liste, liste) {
    const instanz = $liste.attr("id");

    // TABELLE FILTERN
    const filtern_data = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-filtern"), new Object());
    const filtern_LocalStorage = LISTEN[liste].instanz[instanz].filtern;
    const tabelle_gefiltert = Liste_TabelleGefiltertZurueck(
        LISTEN[liste].tabelle,
        Liste_FilternMitPrioKombiniertZurueck(filtern_data, filtern_LocalStorage, liste),
        liste
    );

    // TABELLE SORTIEREN
    const sortieren_data = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-sortieren"), undefined);
    const sortieren_LocalStorage = LISTEN[liste].instanz[instanz].sortieren;
    const tabelle_gefiltert_sortiert = Liste_ArraySortiertZurueck(
        tabelle_gefiltert,
        Liste_SortierenMitPrioKombiniertZurueck(sortieren_data, sortieren_LocalStorage, liste)
    );

    // ELEMENTE IM DOM LÖSCHEN
    $liste.find(".element").each(function () {
        const $element = $(this);
        const element_id = Number($element.attr("data-element_id"));
        const element = LISTEN[liste].tabelle[element_id];
        if (!tabelle_gefiltert_sortiert.includes(element)) $element.remove();
    });

    // ELEMENTE IM DOM ERGÄNZEN UND SORTIEREN
    $.each(tabelle_gefiltert_sortiert, function (position, element) {
        const element_id = element["id"];
        const $element = $liste.find('.element[data-element_id="' + element_id + '"]');

        if (!$element.exists()) {
            // Element existiert noch nicht, also wird es an der sortierten Position hinzugefügt
            const $neues_element = LISTEN[liste].instanz[instanz].$blanko_element.clone().removeClass("blanko invisible");

            $neues_element.attr("data-liste", liste).attr("data-element_id", element_id);

            const gegen_liste = $liste.attr("data-gegen_liste");
            const gegen_element_id = $liste.attr("data-gegen_element_id");
            if (typeof $neues_element.attr("data-gegen_liste") === "undefined" && typeof gegen_liste !== "undefined")
                $neues_element.attr("data-gegen_liste", gegen_liste);
            if (typeof $neues_element.attr("data-gegen_element_id") === "undefined" && typeof gegen_element_id !== "undefined")
                $neues_element.attr("data-gegen_element_id", gegen_element_id);

            if (position === 0) $neues_element.appendTo($liste);
            else $neues_element.insertAfter($liste.find('.element[data-element_id="' + tabelle_gefiltert_sortiert[position - 1]["id"] + '"]'));
        } else {
            // Element existiert bereits, also wird es nur einsortiert
            if (position === 0) $element.appendTo($liste);
            else $element.insertAfter($liste.find('.element[data-element_id="' + tabelle_gefiltert_sortiert[position - 1]["id"] + '"]'));
        }
    });

    // ELEMENTE IM DOM SORTIEREN
    $.each(tabelle_gefiltert_sortiert, function (position, element) {
        const element_id = element["id"];
        const $element = $liste.find('.element[data-element_id="' + element_id + '"]');

        if (position === 0) $element.appendTo($liste);
        else $element.insertAfter($liste.find('.element[data-element_id="' + tabelle_gefiltert_sortiert[position - 1]["id"] + '"]'));
    });

    // ÜBERSCHRIFT AKTUALISIEREN
    $('.ueberschrift[data-instanz="' + instanz + '"]').each(function () {
        Liste_UeberschriftAktualisieren($(this), liste);
    });

    // WERKZEUG AKTUALISIEREN
    $('.werkzeug[data-instanz="' + instanz + '"]').each(function () {
        Liste_WerkzeugAktualisieren($(this), liste);
    });

    // LISTENSTATISTIK AKTUALISIEREN
    $('.listenstatistik[data-instanz="' + instanz + '"]').each(function () {
        Liste_ListenstatistikAktualisieren($(this), liste);
    });
}
