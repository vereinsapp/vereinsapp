/**
 * @param {JQuery} $liste
 */

function Liste_$ListeAktualisieren($liste) {
    const liste = Util_WertBereinigtZurueck($liste.attr("liste"), undefined);
    const instanz = Util_WertBereinigtZurueck($liste.attr("id"), undefined);
    const $elemente = $liste.find(".elemente");
    const $meta = $liste.find(".meta");

    // TABELLE FILTERN
    const filtern_data = Util_WertBereinigtZurueck($liste.attr("filtern"), new Object());
    const filtern_LocalStorage = LISTEN[liste].instanz[instanz].filtern;
    const tabelle_gefiltert = Liste_TabelleGefiltertZurueck(
        LISTEN[liste].tabelle,
        Liste_FilternManipuliertZurueck(filtern_data, filtern_LocalStorage, liste),
        liste,
    );

    // TABELLE SORTIEREN
    const sortieren_data = Util_WertBereinigtZurueck($liste.attr("sortieren"), undefined);
    const sortieren_LocalStorage = LISTEN[liste].instanz[instanz].sortieren;
    const tabelle_gefiltert_sortiert = Liste_ArraySortiertZurueck(
        tabelle_gefiltert,
        Liste_SortierenManipuliertZurueck(sortieren_data, sortieren_LocalStorage, liste),
    );

    // ELEMENTE IM DOM LÖSCHEN
    $elemente.find(".element").each(function () {
        const $element = $(this);
        const element = LISTEN[liste].tabelle[Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined)];
        if (!tabelle_gefiltert_sortiert.includes(element)) $element.remove();
    });

    // ELEMENTE IM DOM ERGÄNZEN UND SORTIEREN
    $.each(tabelle_gefiltert_sortiert, function (position, element) {
        let $element = $elemente.find(".element[" + LISTEN[liste].element + '_id="' + element.id + '"]');
        if (!$element.exists()) $element = LISTEN[liste].instanz[instanz].$blanko_element.clone().removeClass("blanko invisible");

        $element.attr("liste", liste).attr(LISTEN[liste].element + "_id", element.id);

        $.each(Object.keys(LISTEN), function (position, liste) {
            const verknuepfte_element_id = Util_WertBereinigtZurueck($liste.attr(LISTEN[liste].element + "_id"), undefined);
            if (typeof verknuepfte_element_id !== "undefined") $element.attr(LISTEN[liste].element + "_id", verknuepfte_element_id);
        });

        if (Util_WertBereinigtZurueck($liste.attr("disabled_ids"), new Array()).includes(element.id)) $element.addClass("disabled");
        else $element.removeClass("disabled");

        if (position === 0) $element.appendTo($elemente);
        else $element.insertAfter($elemente.find(".element[" + LISTEN[liste].element + '_id="' + tabelle_gefiltert_sortiert[position - 1].id + '"]'));
    });

    // META AKTUALISIEREN
    $meta.each(function () {
        const $meta = $(this);

        // Überschrift aktualisieren
        $meta.find(".ueberschrift").each(function () {
            const $ueberschrift = $(this);

            if (isEmptyString($ueberschrift.text())) $ueberschrift.addClass("invisible");
            else $ueberschrift.removeClass("invisible");
        });

        // Werkzeuge aktualisieren
        $meta.find(".werkzeuge").each(function () {
            const $werkzeuge = $(this).empty();

            $.each(Util_WertBereinigtZurueck($werkzeuge.attr("werkzeuge"), new Array()), function (position, werkzeug) {
                Dom_$WerkzeugInitialisiertZurueck(werkzeug, {
                    liste: liste,
                    instanz: instanz,
                }).appendTo($werkzeuge);
            });

            if ($werkzeuge.find(".werkzeug").length === 0) $werkzeuge.addClass("invisible");
            else $werkzeuge.removeClass("invisible");
        });

        // Listenstatisik aktualisieren
        $meta.find(".listenstatistik_todo").each(function () {
            $(this)
                .find(".listenstatistik")
                .each(function () {
                    Liste_$ListenstatistikAktualisieren($(this), $liste);
                });
        });

        if (
            ($meta.find(".ueberschrift").length === 0 || $meta.find(".ueberschrift").hasClass("invisible")) &&
            ($meta.find(".werkzeuge").length === 0 || $meta.find(".werkzeuge").hasClass("invisible")) &&
            ($meta.find(".listenstatistik_todo").length === 0 || $meta.find(".listenstatistik_todo").hasClass("invisible"))
        )
            $meta.addClass("invisible");
        else $meta.removeClass("invisible");
    });

    // LISTE AUSBLENDEN
    if (
        $elemente.find(".element").length <= 0 &&
        ($meta.find(".werkzeuge").length === 0 || $meta.find(".werkzeuge").hasClass("invisible")) &&
        ($meta.find(".listenstatistik_todo").length === 0 || $meta.find(".listenstatistik_todo").hasClass("invisible"))
    )
        $liste.addClass("invisible");
    else $liste.removeClass("invisible");
}
