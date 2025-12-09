<div class="verknuepfungen_auswahlmoeglichkeiten" data-verknuepfungen="<?= $verknuepfungen ?>" data-liste="<?= $liste ?>" data-element_id="<?= $element_id ?>" data-gegen_liste="<?= $gegen_liste ?>" >
    <div class="verknuepfung_moeglich invisible">
        <div class="btn-group btn-group-sm stretched-link-unwirksam d-flex" role="group">
            <button type="button" class="btn btn_verknuepfung_erstellen btn-outline-<?= $auswahlmoeglichkeiten[1]['farbe']; ?> w-25 flex-fill" data-status="1"><span class="beschriftung"><?= $auswahlmoeglichkeiten[1]['aktiv']; ?></span></button>
            <button type="button" class="btn btn_verknuepfung_bemerkung_aendern formular_oeffnen btn-outline-primary flex-fill" data-liste="<?= $verknuepfungen ?>"><span class="beschriftung"><i class="bi bi-<?= SYMBOLE['bemerkung']['bootstrap']; ?>"></i></span></button>
            <button type="button" class="btn btn_verknuepfung_erstellen btn-outline-<?= $auswahlmoeglichkeiten[2]['farbe']; ?> w-25 flex-fill" data-status="2"><span class="beschriftung"><?= $auswahlmoeglichkeiten[2]['aktiv']; ?></span></button>
        </div>
    </div>
    <div class="verknuepfung_nicht_moeglich invisible text-secondary text-center small"></div>
</div>
