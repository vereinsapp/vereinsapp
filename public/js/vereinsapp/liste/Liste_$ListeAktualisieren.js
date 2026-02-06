/**
 * @param {JQuery} $liste
 */

function Liste_$ListeAktualisieren($liste) {
    const liste = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-liste"), undefined);
    const instanz = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("id"), undefined);

    // TABELLE FILTERN
    const filtern_data = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-filtern"), new Object());
    const filtern_LocalStorage = LISTEN[liste].instanz[instanz].filtern;
    const tabelle_gefiltert = Liste_TabelleGefiltertZurueck(
        LISTEN[liste].tabelle,
        Liste_FilternManipuliertZurueck(filtern_data, filtern_LocalStorage, liste),
        liste,
    );

    // TABELLE SORTIEREN
    const sortieren_data = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-sortieren"), undefined);
    const sortieren_LocalStorage = LISTEN[liste].instanz[instanz].sortieren;
    const tabelle_gefiltert_sortiert = Liste_ArraySortiertZurueck(
        tabelle_gefiltert,
        Liste_SortierenManipuliertZurueck(sortieren_data, sortieren_LocalStorage, liste),
    );

    // ELEMENTE IM DOM LÖSCHEN
    $liste.find(".element").each(function () {
        const $element = $(this);
        const element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-" + LISTEN[liste].element + "_id"), undefined);
        const element = LISTEN[liste].tabelle[element_id];
        if (!tabelle_gefiltert_sortiert.includes(element)) $element.remove();
    });

    // ELEMENTE IM DOM ERGÄNZEN UND SORTIEREN
    $.each(tabelle_gefiltert_sortiert, function (position, element) {
        const element_id = element.id;

        let $element = $liste.find(".element[data-" + LISTEN[liste].element + '_id="' + element_id + '"]');
        if (!$element.exists()) $element = LISTEN[liste].instanz[instanz].$blanko_element.clone().removeClass("blanko invisible");

        $element
            .attr("data-liste", liste)
            .attr("data-" + LISTEN[liste].element + "_id", element_id)
            .attr("data-eigenschaften_bedingt_formatiert", $liste.attr("data-eigenschaften_bedingt_formatiert"));

        $.each(Object.keys(ELEMENTE), function (position, verknuepftes_element) {
            const verknuepfte_element_id = Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-" + verknuepftes_element + "_id"), undefined);
            if (typeof verknuepfte_element_id !== "undefined") $element.attr("data-" + verknuepftes_element + "_id", verknuepfte_element_id);
        });

        if (Schnittstelle_VariableWertBereinigtZurueck($liste.attr("data-disabled_ids"), new Array()).includes(element_id))
            $element.addClass("disabled");
        else $element.removeClass("disabled");

        if (position === 0) $element.appendTo($liste);
        else
            $element.insertAfter(
                $liste.find(".element[data-" + LISTEN[liste].element + '_id="' + tabelle_gefiltert_sortiert[position - 1].id + '"]'),
            );
    });

    // ÜBERSCHRIFT AKTUALISIEREN
    $('.ueberschrift[data-instanz="' + instanz + '"]').each(function () {
        Liste_Liste$UeberschriftAktualisieren($(this), $liste);
    });

    // WERKZEUG AKTUALISIEREN
    $('.werkzeug[data-instanz="' + instanz + '"]').each(function () {
        Liste_Liste$WerkzeugAktualisieren($(this), $liste);
    });

    // LISTENSTATISTIK AKTUALISIEREN
    $('.listenstatistik[data-instanz="' + instanz + '"]').each(function () {
        Liste_Liste$ListenstatistikAktualisieren($(this), $liste);
    });
}
