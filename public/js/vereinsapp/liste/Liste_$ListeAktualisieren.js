/**
 * @param {JQuery} $liste
 */

function Liste_$ListeAktualisieren($liste) {
    const liste = Liste_WertBereinigtZurueck($liste.attr("liste"), undefined);
    const instanz = Liste_WertBereinigtZurueck($liste.attr("id"), undefined);

    // TABELLE FILTERN
    const filtern_data = Liste_WertBereinigtZurueck($liste.attr("filtern"), new Object());
    const filtern_LocalStorage = LISTEN[liste].instanz[instanz].filtern;
    const tabelle_gefiltert = Liste_TabelleGefiltertZurueck(
        LISTEN[liste].tabelle,
        Liste_FilternManipuliertZurueck(filtern_data, filtern_LocalStorage, liste),
        liste,
    );

    // TABELLE SORTIEREN
    const sortieren_data = Liste_WertBereinigtZurueck($liste.attr("sortieren"), undefined);
    const sortieren_LocalStorage = LISTEN[liste].instanz[instanz].sortieren;
    const tabelle_gefiltert_sortiert = Liste_ArraySortiertZurueck(
        tabelle_gefiltert,
        Liste_SortierenManipuliertZurueck(sortieren_data, sortieren_LocalStorage, liste),
    );

    // ELEMENTE IM DOM LÖSCHEN
    $liste.find(".element").each(function () {
        const $element = $(this);
        const element_id = Liste_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined);
        const element = LISTEN[liste].tabelle[element_id];
        if (!tabelle_gefiltert_sortiert.includes(element)) $element.remove();
    });

    // ELEMENTE IM DOM ERGÄNZEN UND SORTIEREN
    $.each(tabelle_gefiltert_sortiert, function (position, element) {
        const element_id = element.id;

        let $element = $liste.find(".element[" + LISTEN[liste].element + '_id="' + element_id + '"]');
        if (!$element.exists()) $element = LISTEN[liste].instanz[instanz].$blanko_element.clone().removeClass("blanko invisible");

        $element
            .attr("liste", liste)
            .attr(LISTEN[liste].element + "_id", element_id)
            .attr("eigenschaften_bedingt_formatiert", $liste.attr("eigenschaften_bedingt_formatiert"));

        $.each(Object.keys(LISTEN), function (position, liste) {
            const verknuepfte_element_id = Liste_WertBereinigtZurueck($liste.attr(LISTEN[liste].element + "_id"), undefined);
            if (typeof verknuepfte_element_id !== "undefined") $element.attr(LISTEN[liste].element + "_id", verknuepfte_element_id);
        });

        if (Liste_WertBereinigtZurueck($liste.attr("disabled_ids"), new Array()).includes(element_id)) $element.addClass("disabled");
        else $element.removeClass("disabled");

        if (position === 0) $element.appendTo($liste);
        else $element.insertAfter($liste.find(".element[" + LISTEN[liste].element + '_id="' + tabelle_gefiltert_sortiert[position - 1].id + '"]'));
    });

    // ÜBERSCHRIFT AKTUALISIEREN
    $('.ueberschrift[instanz="' + instanz + '"]').each(function () {
        Liste_Liste$UeberschriftAktualisieren($(this), $liste);
    });

    // WERKZEUG AKTUALISIEREN
    $('.werkzeug[instanz="' + instanz + '"]').each(function () {
        Liste_Liste$WerkzeugAktualisieren($(this), $liste);
    });

    // LISTENSTATISTIK AKTUALISIEREN
    $('.listenstatistik[instanz="' + instanz + '"]').each(function () {
        Liste_Liste$ListenstatistikAktualisieren($(this), $liste);
    });
}
