import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        // Create the Matrix of Letters
        const chars = [
            [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
            [ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
            [ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>' ]
        ];

        const cursor = {x:0, y:0};
        let name = '';

        const textStyle = { fontFamily: 'Courier', fontSize: 64, fontStyle: 'Bold', color: '#ffffff' };
        this.add.bitmapText(512, 50, 'arcade', 'Game Over').setOrigin(0.5);

        const input = this.add.bitmapText(256,100, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20);
        input.setInteractive();

        const rub = this.add.image(input.x + 430, input.y + 148, 'rub');
        const end = this.add.image(input.x + 482, input.y + 148, 'end');

        const block = this.add.image(input.x - 10, input.y -2, 'block').setOrigin(0);

        const legend = this.add.bitmapText(256, 360, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff).setOrigin(0);
        this.add.bitmapText(256, 410, 'arcade', '1ST   50000    ').setTint(0xff0000).setOrigin(0);
        this.add.bitmapText(256, 460, 'arcade', '2ND   40000    ICE').setTint(0xff8200).setOrigin(0);
        this.add.bitmapText(256, 510, 'arcade', '3RD   30000    GOS').setTint(0xffff00).setOrigin(0);
        this.add.bitmapText(256, 560, 'arcade', '4TH   20000    HRE').setTint(0x00ff00).setOrigin(0);
        this.add.bitmapText(256, 610, 'arcade', '5TH   10000    ETE').setTint(0x00bfff).setOrigin(0);

        const playerText = this.add.bitmapText(736, 410, 'arcade', name).setTint(0xff0000).setOrigin(0);

        // Controls - Keyboard
        this.input.keyboard.on('keyup', event =>
            {
    
                if (event.keyCode === 37)
                {
                    //  left
                    if (cursor.x > 0)
                    {
                        cursor.x--;
                        block.x -= 52;
                    }
                }
                else if (event.keyCode === 39)
                {
                    //  right
                    if (cursor.x < 9)
                    {
                        cursor.x++;
                        block.x += 52;
                    }
                }
                else if (event.keyCode === 38)
                {
                    //  up
                    if (cursor.y > 0)
                    {
                        cursor.y--;
                        block.y -= 64;
                    }
                }
                else if (event.keyCode === 40)
                {
                    //  down
                    if (cursor.y < 2)
                    {
                        cursor.y++;
                        block.y += 64;
                    }
                }
                else if (event.keyCode === 13 || event.keyCode === 32)
                {
                    //  Enter or Space
                    if (cursor.x === 9 && cursor.y === 2 && name.length > 0)
                    {
                        //  Submit
                        this.toMainMenu();
                    }
                    else if (cursor.x === 8 && cursor.y === 2 && name.length > 0)
                    {
                        //  Rub
                        name = name.substr(0, name.length - 1);
    
                        playerText.text = name;
                    }
                    else if (name.length < 3)
                    {
                        //  Add
                        name = name.concat(chars[cursor.y][cursor.x]);
    
                        playerText.text = name;
                    }
                }
    
            }
        );

        // Controls - Pointer
        input.on('pointermove', (pointer, x, y) =>
            {
    
                const cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
                const cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
                const char = chars[cy][cx];
    
                cursor.x = cx;
                cursor.y = cy;
    
                block.x = input.x - 10 + (cx * 52);
                block.y = input.y - 2 + (cy * 64);
    
            }, this);
    
            input.on('pointerup', (pointer, x, y) =>
            {
    
                const cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
                const cy = Phaser.Math.Snap.Floor(y, 64, 0, true);
                const char = chars[cy][cx];
    
                cursor.x = cx;
                cursor.y = cy;
    
                block.x = input.x - 10 + (cx * 52);
                block.y = input.y - 2 + (cy * 64);
    
                if (char === '<' && name.length > 0)
                {
                    //  Rub
                    name = name.substr(0, name.length - 1);
    
                    playerText.text = name;
                }
                else if (char === '>' && name.length > 0)
                {
                    //  Submit
                    this.toMainMenu();
                }
                else if (name.length < 3)
                {
                    //  Add
                    name = name.concat(char);
    
                    playerText.text = name;
                }
    
            }, this);

        
        

        // Old stuff
        //  Get the current highscore from the registry
        // const score = this.registry.get('highscore');
        
        // const textStyle = { fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff', stroke: '#000000', strokeThickness: 8 };
        
        // this.add.image(512, 384, 'background');
        
        // this.add.text(512, 300, `Game Over\n\nHigh Score: ${score}`, textStyle).setAlign('center').setOrigin(0.5);
        
        // this.input.once('pointerdown', () => {        
        //     // Stop the music    
        //     var music = this.sound.get('soundtrack');
        //     music.stop();
        //     this.scene.start('MainMenu');

        // });
    }

    toMainMenu() {
        //  Swap to the MainMenu scene after a 2 second delay after pressing the end
        this.time.delayedCall(2000, () => {
            // Stop the music    
            var music = this.sound.get('soundtrack');
            music.stop();
            this.scene.start('MainMenu')
        });
    }
}
