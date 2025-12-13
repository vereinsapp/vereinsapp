function Liste_ElementAktualisieren($element, liste) {
    const element_id = Number($element.attr("data-element_id"));
    const gegen_liste = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_liste"), undefined);
    const gegen_element_id = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-gegen_element_id"), undefined);

    // ELEMENTE DISABLED
    let disabled = false;
    const disabled_data = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-disabled"), new Object());
    if (isObject(disabled_data.filtern) && disabled_data.liste in LISTEN) {
        $.each(Liste_TabelleGefiltertZurueck(LISTEN[disabled_data.liste].tabelle, disabled_data.filtern, disabled_data.liste), function () {
            const element = this;
            if ("id" in element && element.id == element_id) {
                disabled = true;
                return;
            }
        });
    }

    // ACTION UND ROLE FORMATIEREN (ACHTUNG: REIHENFOLGE!)
    if ($element.find("a.stretched-link").exists() || $element.find("[class*=btn_]").exists() || $element.find("[class*=chk_]").exists()) {
        $element.addClass("list-group-item-action");
        $element.attr("role", "button");
    }

    // ELEMENT DISABLED FORMATIEREN (ACHTUNG: REIHENFOLGE!)
    if (disabled) {
        $element.removeClass("list-group-item-action");
        $element.removeAttr("role");
        $element.find(".beschriftung").addClass("text-secondary");
        $element.find("a.stretched-link").removeAttr("href");
    } else $element.find(".beschriftung").removeClass("text-secondary");

    // ELEMENT BEDINGT FORMATIEREN (ACHTUNG: REIHENFOLGE!)
    const bedingte_formatierung = Schnittstelle_VariableWertBereinigtZurueck($element.attr("data-bedingte_formatierung"), undefined);
    if (
        typeof bedingte_formatierung !== "undefined" &&
        isObject(bedingte_formatierung) &&
        "eigenschaft" in bedingte_formatierung &&
        "klasse" in bedingte_formatierung
    ) {
        const $bedingte_formatierung = $element.find('.eigenschaft[data-eigenschaft="' + bedingte_formatierung.eigenschaft + '"]');

        $.each(bedingte_formatierung.klasse, function (klasse, filtern) {
            if (Liste_TabelleGefiltertZurueck([LISTEN[liste].tabelle[element_id]], filtern, liste).length > 0)
                $bedingte_formatierung.addClass(klasse);
            else $bedingte_formatierung.removeClass(klasse);
        });
    }

    // EIGENSCHAFTEN AKTUALISIEREN
    $element.find(".eigenschaft").each(function () {
        const $eigenschaft = $(this);
        const eigenschaft = $eigenschaft.attr("data-eigenschaft");
        $eigenschaft.html(
            Liste_WertFormatiertZurueck(Schnittstelle_VariableRausZurueck(eigenschaft, element_id, liste, undefined), eigenschaft, liste)
        );
    });

    // VERKNUEPFUNGEN_AUSWAHLMOEGLICHKEITEN AKTUALISIEREN
    $element.find(".verknuepfungen_auswahlmoeglichkeiten").each(function () {
        Liste_VerknuepfungenAuswahlmoeglichkeitenAktualisieren(
            $(this),
            disabled,
            liste,
            element_id,
            gegen_liste,
            gegen_element_id,
            $(this).attr("data-verknuepfungen")
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
