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
    });

    // VERKNUEPFUNGEN AKTUALISIEREN
    $element.find(".verknuepfungen").each(function () {
        Liste_$VerknuepfungenAktualisieren($(this), $element);
    });

    // WERKZEUG AKTUALISIEREN
    $element.find(".werkzeug").each(function () {
        Liste_Element$WerkzeugAktualisieren($(this), $element);
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
    $('.element_navigation[liste="' + liste + '"][' + LISTEN[liste].element + '_id="' + element_id + '"]').each(function () {
        Liste_Element$NavigationAktualisieren($(this), $element);
    });

    // ACTION UND ROLE DEFINIEREN
    if ($element.find("a.stretched-link").exists() || $element.hasClass("werkzeug") || $element.find("label[for]").exists()) {
        if ($element.hasClass("list-group-item")) {
            $element.attr("role", "button").addClass("list-group-item-action").removeClass("element-action");
            $element.find(".card").removeAttr("role").removeClass("element-action");
        }
        if ($element.find(".card").exists()) {
            $element.removeAttr("role").removeClass("list-group-item-action").removeClass("element-action");
            $element.find(".card").attr("role", "button").addClass("element-action");
        } else {
            $element.attr("role", "button").removeClass("list-group-item-action").addClass("element-action");
            $element.find(".card").removeAttr("role").removeClass("element-action");
        }

        $element.find("label").attr("role", "button");
    } else {
        $element.removeClass("list-group-item-action").removeClass("element-action").removeAttr("role");
        $element.find(".card").removeAttr("role").removeClass("element-action");
        $element.find("label").removeAttr("role", "button");
    }
}
