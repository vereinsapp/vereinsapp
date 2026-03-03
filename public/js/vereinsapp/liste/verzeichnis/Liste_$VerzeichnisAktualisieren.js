/**
 * @param {JQuery} $verzeichnis
 */

function Liste_$VerzeichnisAktualisieren($verzeichnis) {
    const liste = Util_WertBereinigtZurueck($verzeichnis.attr("liste"), undefined);
    const verzeichnis_instanz = Util_WertBereinigtZurueck($verzeichnis.attr("instanz"), $verzeichnis.attr("id"));
    const element_id = Util_WertBereinigtZurueck($verzeichnis.attr(LISTEN[liste].element + "_id"), undefined);
    const basis = Util_WertBereinigtZurueck($verzeichnis.attr("basis"), new Array());

    if (basis.length > 0)
        $verzeichnis
            .closest(".unterverzeichnis")
            .find(".beschriftung")
            .text(basis[basis.length - 1]);

    let inhalt = Liste_VariableRausZurueck("verzeichnis", element_id, liste, new Object());
    $.each(basis, function (position, unterverzeichnis) {
        inhalt = inhalt.unterverzeichnisse[unterverzeichnis];
    });
    const unterverzeichnisse_gefiltert_sortiert = Object.keys(inhalt.unterverzeichnisse);
    const dateien_gefiltert_sortiert = inhalt.dateien;

    // UNTERVERZEICHNISSE IM DOM LÖSCHEN
    $verzeichnis.children(".unterverzeichnis").each(function () {
        const $unterverzeichnis = $(this);
        const unterverzeichnis = $unterverzeichnis.attr("unterverzeichnis");
        if (!unterverzeichnisse_gefiltert_sortiert.includes(unterverzeichnis)) $unterverzeichnis.remove();
    });

    // DATEIEN IM DOM LÖSCHEN
    $verzeichnis.children(".datei").each(function () {
        const $datei = $(this);
        const datei = $datei.attr("datei");
        if (!dateien_gefiltert_sortiert.includes(datei)) $datei.remove();
    });

    // UNTERVERZEICHNISSE IM DOM ERGÄNZEN
    $.each(unterverzeichnisse_gefiltert_sortiert, function (position, unterverzeichnis) {
        const $unterverzeichnis = $verzeichnis.children(".unterverzeichnis[unterverzeichnis='" + unterverzeichnis + "']");

        // Unterverzeichnis wird nur hinzugefügt, falls es noch nicht existiert
        if (!$unterverzeichnis.exists()) {
            // Blanko-Verzeichnis wird geklont
            const $neues_unterverzeichnis = LISTEN[liste].instanz[verzeichnis_instanz].$blanko_unterverzeichnis
                .clone()
                .removeClass("blanko invisible");

            $neues_unterverzeichnis.attr("unterverzeichnis", unterverzeichnis);

            const $zugehoeriges_collapse = $neues_unterverzeichnis.find(".collapse").first();
            $zugehoeriges_collapse.attr("id", zufaelligeZeichenketteZurueck(8));
            $neues_unterverzeichnis
                .find('[data-bs-toggle="collapse"]')
                .first()
                .attr("data-bs-target", "#" + $zugehoeriges_collapse.attr("id"));
            $neues_unterverzeichnis.find(".toggle_symbol").attr("data-bs-target", "#" + $zugehoeriges_collapse.attr("id"));

            const neue_basis = JSON.parse(JSON.stringify(basis));
            neue_basis.push(unterverzeichnis);
            $neues_unterverzeichnis
                .find(".verzeichnis")
                .attr("liste", liste)
                .attr("instanz", verzeichnis_instanz)
                .attr(LISTEN[liste].element + "_id", element_id)
                .attr("basis", JsonStringifiedZurueck(neue_basis, new Array()));

            // Unterverzeichnis wird hinzugefügt (je nachdem, wo es im Verzeichnis positioniert ist)
            if (position === 0) $neues_unterverzeichnis.appendTo($verzeichnis);
            else
                $neues_unterverzeichnis.insertAfter(
                    $verzeichnis.children('.unterverzeichnis[unterverzeichnis="' + unterverzeichnisse_gefiltert_sortiert[position - 1] + '"]'),
                );
        }
    });

    // DATEIEN IM DOM ERGÄNZEN
    $.each(dateien_gefiltert_sortiert, function (position, datei) {
        const $datei = $verzeichnis.children('.datei[datei="' + datei + '"]');

        // Datei wird nur hinzugefügt, falls sie noch nicht existiert
        if (!$datei.exists()) {
            // Blanko-Datei wird geklont
            const $neue_datei = LISTEN[liste].instanz[verzeichnis_instanz].$blanko_datei.clone().removeClass("blanko invisible");

            $neue_datei.attr("liste", liste).attr("datei", datei);

            // Datei wird hinzugefügt (je nachdem, wo sie im Verzeichnis positioniert ist)
            if (position === 0) {
                if (unterverzeichnisse_gefiltert_sortiert.length > 0)
                    $neue_datei.insertAfter(
                        $verzeichnis.children(
                            '.unterverzeichnis[unterverzeichnis="' +
                                unterverzeichnisse_gefiltert_sortiert[unterverzeichnisse_gefiltert_sortiert.length - 1] +
                                '"]',
                        ),
                    );
                else $neue_datei.appendTo($verzeichnis);
            } else $neue_datei.insertAfter($verzeichnis.children('.datei[datei="' + dateien_gefiltert_sortiert[position - 1] + '"]'));
        }
    });

    // UNTERVERZEICHNISSE IM DOM SORTIEREN
    $.each(unterverzeichnisse_gefiltert_sortiert, function (position, unterverzeichnis) {
        const $unterverzeichnis = $verzeichnis.children(".unterverzeichnis[unterverzeichnis='" + unterverzeichnis + "']");
        if (position === 0) $unterverzeichnis.appendTo($verzeichnis);
        else
            $unterverzeichnis.insertAfter(
                $verzeichnis.children('.unterverzeichnis[unterverzeichnis="' + unterverzeichnisse_gefiltert_sortiert[position - 1] + '"]'),
            );
    });

    // DATEIEN IM DOM SORTIEREN
    $.each(dateien_gefiltert_sortiert, function (position, datei) {
        const $datei = $verzeichnis.children('.datei[datei="' + datei + '"]');
        if (position === 0) {
            if (unterverzeichnisse_gefiltert_sortiert.length > 0)
                $datei.insertAfter(
                    $verzeichnis.children(
                        '.unterverzeichnis[unterverzeichnis="' +
                            unterverzeichnisse_gefiltert_sortiert[unterverzeichnisse_gefiltert_sortiert.length - 1] +
                            '"]',
                    ),
                );
            else $datei.appendTo($verzeichnis);
        } else $datei.insertAfter($verzeichnis.children('.datei[datei="' + dateien_gefiltert_sortiert[position - 1] + '"]'));
    });

    // UNTERVERZEICHNISSE AKTUALISIEREN
    $verzeichnis.children(".unterverzeichnis").each(function () {
        Liste_$VerzeichnisAktualisieren($(this).find(".verzeichnis").first());
    });

    // ÜBERSCHRIFT AKTUALISIEREN
    $('.ueberschrift[instanz="' + verzeichnis_instanz + '"]').each(function () {
        Liste_$UeberschriftAktualisieren($(this), $verzeichnis);
    });

    // WERKZEUG AKTUALISIEREN
    $('.werkzeug[instanz="' + verzeichnis_instanz + '"]').each(function () {
        Liste_$WerkzeugAktualisieren($(this), $verzeichnis);
    });

    // LISTENSTATISTIK AKTUALISIEREN
    $('.listenstatistik[instanz="' + verzeichnis_instanz + '"]').each(function () {
        Liste_$ListenstatistikAktualisieren($(this), $verzeichnis);
    });
}
