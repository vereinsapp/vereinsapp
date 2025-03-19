function Termine_RueckmeldungEinAusblenden($rueckmeldung_eingeladen) {
    const $termin = $rueckmeldung_eingeladen.closest('.element[data-liste="termine"]');

    if ($termin.exists() && "tabelle" in LISTEN.termine) {
        const termin = LISTEN.termine.tabelle[Number($termin.attr("data-element_id"))];
        const $rueckmeldung_nicht_eingeladen = $rueckmeldung_eingeladen.siblings(".rueckmeldung_nicht_eingeladen").first();

        if (termin.ich_eingeladen_janein) {
            $rueckmeldung_eingeladen.removeClass("invisible");
            $rueckmeldung_nicht_eingeladen.addClass("invisible");
        } else {
            $rueckmeldung_eingeladen.addClass("invisible");
            $rueckmeldung_nicht_eingeladen.removeClass("invisible");
        }
    }
}
