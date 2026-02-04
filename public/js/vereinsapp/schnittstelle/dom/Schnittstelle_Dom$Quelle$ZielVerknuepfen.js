/**
 * @param {JQuery} $quelle
 * @param {JQuery} $ziel
 */

function Schnittstelle_Dom$Quelle$ZielVerknuepfen($quelle, $ziel) {
    if (typeof $quelle !== "undefined" && $quelle.exists()) {
        if (typeof $ziel !== "undefined" && $ziel.exists()) {
            let ziel_id = zufaelligeZeichenketteZurueck(8);
            while ($("#" + ziel_id).exists()) ziel_id = zufaelligeZeichenketteZurueck(8);

            if ($ziel.attr("id") !== undefined && $ziel.attr("id") !== "")
                Schnittstelle_LogInDieKonsole(
                    "Schnittstelle_Dom$Quelle$ZielVerknuepfen: Ziel hat bereits die ID #" +
                        $ziel.attr("id") +
                        " und wird mit #" +
                        ziel_id +
                        " überschrieben!",
                );

            $ziel.attr("id", ziel_id);
            $quelle.attr("data-ziel_id", ziel_id);
        } else Schnittstelle_LogInDieKonsole("Schnittstelle_Dom$Quelle$ZielVerknuepfen: Ziel nicht gefunden!");
    } else Schnittstelle_LogInDieKonsole("Schnittstelle_Dom$Quelle$ZielVerknuepfen: Quelle nicht gefunden!");
}
