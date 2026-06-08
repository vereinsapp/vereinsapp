/**
 * @param {JQuery} $element
 */

function Liste_$ElementAktualisieren($element) {
    const liste = Util_WertBereinigtZurueck($element.attr("liste"), undefined);
    const element_id = Util_WertBereinigtZurueck($element.attr(LISTEN[liste].element + "_id"), undefined);

    // ELEMENT-BESCHRIFTUNG AKTUALISIEREN
    $element.find(".element_beschriftung").text(Liste_ElementBeschriftungErweitertZurueck(element_id, liste));

    // VORSCHAU AKTUALISIEREN
    $element.find(".vorschau").each(function () {
        const $vorschau = $(this);

        $.each(Util_WertBereinigtZurueck($vorschau.attr("vorschau"), new Array()), function (position, eigenschaft) {
            if (position === 0) $vorschau.empty();
            else $vorschau.append(Dom_$SpacerInitialisiertZurueck());

            const bisherige_vorschau = $vorschau.html();
            $vorschau.html(
                bisherige_vorschau +
                    Liste_WertNachEigenschaftFormatiertZurueck(
                        Liste_ElementWertRausZurueck(eigenschaft, element_id, liste, undefined),
                        eigenschaft,
                        liste,
                    ),
            );
        });

        if (isEmptyString($vorschau.text())) $vorschau.addClass("invisible");
        else $vorschau.removeClass("invisible");
    });

    // EIGENSCHAFTEN AKTUALISIEREN
    $element.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = Util_WertBereinigtZurueck($eigenschaft.attr("eigenschaft"), undefined);

        $eigenschaft.text(
            Liste_WertNachEigenschaftFormatiertZurueck(Liste_ElementWertRausZurueck(eigenschaft, element_id, liste, undefined), eigenschaft, liste),
        );
    });

    // LINK AKTUALISIEREN
    $element.find("a.stretched-link").each(function () {
        Liste_Element$LinkAktualisieren($(this), $element);
    });

    // WERKZEUGE AKTUALISIEREN
    const $liste = $element.closest('.liste[liste="' + liste + '"][id]');
    $element.find(".werkzeuge").each(function () {
        const $werkzeuge = $(this);

        Dom_$WerkzeugeAktualisieren($werkzeuge, {
            liste: liste,
            [LISTEN[liste].element + "_id"]: element_id,
        });

        if (
            $werkzeuge.find(".werkzeug").length === 0 ||
            ($liste.exists() && LISTEN[liste].instanz[Util_WertBereinigtZurueck($liste.attr("id"), undefined)].bearbeiten_modus === false)
        )
            $werkzeuge.addClass("invisible");
        else $werkzeuge.removeClass("invisible");
    });

    // ZUSATZSYMBOLE AKTUALISIEREN
    $element.find(".zusatzsymbole").each(function () {
        const $zusatzsymbole = $(this);

        Dom_$ZusatzsymboleAktualisieren($zusatzsymbole);

        if ($zusatzsymbole.find(".zusatzsymbol").length === 0) $zusatzsymbole.addClass("invisible");
        else $zusatzsymbole.removeClass("invisible");
    });

    // VERKNUEPFUNGEN AKTUALISIEREN
    $element.find(".verknuepfung_erstellen").each(function () {
        Liste_$VerknuepfungErstellenAktualisieren($(this), $element);
    });

    // NAVIGATION AKTUALISIEREN
    $('.element_navigation[liste="' + liste + '"][' + LISTEN[liste].element + '_id="' + element_id + '"]').each(function () {
        Liste_Element$NavigationAktualisieren($(this), $element);
    });

    // ACTION UND ROLE DEFINIEREN
    if ($element.find("a.stretched-link").exists() || $element.find("label.werkzeug").exists() || $element.find("label[for]").exists()) {
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
