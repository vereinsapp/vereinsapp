function Liste_ElementAktualisieren($element, liste) {
    const element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-" + LISTEN[liste].element + "_id"), undefined);

    // EIGENSCHAFTEN AKTUALISIEREN
    $element.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = Schnittstelle_VariableWertBereinigtZurueck($eigenschaft.attr("data-eigenschaft"), undefined);

        $eigenschaft.html(
            Liste_WertFormatiertZurueck(Schnittstelle_VariableRausZurueck(eigenschaft, element_id, liste, undefined), eigenschaft, liste),
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

    // VERKNUEPFUNGEN_AUSWAHLMOEGLICHKEITEN AKTUALISIEREN
    $element.find(".verknuepfungen_auswahlmoeglichkeiten").each(function () {
        Liste_VerknuepfungenAuswahlmoeglichkeitenAktualisieren($(this), $element);
    });

    // LINK AKTUALISIEREN
    const $link = $element.find("a.stretched-link");
    const link_data = Schnittstelle_VariableWertBereinigtZurueck($link.attr("data-link"), new Object());
    let href = SITE_URL;
    if ("liste" in link_data) href += LISTEN[link_data.liste].controller;
    else href += LISTEN[liste].controller;
    if ("eigenschaften" in link_data && isArray(link_data.eigenschaften))
        $.each(link_data.eigenschaften, function (position, eigenschaft) {
            href += "/" + Schnittstelle_VariableRausZurueck(eigenschaft, element_id, liste, undefined);
        });
    $link.attr("href", href);

    // WERKZEUGKASTEN AKTUALISIEREN
    $element
        .find('[data-bs-toggle="offcanvas"][data-bs-target="#werkzeugkasten"]')
        .attr("data-liste", liste)
        .attr("data-" + LISTEN[liste].element + "_id", element_id);

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
