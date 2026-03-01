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
        vergebenes_recht.verfuegbares_recht_titel = Schnittstelle_VariableRausZurueck(
            "titel",
            vergebenes_recht.verfuegbares_recht_id,
            "verfuegbare_rechte",
            undefined,
        );
    if ("mitglied_id" in vergebenes_recht)
        vergebenes_recht.mitglied_vorname = Schnittstelle_VariableRausZurueck("vorname", vergebenes_recht.mitglied_id, "mitglieder", undefined);
    if ("mitglied_id" in vergebenes_recht)
        vergebenes_recht.mitglied_nachname = Schnittstelle_VariableRausZurueck("nachname", vergebenes_recht.mitglied_id, "mitglieder", undefined);
};

WERKZEUGE.mitglied_erstellen.aktualisieren_aktion = WERKZEUGE_ERSTELLEN_AKTUALISIEREN_AKTION;

function Mitglieder_Init() {
    // MITGLIED ERSTELLEN / DUPLIZIEREN
    $(document).on("click", '.werkzeug[data-werkzeug="mitglied_erstellen"], .werkzeug[data-werkzeug="mitglied_duplizieren"]', function () {
        Mitglieder_MitgliedErstellen(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });

    // MITGLIED ÄNDERN
    $(document).on("click", '.werkzeug[data-werkzeug="mitglied_aendern"], .werkzeug[data-werkzeug="meine_daten_aendern"]', function () {
        Mitglieder_MitgliedAendern(
            $(this).hasClass("data_vollstaendig"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });

    // PASSWORT ÄNDERN
    $(document).on("click", '.werkzeug[data-werkzeug="passwort_aendern"]', function () {
        Mitglieder_PasswortAendern(
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });

    // PASSWORT FESTLEGEN
    $(document).on("click", '.werkzeug[data-werkzeug="passwort_festlegen"]', function () {
        Mitglieder_PasswortFestlegen(
            { $werkzeug: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_Element$FormularWerteNachEigenschaftZurueck($(this).closest(".formular")),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });

    // RECHTE VERGEBEN (MODAL) ÖFFNEN
    $(document).on("click", '.werkzeug[data-werkzeug="rechte_vergeben"]', function () {
        Liste_VerknuepfungenModalOeffnen(
            "rechte_vergeben_modal",
            "rechte_vergeben",
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            {
                verfuegbares_recht_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-verfuegbares_recht_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
            },
            "vergebene_rechte",
        );
    });

    // RECHTE VERGEBEN
    $(document).on("change", '.werkzeug[data-werkzeug="vergebenes_recht_erstellen"]', function () {
        Liste_VerknuepfungErstellen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            {
                verfuegbares_recht_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-verfuegbares_recht_id"), undefined),
                mitglied_id: Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
                status: Number($(this).is(":checked")),
            },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            "vergebene_rechte",
        );
    });

    // EINMAL-LINK ANZEIGEN
    $(document).on("click", '.werkzeug[data-werkzeug="einmal_link_anzeigen"]', function () {
        Mitglieder_EinmalLinkAnzeigen(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });

    // EINMAL-LINK EMAIL
    $(document).on("click", '.werkzeug[data-werkzeug="einmal_link_email"]', function () {
        Mitglieder_EinmalLinkEmail(
            $(this).hasClass("bestaetigt"),
            { $werkzeug: $(this), $modal: $(this).closest(".modal") },
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-modal_title"), undefined),
            Schnittstelle_VariableWertBereinigtZurueck($(this).attr("data-mitglied_id"), undefined),
        );
    });
}
