ELEMENTE.mitglied.ergaenzen_aktion = function (mitglied) {
    if ("vorstandschaft_janein" in mitglied && mitglied["vorstandschaft_janein"] == 1) mitglied["vorstandschaft_janein"] = true;
    else mitglied["vorstandschaft_janein"] = false;
    if ("aktiv_janein" in mitglied && mitglied["aktiv_janein"] == 1) mitglied["aktiv_janein"] = true;
    else mitglied["aktiv_janein"] = false;
    if ("real_janein" in mitglied && mitglied["real_janein"] == 1) mitglied["real_janein"] = true;
    else mitglied["real_janein"] = false;

    if ("geburt" in mitglied) {
        mitglied["alter"] = -1 * mitglied["geburt"].diffNow("years").years;

        mitglied["geburtstag"] = mitglied["geburt"].set({ year: DATETIME.now().year });
        if (mitglied["geburtstag"] < DATETIME.now().startOf("day")) mitglied["geburtstag"] = mitglied["geburtstag"].plus({ years: 1 });
        mitglied["alter_geburtstag"] = mitglied["geburtstag"].diff(mitglied["geburt"], "years").years;
    }
};

ELEMENTE.vergebenes_recht.zuordnen_aktion = function (vergebenes_recht) {
    if ("mitglieder" in LISTEN) {
        const mitglied = LISTEN.mitglieder.tabelle[Number(vergebenes_recht.mitglied_id)];

        if (typeof mitglied !== "undefined") {
            if (!("zugeordnete_elemente_nach_liste" in mitglied)) mitglied.zugeordnete_elemente_nach_liste = new Object();
            const zugeordnete_elemente_nach_liste = mitglied.zugeordnete_elemente_nach_liste;

            if (!("vergebene_rechte" in zugeordnete_elemente_nach_liste)) zugeordnete_elemente_nach_liste.vergebene_rechte = new Array();
            zugeordnete_elemente_nach_liste.vergebene_rechte.push(vergebenes_recht);
        }
    }
};

function Mitglieder_Init() {
    // MITGLIED ERSTELLEN
    $(document).on("click", ".btn_mitglied_erstellen", function () {
        Mitglieder_MitgliedErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // MITGLIED ÄNDERN
    $(document).on("click", ".btn_mitglied_aendern", function () {
        Mitglieder_MitgliedAendern(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // MITGLIED DUPLIZIEREN
    $(document).on("click", ".btn_mitglied_duplizieren", function () {
        Mitglieder_MitgliedErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // MITGLIED LÖSCHEN
    $(document).on("click", ".btn_mitglied_loeschen", function () {
        Liste_ElementLoeschen(
            $(this).hasClass("bestaetigung_einfordern"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal") },
            { weiterleiten: $(this).attr("data-weiterleiten") },
            $(this).attr("data-title"),
            $(this).attr("data-element_id"),
            "mitglieder"
        );
    });

    // PASSWORT ÄNDERN
    $(document).on("click", ".btn_mitglied_passwort_aendern", function () {
        Mitglieder_PasswortAendern(
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-element_id")
        );
    });

    // PASSWORT FESTLEGEN
    $(document).on("click", ".btn_mitglied_passwort_festlegen", function () {
        Mitglieder_PasswortFestlegen(
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-element_id")
        );
    });

    // EINMAL-LINK ANZEIGEN
    $(document).on("click", ".btn_mitglied_einmal_link_anzeigen", function () {
        Mitglieder_EinmalLinkErstellen(
            $(this).hasClass("formular_oeffnen"),
            $(this).hasClass("bestaetigung_einfordern"),
            {
                $btn_ausloesend: $(this),
                $modal: $(this).closest(".modal"),
                $formular: $(this).closest(".formular"),
            },
            new Object(),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // EINMAL-LINK PER EMAIL VERSCHICKEN
    $(document).on("click", ".btn_mitglied_einmal_link_email", function () {
        Mitglieder_EinmalLinkErstellen(
            $(this).hasClass("formular_oeffnen"),
            $(this).hasClass("bestaetigung_einfordern"),
            { $btn_ausloesend: $(this), $modal: $(this).closest(".modal") },
            { email: true },
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // AUFGABEN ERLEDIGT ANZEIGEN
    $(document).on("click", ".btn_mitglieder_aufgaben_erledigt_anzeigen", function () {
        Mitglieder_MitgliederAufgabenErledigtAnzeigen(
            { $btn_ausloesend: $(this), $liste: $('.liste[id="' + $(this).attr("data-instanz") + '"]') },
            $(this).attr("data-title")
        );
    });
}
