/**
 * @param {JQuery} $quelle
 * @param {JQuery} $ziel
 */

function Schnittstelle_Dom$Quelle$ZielVerknuepfen($quelle, $ziel) {
    if (typeof $quelle !== "undefined" && $quelle.exists()) {
        if (typeof $ziel !== "undefined" && $ziel.exists()) {
            let ziel_id;
            if ($ziel.attr("id") !== undefined && !isEmptyString($ziel.attr("id"))) {
                ziel_id = $ziel.attr("id");
                Schnittstelle_LogInDieKonsole(
                    "Schnittstelle_Dom$Quelle$ZielVerknuepfen: Ziel hat bereits die ID #" + $ziel.attr("id") + ", die nun weiterverwendet wird.",
                );
            } else {
                ziel_id = zufaelligeZeichenketteZurueck(8);
                while ($("#" + ziel_id).exists()) ziel_id = zufaelligeZeichenketteZurueck(8);
            }

            $ziel.attr("id", ziel_id);
            $quelle.attr("ziel_id", ziel_id);
        } else Schnittstelle_LogInDieKonsole("Schnittstelle_Dom$Quelle$ZielVerknuepfen: Ziel nicht gefunden!");
    } else Schnittstelle_LogInDieKonsole("Schnittstelle_Dom$Quelle$ZielVerknuepfen: Quelle nicht gefunden!");
}
