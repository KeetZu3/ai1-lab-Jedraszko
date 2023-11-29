$(document).ready(function () {
    var map;
    var correctOrder = [];

    // Ask for geolocation permission
    navigator.permissions.query({name: 'geolocation'}).then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
            // Geolocation is already granted
            initializeMap();
        } else {
            // Geolocation permission is not granted, ask for permission
            $('#getLocationBtn').on('click', function () {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        initializeMap();
                    },
                    error => {
                        console.error(error);
                        alert('Wystąpił błąd podczas pobierania lokalizacji.');
                    }
                );
            });
        }
    });

    function initializeMap() {
        map = L.map('map').setView([53.430127, 14.564802], 18);
        L.tileLayer.provider('Esri.WorldImagery').addTo(map);
        let marker = L.marker([53.430127, 14.564802]).addTo(map);
        marker.bindPopup("<strong>Hello!</strong><br>This is a popup.");

        // Function to download the map as an image
        $('#saveButton').on('click', function () {
            leafletImage(map, function (err, canvas) {
                let rasterMap = document.getElementById("rasterMap");
                let rasterContext = rasterMap.getContext("2d");

                rasterContext.drawImage(canvas, 0, 0, 300, 150);
                showPuzzleBoard(canvas);
            });
        });
    }

    function showPuzzleBoard(canvas) {
        // Clear existing puzzle board
        $('#puzzle-container').empty();
        let puzzlePieces = createPuzzlePieces(canvas);

        for (let i = 0; i < 16; i++) {
            let piece = $('<div class="puzzle-piece">').append(puzzlePieces[i]);
            piece.attr('draggable', 'true');  // Enable dragging
            piece.attr('data-index', i);  // Store the original index

            // Add drag and drop event listeners
            piece.on('dragstart', function (event) {
                this.style.border = '5px dashed #D8D8FF';
                event.originalEvent.dataTransfer.setData('text', this.id);
            });

            piece.on('dragend', function () {
                this.style.borderWidth = '0';
            });

            $('#puzzle-container').append(piece);
        }

        // Add event listeners for the puzzle pieces and target cells
        $('.puzzle-piece').on('dragstart', function (event) {
            this.style.border = '5px dashed #D8D8FF';
            event.originalEvent.dataTransfer.setData('text', this.id);
        });

        $('.table-cell').on('dragenter', function () {
            this.style.border = '2px solid #7FE9D9';
        });

        $('.table-cell').on('dragleave', function () {
            this.style.border = '2px dashed #7f7fe9';
        });

        $('.table-cell').on('dragover', function (event) {
            event.preventDefault();
        });

        $('.table-cell').on('drop', function (event) {
            event.preventDefault();
            let data = event.originalEvent.dataTransfer.getData('text');
            let draggedPiece = $('#' + data);

            // Check if the dropped puzzle piece is in the correct position
            let targetIndex = $(this).index();
            let originalIndex = draggedPiece.attr('data-index');

            if (targetIndex === originalIndex) {
                // Puzzle piece is in the correct position
                $(this).empty(); // Remove any existing piece from the cell
                $(this).append(draggedPiece);

                // Check if all puzzles are placed correctly
                let allCorrect = true;
                $('.table-cell').each(function (index) {
                    if ($(this).children().length === 0 || parseInt($(this).children().first().attr('data-index')) !== index) {
                        allCorrect = false;
                        return false;  // Exit the loop early
                    }
                });

                if (allCorrect) {
                    // Announce that the puzzles are done
                    alert('Congratulations! Puzzles are completed.');
                }
            } else {
                // Puzzle piece is not in the correct position, return to the initial position
                draggedPiece.css({ 'border': '2px dashed #7f7fe9', 'position': 'static', 'top': 'auto', 'left': 'auto' });
            }

            // Reset the border of the target cell
            this.style.border = '2px dashed #7f7fe9';
        });
    }



    function createPuzzlePieces(canvas) {
        let puzzlePieces = [];
        let pieceWidth = 200;
        let pieceHeight = 100;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let pieceCanvas = document.createElement('canvas');
                pieceCanvas.width = pieceWidth;
                pieceCanvas.height = pieceHeight;
                let pieceContext = pieceCanvas.getContext('2d');
                pieceContext.drawImage(canvas, j * pieceWidth, i * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);

                // Add an index attribute to each puzzle piece
                pieceCanvas.setAttribute('data-index', i * 4 + j);

                puzzlePieces.push(pieceCanvas);
            }
        }

        // Create an array with correct order based on indices
        correctOrder = Array.from({ length: 16 }, (_, i) => i);

        // Shuffle the puzzle pieces
        puzzlePieces = shuffle(puzzlePieces);

        return puzzlePieces;
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex, temporaryValue;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
});