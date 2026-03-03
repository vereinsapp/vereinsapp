/**
 * @param {JQuery} $element
 */

function Liste_$ElementAktualisieren($element) {
    const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);
    const element_id = Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined);

    // EIGENSCHAFTEN AKTUALISIEREN
    $element.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = Util_WertBereinigtZurueck($eigenschaft.attr("eigenschaft"), undefined);

        $eigenschaft.html(
            Liste_WertNachEigenschaftFormatiertZurueck(Liste_VariableRausZurueck(eigenschaft, element_id, liste, undefined), eigenschaft, liste),
        );

        const eigenschaften_bedingt_formatiert = Util_WertBereinigtZurueck($element.attr("eigenschaften_bedingt_formatiert"), new Object());
        if (isObject(eigenschaften_bedingt_formatiert) && eigenschaft in eigenschaften_bedingt_formatiert)
            $.each(eigenschaften_bedingt_formatiert[eigenschaft], function (klasse, filtern) {
                const tabelle = new Array();
                tabelle[element_id] = LISTEN[liste].tabelle[element_id];
                if (Liste_TabelleGefiltertZurueck(tabelle, filtern, liste).length > 0) $eigenschaft.addClass(klasse);
                else $eigenschaft.removeClass(klasse);
            });
    });

    // WERKZEUGKASTEN AKTUALISIEREN
    $element
        .find('[data-bs-toggle="offcanvas"][data-bs-target="#werkzeugkasten"]')
        .attr("liste", liste)
        .attr(LISTEN[liste].element + "_id", element_id);

    // verknuepfungen AKTUALISIEREN
    $element.find(".verknuepfungen").each(function () {
        Liste_$VerknuepfungenAktualisieren($(this), $element);
    });

    // LINK AKTUALISIEREN
    $element.find("a.stretched-link").each(function () {
        Liste_Element$LinkAktualisieren($(this), $element);
    });

    // ZUSATZSYMBOL AKTUALISIEREN
    $element.find(".zusatzsymbol").each(function () {
        Liste_Element$ZusatzsymbolAktualisieren($(this), $element);
    });

    // VORSCHAU AKTUALISIEREN
    $element.find(".vorschau").each(function () {
        Liste_Element$VorschauAktualisieren($(this), $element);
    });

    // NAVIGATION AKTUALISIEREN
    $element.find(".element_navigation").each(function () {
        Liste_Element$NavigationAktualisieren($(this), $element);
    });

    // ACTION UND ROLE DEFINIEREN
    if ($element.find("a.stretched-link").exists() || $element.hasClass("werkzeug") || $element.find("label[for]").exists()) {
        $element.addClass("list-group-item-action").attr("role", "button");
        $element.find("label").attr("role", "button");
    } else {
        $element.removeClass("list-group-item-action").removeAttr("role");
        $element.find("label").removeAttr("role", "button");
    }
}
