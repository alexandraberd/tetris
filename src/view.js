export default class View {
    static colors = {
        '1': '#14951d',
        '2': '#cfd920',
        '3': '#f36a0c',
        '4': '#e914a9',
        '5': '#e91414',
        '6': '#14dbe3',
        '7': '#421be5',
    };

    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfieldBorderWidth = 4;
        this.playfieldX = this.playfieldY = this.playfieldBorderWidth;
        this.playfieldWidth = (this.width * 2) / 3;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panely = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.append(this.canvas);
    }

    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);
    }

    renderPlayfield({ playfield }) {
        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if (block) {
                    this.renderBlock(
                        this.playfieldX + x * this.blockWidth,
                        this.playfieldY + y * this.blockHeight,
                        this.blockWidth,
                        this.blockHeight,
                        View.colors[block]
                    );
                }
            }
        }

        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }

    renderPanel({ level, score, lines, nextPiece }) {
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px "Pixel"';

        this.context.fillText(`LEVEL: ${level}`, this.panelX, this.panely + 5);
        this.context.fillText(`SCORE: ${score}`, this.panelX, this.panely + 30);
        this.context.fillText(`LINES: ${lines}`, this.panelX, this.panely + 55);
        this.context.fillText(`NEXT PIECES: `, this.panelX, this.panely + 150);

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];

                if (block) {
                    this.renderBlock(
                        this.panelX + x * this.blockWidth * 0.5,
                        this.panely + 180 + y * this.blockHeight * 0.5,
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        View.colors[block]
                    );
                }
            }
        }
    }

    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = '#484848';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height);
        this.context.strokeRect(x, y, width, height);
    }

    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '24px "Pixel"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('PRESS ENTER TO START', this.width / 2, this.height / 2);
    }

    renderPauseScreen() {
        this.context.fillStyle = 'rgba(0,0,0,0.75)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = 'white';
        this.context.font = '24px "Pixel"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'center';
        this.context.fillText('PRESS ENTER TO RESUME', this.width / 2, this.height / 2);
    }

    renderEndScreen({ score }) {
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '24px "Pixel"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'center';
        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`SCORE: ${score}`, this.width / 2, this.height / 2);
        this.context.fillText(`PRESS ENTER TO RESTART`, this.width / 2, this.height / 2 + 48);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}
