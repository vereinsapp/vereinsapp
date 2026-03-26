<?php

/*
================================================================================
    Fuzzy Synonym Sheet Search – Technische Beschreibung
    ================================================================================

    Zweck:
    -------
    Fuzzy Synonym Sheet Search ist ein intelligentes, faulfreundliches Suchtool für
    Notenarchive. Es kombiniert Teilwortsuche, Synonym-Erweiterung und unscharfe 
    Suche (Fuzzy Search), um Noten zuverlässig und schnell auffindbar zu machen.

    Indexer (indexer.php):
    ----------------------
    - Automatisierter Cronjob (stündlich) durchsucht Verzeichnisse ("notenbank").
    - Erzeugt "index.txt" als Basis für die Client-seitige Suche.

    Suchlogik & Anzeige (index.php):
    --------------------------------
    1. Index-Verarbeitung: 
       - "index.txt" wird geladen, normalisiert und um definierte Synonymgruppen
         erweitert (z.B. "schlagzeug" → ["schlagzeug", "drums", "percussion", ...]).
    2. Suche:
       - Unterstützt Teilwortsuche, Levenshtein-basierte Fuzzy-Suche (Distanz ≤2) 
         und eine AND-Logik für mehrere Suchbegriffe.
       - Instrumentenfilter über Buttons oder Dropdown-Menü ergänzen die Suche.

    Viewer & Dokumenten-Handling:
    -----------------------------
    - Vorschau: Beim Klick auf ein Suchergebnis wird eine PNG-Vorschau via
      "pdf2png.php" in einem Overlay-Container ("viewerContainer") geladen.
    - Toolbar-Funktionen (im Viewer):
        - Zurück: Schließt die Vorschau und kehrt zur Ergebnisliste zurück.
        - Herunterladen: Startet den direkten Download des PDFs.
        - Drucken (Lokal): Öffnet das PDF in einem versteckten Iframe für den
          lokalen Druckdialog.
        - Im Proberaum drucken: Sendet den Dateipfad via POST an "spool.php", um 
          einen Druckauftrag auf einem entfernten System (Netzwerkdrucker) auszulösen.
    - Status-Feedback: Ein zentraler Loader-Spinner zeigt den Fortschritt bei der
      Vorschau-Generierung und beim Senden an den Spooler an.

    Besondere Features:
    -------------------
    - Faulfreundlich: Kurze Begriffe, Tippfehler oder Synonyme werden erkannt.
    - Direktes Feedback: Der Spooler-Button visualisiert den Erfolg/Fehler des
      Druckauftrags direkt am Button (Status-Farbwechsel).
    - Mobil-optimiert: Responsive Toolbar (unten am Handy, oben rechts am Desktop).
    - Druck-Optimierung: CSS-Print-Media-Queries fokussieren auf das Dokument.

    ================================================================================
*/


