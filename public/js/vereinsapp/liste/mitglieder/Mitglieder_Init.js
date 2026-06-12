LISTEN.mitglieder.element_erstellen_data_vervollstaendigen_aktion = function (data) {
    data = Util_WertBereinigtZurueck(data, new Object());

    if (isLuxonDateTime(data.geburt)) data.geburt = data.geburt.toISO();
    if (!("bemerkung" in data) || isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.mitglieder.element_aendern_data_vervollstaendigen_aktion = function (data, mitglied_id) {
    if (!("email" in data)) data.email = Liste_ElementWertRausZurueck("email", mitglied_id, "mitglieder", undefined);
    if (!("vorname" in data)) data.vorname = Liste_ElementWertRausZurueck("vorname", mitglied_id, "mitglieder", undefined);
    if (!("nachname" in data)) data.nachname = Liste_ElementWertRausZurueck("nachname", mitglied_id, "mitglieder", undefined);
    if (!("geburt" in data)) data.geburt = Liste_ElementWertRausZurueck("geburt", mitglied_id, "mitglieder", undefined);
    if (!("postleitzahl" in data)) data.postleitzahl = Liste_ElementWertRausZurueck("postleitzahl", mitglied_id, "mitglieder", undefined);
    if (!("wohnort" in data)) data.wohnort = Liste_ElementWertRausZurueck("wohnort", mitglied_id, "mitglieder", undefined);
    if (!("geschlecht" in data)) data.geschlecht = Liste_ElementWertRausZurueck("geschlecht", mitglied_id, "mitglieder", undefined);
    if (!("register" in data)) data.register = Liste_ElementWertRausZurueck("register", mitglied_id, "mitglieder", undefined);
    if (!("auto" in data)) data.auto = Liste_ElementWertRausZurueck("auto", mitglied_id, "mitglieder", undefined);
    if (!("funktion" in data)) data.funktion = Liste_ElementWertRausZurueck("funktion", mitglied_id, "mitglieder", undefined);
    if (!("vorstandschaft_janein" in data))
        data.vorstandschaft_janein = Liste_ElementWertRausZurueck("vorstandschaft_janein", mitglied_id, "mitglieder", undefined);
    if (!("aktiv_janein" in data)) data.aktiv_janein = Number(Liste_ElementWertRausZurueck("aktiv_janein", mitglied_id, "mitglieder", undefined));
    if (!("real_janein" in data)) data.real_janein = Number(Liste_ElementWertRausZurueck("real_janein", mitglied_id, "mitglieder", undefined));
    if (!("bemerkung" in data)) data.bemerkung = Liste_ElementWertRausZurueck("bemerkung", mitglied_id, "mitglieder", null);

    data = Util_WertBereinigtZurueck(data, new Object());

    if (isLuxonDateTime(data.geburt)) data.geburt = data.geburt.toISO();
    if (isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.mitglieder.element_ergaenzen_aktion = function (mitglied) {
    if ("vorstandschaft_janein" in mitglied && mitglied.vorstandschaft_janein == 1) mitglied.vorstandschaft_janein = true;
    else mitglied.vorstandschaft_janein = false;
    if ("aktiv_janein" in mitglied && mitglied.aktiv_janein == 1) mitglied.aktiv_janein = true;
    else mitglied.aktiv_janein = false;
    if ("real_janein" in mitglied && mitglied.real_janein == 1) mitglied.real_janein = true;
    else mitglied.real_janein = false;

    if ("geburt" in mitglied) {
        mitglied.alter = -1 * mitglied.geburt.diffNow("years").years;

        mitglied.geburtstag = mitglied.geburt.set({ year: DATETIME.now().year });
        if (mitglied.geburtstag < DATETIME.now().startOf("day")) mitglied.geburtstag = mitglied.geburtstag.plus({ years: 1 });
        mitglied.alter_geburtstag = mitglied.geburtstag.diff(mitglied.geburt, "years").years;
    }
};

ZUSATZSYMBOLE.geburtstag = new Object();
ZUSATZSYMBOLE.geburtstag.aktualisieren_aktion = function ($zusatzsymbol, $container) {
    const $element = $container;
    const geburtstag = Liste_ElementWertRausZurueck(
        "geburtstag",
        Util_WertBereinigtZurueck($element.attr("mitglied_id"), undefined),
        "mitglieder",
        undefined,
    );
    if (typeof geburtstag !== "undefined" && geburtstag <= DATETIME.now() && DATETIME.now() <= geburtstag.plus({ days: 1 }))
        $zusatzsymbol.removeClass("invisible");
    else $zusatzsymbol.addClass("invisible");
};

function Mitglieder_Init() {
    // PASSWORT ÄNDERN
    $(document).on("click", '.werkzeug[werkzeug="passwort_aendern"]', function () {
        Mitglieder_PasswortAendern(
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
        );
    });

    // PASSWORT FESTLEGEN
    $(document).on("click", '.werkzeug[werkzeug="passwort_festlegen"]', function () {
        Mitglieder_PasswortFestlegen(
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
        );
    });

    // RECHTE VERGEBEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="rechte_vergeben"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "rechte_vergeben_modal",
            "rechte_vergeben",
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                verfuegbares_recht_id: Util_WertBereinigtZurueck($(this).attr("verfuegbares_recht_id"), undefined),
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
            },
            "vergebene_rechte",
        );
    });

    // RECHTE VERGEBEN
    $(document).on("change", '.werkzeug[werkzeug="vergebenes_recht_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $element: $(this).closest(".element") },
            {
                verfuegbares_recht_id: Util_WertBereinigtZurueck($(this).attr("verfuegbares_recht_id"), undefined),
                mitglied_id: Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "vergebene_rechte",
        );
    });

    // EINMAL-LINK ANZEIGEN
    $(document).on("click", '.werkzeug[werkzeug="einmal_link_anzeigen"]', function () {
        Mitglieder_EinmalLinkAnzeigen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
        );
    });

    // EINMAL-LINK EMAIL
    $(document).on("click", '.werkzeug[werkzeug="einmal_link_email"]', function () {
        Mitglieder_EinmalLinkEmail(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Util_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Util_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
        );
    });
}
