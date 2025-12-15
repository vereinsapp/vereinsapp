function Liste_ElementAktualisieren($element, liste) {
    const element_id = Number($element.attr("data-element_id"));
    const gegen_liste = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_liste"), undefined);
    const gegen_element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_element_id"), undefined);

    // EIGENSCHAFTEN AKTUALISIEREN
    $element.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($eigenschaft.attr("data-eigenschaft"), undefined);

        $eigenschaft.html(
            Liste_WertFormatiertZurueck(Schnittstelle_VariableRausZurueck(eigenschaft, element_id, liste, undefined), eigenschaft, liste)
        );

        const eigenschaften_bedingt_formatiert = Schnittstelle_VariableWertBereinigtZurueck(
            $element.attr("data-eigenschaften_bedingt_formatiert"),
            new Object()
        );
        if (isObject(eigenschaften_bedingt_formatiert) && eigenschaft in eigenschaften_bedingt_formatiert)
            $.each(eigenschaften_bedingt_formatiert[eigenschaft], function (klasse, filtern) {
                if (Liste_TabelleGefiltertZurueck([LISTEN[liste].tabelle[element_id]], filtern, liste).length > 0) $eigenschaft.addClass(klasse);
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

    // VERKNUEPFUNGEN_AUSWAHLMOEGLICHKEITEN AKTUALISIEREN
    $element.find(".verknuepfungen_auswahlmoeglichkeiten").each(function () {
        Liste_VerknuepfungenAuswahlmoeglichkeitenAktualisieren(
            $(this),
            $element.hasClass("disabled"),
            liste,
            element_id,
            gegen_liste,
            gegen_element_id,
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-verknuepfungen"), undefined)
        );
    });

    // LINK AKTUALISIEREN
    $element.find("a.stretched-link").attr("href", SITE_URL + LISTEN[liste].controller + "/" + element_id);

    // WERKZEUGKASTEN AKTUALISIEREN
    $element.find('[data-bs-toggle="offcanvas"][data-bs-target="#werkzeugkasten"]').attr("data-liste", liste).attr("data-element_id", element_id);

    // ZUSATZSYMBOL AKTUALISIEREN
    $element.find(".zusatzsymbol").each(function () {
        Liste_ElementZusatzsymbolAktualisieren($(this), $element);
    });

    // ZUSATZINFO AKTUALISIEREN
    $element.find(".zusatzinfo").each(function () {
        Liste_ElementZusatzinfoAktualisieren($(this), $element);
    });

    // VORSCHAU-EIGENSCHAFT UND ZUGEHÖRIGEN SPACER IN DER VORSCHAU AUSBLENDEN
    const $vorschau_eigenschaften = $element.find(".vorschau").children(".eigenschaft");
    $vorschau_eigenschaften.each(function (position) {
        const $eigenschaft = $(this);
        let $zugehoeriger_spacer;
        if (position == $vorschau_eigenschaften.length - 1) $zugehoeriger_spacer = $eigenschaft.prev();
        else $zugehoeriger_spacer = $eigenschaft.next();
        if (isEmptyString($eigenschaft.text())) {
            $eigenschaft.addClass("invisible");
            $zugehoeriger_spacer.addClass("invisible");
        } else {
            $eigenschaft.removeClass("invisible");
            $zugehoeriger_spacer.removeClass("invisible");
        }
    });

    // NAVIGATION AKTUALISIEREN
    $element.find(".element_navigation").each(function () {
        Liste_ElementNavigationAktualisieren($(this), $element, liste);
    });
}