?><!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Notensuche MV-Schwarzach</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <style>
        body { background-color: #f8f9fa;z-index:2; }
		
		#results a {
			display: block;
			padding: 6px 10px;
			text-decoration: none;
			border-bottom: 1px solid #ddd;
			font-family: monospace;
			word-break: break-word;
			overflow-wrap: anywhere;
			white-space: pre-wrap;
		}

		#results a::after {
			content: "";
			word-break: break-all;
		}
		
		#viewer {
			position: fixed;
			inset: 0;
			width: 100vw;
			height: 100vh;
			border: none;
			z-index: 1000;
			visibility: hidden;
			pointer-events: none;
		}
		
		.viewer-active {
			visibility: visible;
			pointer-events: auto;
		}

	/* Toolbar-Grundstruktur: Erst sichtbar, wenn .active-Klasse vorhanden */
	#viewerToolbar {
		position: fixed;
		z-index: 2000;
		display: none; /* Standard: Ausgeblendet */
		gap: 10px;
		padding: 10px;
		/* Mobil: Unten am Bildschirmrand */
		bottom: 20px;
		left: 10px;
		right: 10px;
		grid-template-columns: 1fr 1fr; /* 2-Spalten-Layout am Handy */
	}

	/* Toolbar wird nur angezeigt, wenn sie die Klasse .active hat */
	#viewerToolbar.active {
		display: grid; 
	}

	/* Tablet & Desktop: Toolbar nach oben rechts verschieben */
	@media (min-width: 768px) {
		#viewerToolbar {
			top: 20px;
			right: 20px;
			left: auto;
			bottom: auto;
			display: none; /* Standard bei Desktop aus */
			grid-template-columns: repeat(4, auto); /* Buttons nebeneinander */
		}
		#viewerToolbar.active {
			display: grid;
		}
	}

	.viewer-btn {
		padding: 12px 10px;
		font-size: 14px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		color: white;
		background: linear-gradient(135deg, #741537, #d6356e);
		box-shadow: 0 4px 10px rgba(0,0,0,0.25);
		transition: all 0.2s ease;
	}

	/* Hover-Effekte für Desktop */
	@media (hover: hover) {
		.viewer-btn:hover { transform: translateY(-2px); }
	}

    /* Der Container liegt über dem Rest der Seite */
    #viewerContainer {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        background-color: #333; /* Dunkler Hintergrund wie beim PDF-Viewer */
        z-index: 1000;
        visibility: hidden;
        overflow-y: auto; /* Ermöglicht das Scrollen nach unten */
        -webkit-overflow-scrolling: touch;
    }

    /* Das Bild skaliert auf die volle Breite */
    #viewerImg {
        width: 100%;
        height: auto;
        display: block;
    }

    .viewer-active {
        visibility: visible !important;
    }

    /* Druck-Optimierung: Nur das Bild drucken */
    @media print {
        body * { visibility: hidden; }
        #viewerContainer, #viewerContainer *, #viewerImg { 
            visibility: visible; 
            position: absolute;
            left: 0; top: 0;
            width: 100%;
        }
    }
	
	/* Der Lade-Container */
	#viewerLoader {
		position: fixed;
		inset: 0;
		display: none; /* Standardmäßig aus */
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.5); /* Leicht abgedunkelt */
		z-index: 1500;
		color: white;
		flex-direction: column;
		gap: 15px;
	}

	/* Der eigentliche Kringel */
	.spinner {
		width: 50px;
		height: 50px;
		border: 5px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* Text unter dem Spinner */
	#viewerLoader span {
		font-family: sans-serif;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 1px;
	}


    </style>
</head>
<body>

<div id="viewerLoader">
    <div class="spinner"></div>
    <span>Vorschau wird geladen...</span>
</div>

<div id="viewerContainer">
    <img id="viewerImg" src="" alt="Notenblatt">
</div>

<iframe id="printFrame" style="display:none;"></iframe>

<div id="viewerToolbar">
    <button class="viewer-btn" id="btnBack">Zurück</button>
    <button class="viewer-btn" id="btnDownload">Herunterladen</button>
	<button class="viewer-btn" id="btnPrint">Drucken (Lokal)</button>
    <button class="viewer-btn" id="btnSpool">Im Proberaum drucken</button>
</div>

<?php
	// einfacher Passwortschutz
	if (isset($_GET['passwd'])) {
		$pw = $_GET['passwd'];
		if ($pw != 'str47kct') {
			echo "<h2 style='padding:10px;'>Zugriff verweigert.</h2><body><html>";die;
		}
	}
?>

<div class="container-fluid p-4">
    <input 
        type="text" 
        id="searchBox" 
        class="form-control form-control-lg mb-4" 
        placeholder="Titel, Nr. oder Instrument suchen..."
        autofocus
    >

	<div class="mb-4 d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2">
		<select id="preselection" class="form-select w-auto">
			<option value="" selected>Alle</option>
			<option value=" /nr_titel_stimme/">Nr. Titel Stimme</option>
			<option value=" /stimme/">Stimme</option>
			<option value=" /stimme_nr_titel/">Stimme Nr. Titel</option>
			<option value=" /stimme_titel/">Stimme Titel</option>
			<option value=" /titel_stimme/">Titel Stimme</option>
		</select>
		<div id="instrumentButtons"></div>
	</div>
	
    <div id="results" class="mt-4"></div>
