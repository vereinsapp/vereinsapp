/**
 * @param {JQuery} $element
 * @param {string} $liste
 */

function Liste_$ElementAktualisieren($element, liste) {
    const element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-" + LISTEN[liste].element + "_id"), undefined);

    // EIGENSCHAFTEN AKTUALISIEREN
    $element.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($eigenschaft.attr("data-eigenschaft"), undefined);

        $eigenschaft.html(
            Schnittstelle_VariableWertFormatiertZurueck(
                Schnittstelle_VariableRausZurueck(eigenschaft, element_id, liste, undefined),
                eigenschaft,
                liste,
            ),
        );

        const eigenschaften_bedingt_formatiert = Schnittstelle_VariableWertBereinigtZurueck(
            $element.attr("data-eigenschaften_bedingt_formatiert"),
            new Object(),
        );
        if (isObject(eigenschaften_bedingt_formatiert) && eigenschaft in eigenschaften_bedingt_formatiert)
            $.each(eigenschaften_bedingt_formatiert[eigenschaft], function (klasse, filtern) {
                const tabelle = new Array();
                tabelle[element_id] = LISTEN[liste].tabelle[element_id];
                if (Liste_TabelleGefiltertZurueck(tabelle, filtern, liste).length > 0) $eigenschaft.addClass(klasse);
                else $eigenschaft.removeClass(klasse);
            });
    });

    // ACTION UND ROLE DEFINIEREN
    if ($element.find("a.stretched-link").exists() || $element.is("[class*=btn_]") || $element.find("[class*=chk_]").exists()) {
        $element.addClass("list-group-item-action");
        $element.attr("role", "button");
    } else {
        $element.removeClass("list-group-item-action");
        $element.removeAttr("role");
    }

    // WERKZEUGKASTEN AKTUALISIEREN
    $element
        .find('[data-bs-toggle="offcanvas"][data-bs-target="#werkzeugkasten"]')
        .attr("data-liste", liste)
        .attr("data-" + LISTEN[liste].element + "_id", element_id);

    // VERKNUEPFUNGEN_AUSWAHLMOEGLICHKEITEN AKTUALISIEREN
    $element.find(".verknuepfungen_auswahlmoeglichkeiten").each(function () {
        Liste_$VerknuepfungenAuswahlmoeglichkeitenAktualisieren($(this), $element);
    });

    // LINK AKTUALISIEREN
    $element.find("a.stretched-link").each(function () {
        Liste_Element$LinkAktualisieren($(this), $element);
    });

    // ZUSATZSYMBOL AKTUALISIEREN
    $element.find(".zusatzsymbol").each(function () {
        Liste_Element$ZusatzsymbolAktualisieren($(this), $element);
    });

    // ZUSATZINFO AKTUALISIEREN
    $element.find(".zusatzinfo").each(function () {
        Liste_Element$ZusatzinfoAktualisieren($(this), $element);
    });

    // VORSCHAU AKTUALISIEREN
    $element.find(".vorschau").each(function () {
        Liste_Element$VorschauAktualisieren($(this), $element);
    });

    // NAVIGATION AKTUALISIEREN
    $element.find(".element_navigation").each(function () {
        Liste_Element$NavigationAktualisieren($(this), $element);
    });
}
