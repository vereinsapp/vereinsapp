LISTEN.mitglieder.element_erstellen_data_vervollstaendigen_aktion = function (data) {
    data = Liste_WertBereinigtZurueck(data, new Object());

    if (isLuxonDateTime(data.geburt)) data.geburt = data.geburt.toISO();
    if (!("bemerkung" in data) || isEmptyString(data.bemerkung)) data.bemerkung = null;

    return data;
};

LISTEN.mitglieder.element_aendern_data_vervollstaendigen_aktion = function (data, mitglied_id) {
    if (!("email" in data)) data.email = Liste_VariableRausZurueck("email", mitglied_id, "mitglieder", undefined);
    if (!("vorname" in data)) data.vorname = Liste_VariableRausZurueck("vorname", mitglied_id, "mitglieder", undefined);
    if (!("nachname" in data)) data.nachname = Liste_VariableRausZurueck("nachname", mitglied_id, "mitglieder", undefined);
    if (!("geburt" in data)) data.geburt = Liste_VariableRausZurueck("geburt", mitglied_id, "mitglieder", undefined);
    if (!("postleitzahl" in data)) data.postleitzahl = Liste_VariableRausZurueck("postleitzahl", mitglied_id, "mitglieder", undefined);
    if (!("wohnort" in data)) data.wohnort = Liste_VariableRausZurueck("wohnort", mitglied_id, "mitglieder", undefined);
    if (!("geschlecht" in data)) data.geschlecht = Liste_VariableRausZurueck("geschlecht", mitglied_id, "mitglieder", undefined);
    if (!("register" in data)) data.register = Liste_VariableRausZurueck("register", mitglied_id, "mitglieder", undefined);
    if (!("auto" in data)) data.auto = Liste_VariableRausZurueck("auto", mitglied_id, "mitglieder", undefined);
    if (!("funktion" in data)) data.funktion = Liste_VariableRausZurueck("funktion", mitglied_id, "mitglieder", undefined);
    if (!("vorstandschaft_janein" in data))
        data.vorstandschaft_janein = Liste_VariableRausZurueck("vorstandschaft_janein", mitglied_id, "mitglieder", undefined);
    if (!("aktiv_janein" in data)) data.aktiv_janein = Number(Liste_VariableRausZurueck("aktiv_janein", mitglied_id, "mitglieder", undefined));
    if (!("real_janein" in data)) data.real_janein = Number(Liste_VariableRausZurueck("real_janein", mitglied_id, "mitglieder", undefined));
    if (!("bemerkung" in data)) data.bemerkung = Liste_VariableRausZurueck("bemerkung", mitglied_id, "mitglieder", null);

    data = Liste_WertBereinigtZurueck(data, new Object());

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

LISTEN.vergebene_rechte.element_ergaenzen_aktion = function (vergebenes_recht) {
    if ("verfuegbares_recht_id" in vergebenes_recht)
        vergebenes_recht.verfuegbares_recht_titel = Liste_VariableRausZurueck(
            "titel",
            vergebenes_recht.verfuegbares_recht_id,
            "verfuegbare_rechte",
            undefined,
        );
    if ("mitglied_id" in vergebenes_recht)
        vergebenes_recht.mitglied_vorname = Liste_VariableRausZurueck("vorname", vergebenes_recht.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in vergebenes_recht)
        vergebenes_recht.mitglied_nachname = Liste_VariableRausZurueck("nachname", vergebenes_recht.mitglied_id, "mitglieder", undefined);
};

WERKZEUGE.mitglied_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Mitglieder_Init() {
    // MITGLIED ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[werkzeug="mitglied_erstellen"], .werkzeug[werkzeug="mitglied_duplizieren"]', function () {
        Liste_ElementErstellen(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
            "mitglieder",
        );
    });

    // MITGLIED ÄNDERN
    $(document).on("click", '.werkzeug[werkzeug="mitglied_aendern"], .werkzeug[werkzeug="meine_daten_aendern"]', function () {
        Liste_ElementAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
            "mitglieder",
        );
    });

    // PASSWORT ÄNDERN
    $(document).on("click", '.werkzeug[werkzeug="passwort_aendern"]', function () {
        Mitglieder_PasswortAendern(
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
        );
    });

    // PASSWORT FESTLEGEN
    $(document).on("click", '.werkzeug[werkzeug="passwort_festlegen"]', function () {
        Mitglieder_PasswortFestlegen(
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
        );
    });

    // RECHTE VERGEBEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[werkzeug="rechte_vergeben"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "rechte_vergeben_modal",
            "rechte_vergeben",
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            {
                verfuegbares_recht_id: Liste_WertBereinigtZurueck($(this).attr("verfuegbares_recht_id"), undefined),
                mitglied_id: Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
            },
            "vergebene_rechte",
        );
    });

    // RECHTE VERGEBEN
    $(document).on("change", '.werkzeug[werkzeug="vergebenes_recht_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                verfuegbares_recht_id: Liste_WertBereinigtZurueck($(this).attr("verfuegbares_recht_id"), undefined),
                mitglied_id: Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            "vergebene_rechte",
        );
    });

    // EINMAL-LINK ANZEIGEN
    $(document).on("click", '.werkzeug[werkzeug="einmal_link_anzeigen"]', function () {
        Mitglieder_EinmalLinkAnzeigen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
        );
    });

    // EINMAL-LINK EMAIL
    $(document).on("click", '.werkzeug[werkzeug="einmal_link_email"]', function () {
        Mitglieder_EinmalLinkEmail(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Liste_WertBereinigtZurueck($(this).attr("modal_title"), undefined),
            Liste_WertBereinigtZurueck($(this).attr("mitglied_id"), undefined),
        );
    });
}