</div>

<script>
		
	let indexData = [];
	let originalIndex = [];
	let currentPdf = null;
	let realPdfForDownload = "";
	const searchBox = document.getElementById("searchBox");
	const preselectionDropdown = document.getElementById("preselection");
	const resultsDiv = document.getElementById("results");
	const instrumentButtonsDiv = document.getElementById("instrumentButtons");
	const instruments = ["_C_", "_F_", "_ES_", "_B_", "Posaune", "Horn", "Klarinette", "Schlagzeug", "Flöte", "Trompete", "Tenorhorn", "Bass", "Flügelhorn", "Saxophon", "Gesang", "Direktion"];
	const synonymGroups = [
		["schlagzeug", "drums", "drumset", "percussion", "glockenspiel", "mallets"],
		["klarinette", "clarinet", "schwarzwurzel"],
		["posaune", "trombone"],
		["trompete", "trumpet", "flügelhorn", "flugelhorn", "cornet"],
		["querflöte", "flute", "piccolo", "floete"],
		["bass", "tuba"],
		["e-bass", "stringbass", "kontrabass", "electric bass"],
		["horn", "waldhorn", "english"],
		["tenorhorn", "bariton", "euphonium"],
		["es-","eb-","eb_"],
		["gesang","vocals","text"],
		["direktion","partitur","score"],
		["_Bb","_B_"]
	];
	const viewerContainer = document.getElementById("viewerContainer");
	const viewerImg = document.getElementById("viewerImg");
	const toolbar = document.getElementById("viewerToolbar");
	const loader = document.getElementById("viewerLoader");
	

	function levenshtein(a, b) {
		const matrix = [];
		for (let i = 0; i <= b.length; i++) matrix[i] = [i];
		for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
		for (let i = 1; i <= b.length; i++) {
			for (let j = 1; j <= a.length; j++) {
				if (b.charAt(i - 1) === a.charAt(j - 1)) {
					matrix[i][j] = matrix[i - 1][j - 1];
				} else {
					matrix[i][j] = Math.min(
						matrix[i - 1][j - 1] + 1,
						matrix[i][j - 1] + 1,
						matrix[i - 1][j] + 1
					);
				}
			}
		}
		return matrix[b.length][a.length];
	}

	instruments.sort((a,b) => a.localeCompare(b, 'de'));

	instruments.forEach(instr => {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = "btn btn-sm btn-outline-primary me-2 mb-2";
		btn.textContent = instr;
		btn.addEventListener("click", () => {
			let current = searchBox.value.trim();
			if(current) current += " ";
			searchBox.value = current + instr + " ";
			searchBox.dispatchEvent(new Event("input"));
			searchBox.focus();
		});
		instrumentButtonsDiv.appendChild(btn);
	});

	fetch("index.txt")
		.then(response => response.text())
		.then(text => {
			const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
			originalIndex = [...lines];

			indexData = lines.map(line => {
				const lowerLine = line.toLowerCase();
				let expanded = [lowerLine];

				synonymGroups.forEach(group => {
					if (group.some(word => lowerLine.includes(word))) {
						expanded.push(...group);
					}
				});

				expanded = [...new Set(expanded)];
				return expanded.join(" ");
			});

			console.log("NoteHound Index geladen:", indexData.length, "Einträge mit Synonymen");
		});


	searchBox.addEventListener("input", function () {
		rundog();
	});
	
	preselectionDropdown.addEventListener("change", function () {
		rundog();
	});
	
	function rundog() {
		const query = searchBox.value.toLowerCase().trim() + preselectionDropdown.value;
		resultsDiv.innerHTML = "";
		if (!query) return;

		const terms = query.split(/\s+/);
		const FUZZY_THRESHOLD = 2;
		const FUZZY_MIN_LENGTH = 4;
		const seenPaths = new Set();

		const matches = indexData.filter((line, idx) => {
			const words = line.split(/\s+/);

			const match = terms.every(term => {
				if (words.some(w => w.includes(term))) return true;
				if (term.length >= FUZZY_MIN_LENGTH) {
					return words.some(w => levenshtein(term, w) <= FUZZY_THRESHOLD);
				}
				return false;
			});

			return match;
		});

		if (matches.length === 0) {
			resultsDiv.innerHTML = "<div class='text-muted'>Keine Treffer</div>";
			return;
		}

		const fragment = document.createDocumentFragment();
		
		matches.slice(0, 100).forEach(match => {
			const idx = indexData.indexOf(match);
			const originalPath = originalIndex[idx];

			if (seenPaths.has(originalPath)) return;
			seenPaths.add(originalPath);

			const a = document.createElement("a");
			const visiblepath = originalPath.replace(/notenbank\/|notenarchiv\//g, "");
			const previewUrl = "https://notensuche.mv-schwarzach.de/pdf2png.php?file=" + originalPath;
			const pdfDownloadUrl = "https://notensuche.mv-schwarzach.de/" + originalPath;

			a.href = "#";
			a.textContent = visiblepath;

			a.addEventListener("click", function (e) {
				e.preventDefault();
				loader.style.display = "flex";
				viewerImg.src = previewUrl;
				realPdfForDownload = pdfDownloadUrl;
				viewerContainer.classList.add("viewer-active");
				toolbar.classList.add("active");
				viewerContainer.scrollTop = 0;
			});

			viewerImg.onload = function() {
				loader.style.display = "none";
			};

			viewerImg.onerror = function() {
				if (!viewerImg.getAttribute('src') || viewerImg.getAttribute('src') === "") return;
				loader.style.display = "none";
				console.error("Fehler beim Laden von: " + viewerImg.src);
				alert("Fehler beim Laden der Vorschau.");
			};

			fragment.appendChild(a);
		});

		resultsDiv.appendChild(fragment);
		
	}

	document.getElementById("btnBack").onclick = function () {
		viewerContainer.classList.remove("viewer-active");
		toolbar.classList.remove("active");
		viewerImg.src = "";
	};

	document.getElementById("btnPrint").onclick = function () {
		if (!realPdfForDownload) return;

		const printFrame = document.getElementById("printFrame");
		
		loader.style.display = "flex";
		loader.querySelector('span').textContent = "Druckvorbereitung...";

		printFrame.src = realPdfForDownload;

		printFrame.onload = function() {
			loader.style.display = "none";
			loader.querySelector('span').textContent = "Vorschau wird geladen..."; // Text zurücksetzen
			
			try {
				printFrame.contentWindow.focus();
				printFrame.contentWindow.print();
			} catch (e) {
				window.open(realPdfForDownload, '_blank');
			}
		};
	};
	
	document.getElementById("btnDownload").onclick = function () {
		if (!realPdfForDownload) return;
		
		const a = document.createElement("a");
		a.href = realPdfForDownload;
		
		const fileName = realPdfForDownload.split('/').pop();
		a.download = fileName;
		
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	
	document.getElementById("btnSpool").onclick = function () {
		if (!realPdfForDownload) return;

		const btn = this;
		const originalText = btn.textContent;
		
		btn.textContent = "Sende...";
		btn.disabled = true;

		const formData = new FormData();
		formData.append('file', realPdfForDownload);

		fetch('spool.php', {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (response.ok) {
				btn.textContent = "✅ Gesendet!";
				btn.style.background = "linear-gradient(135deg, #28a745, #218838)"; // Grün bei Erfolg
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			btn.textContent = "❌ Fehler";
			btn.style.background = "linear-gradient(135deg, #dc3545, #c82333)"; // Rot bei Fehler
		})
		.finally(() => {
			setTimeout(() => {
				btn.textContent = originalText;
				btn.disabled = false;
				btn.style.background = ""; // Zurück zum CSS-Standard
			}, 3000);
		});
	};

</script>
<footer class="footer">
  <div class="container">
	<div class="row" style="text-align:center; font-style: italic;">
		<small><strong>fuzzy synonym sheet search</strong></small>
		<br />
		<small>this is another smart and tiny tool by mitzel-solutions 2026</small>
	</div>
  </div>
</footer>
</body>
</html>
