<li class="auswertung zusammenfassung" data-instanz="<?= $zusammenfassung['instanz']; ?>" data-auswertungen="<?= $zusammenfassung['auswertungen']; ?>" data-liste="<?= $zusammenfassung['liste']; ?>" style="list-style: none;">
    <div class="row g-0">
        <div class="ergebnis_anzahl col-1 h5 float-start text-start" data-status=1></div>
        <div class="col-10 text-center">
            <span class="beschriftung"><?php if( array_key_exists( 'beschriftung', $zusammenfassung ) ) echo $zusammenfassung['beschriftung']; ?></span>
            <?php if( array_key_exists( 'progress', $zusammenfassung ) ) { ?><div class="progress-stacked">
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=1><div class="progress-bar bg-<?= TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[1]['farbe']; ?>"></div></div>
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=0><div class="progress-bar bg-transparent"></div></div>
                <div class="progress ergebnis_anzahl" role="progressbar" data-status=2><div class="progress-bar bg-<?= TERMINE_RUECKMELDUNG_AUSWAHLMOEGLICHKEITEN[2]['farbe']; ?>"></div></div>
            </div><?php } ?>
        </div>
        <div class="ergebnis_anzahl col-1 h5 float-end text-end" data-status=2></div>
    </div>
</li>

