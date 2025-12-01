ELEMENTE.titel.ergaenzen_aktion = function (titel) {
    titel["anzahl_noten"] = 0;
    $.each(NOTENBANK_ERLAUBTE_DATEITYPEN_NOTEN, function (index, typ) {
        titel["anzahl_noten"] += Liste_VerzeichnisAnzahlZurueck(titel["verzeichnis"], typ);
    });

    titel["anzahl_audio"] = 0;
    $.each(NOTENBANK_ERLAUBTE_DATEITYPEN_AUDIO, function (index, typ) {
        titel["anzahl_audio"] += Liste_VerzeichnisAnzahlZurueck(titel["verzeichnis"], typ);
    });

    titel["anzahl_verzeichnis"] = Liste_VerzeichnisAnzahlZurueck(titel["verzeichnis"]);
};

function Notenbank_Init() {
    // TITEL ERSTELLEN
    $(document).on("click", ".btn_titel_erstellen", function () {
        Notenbank_TitelErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            undefined
        );
    });

    // TITEL ÄNDERN
    $(document).on("click", ".btn_titel_aendern", function () {
        Notenbank_TitelAendern(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });

    // TITEL DUPLIZIEREN
    $(document).on("click", ".btn_titel_duplizieren", function () {
        Notenbank_TitelErstellen(
            $(this).hasClass("formular_oeffnen"),
            { $ausloesend: $(this), $modal: $(this).closest(".modal"), $formular: $(this).closest(".formular") },
            Liste_ElementFormularEigenschaftenWerteZurueck($(this).closest(".formular")),
            $(this).attr("data-title"),
            $(this).attr("data-element_id")
        );
    });
}
