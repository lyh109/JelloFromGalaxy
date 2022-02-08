import SceneKeys from "~/consts/SceneKeys"
import SoundKeys from "~/consts/SoundKeys"
import TextureKeys from "~/consts/TextureKeys"

export default class GameOver extends Phaser.Scene
{
    private score!: number
    private background!: Phaser.GameObjects.TileSprite

    private buttonImage!: Phaser.GameObjects.RenderTexture
    private buttonText!: Phaser.GameObjects.Text

    private buttonOnSound!: Phaser.Sound.BaseSound
    private buttonOffSound!: Phaser.Sound.BaseSound

    constructor()
    {
        super(SceneKeys.GameOver)
    }

    /**
	 * @param {{ score: number }} data 
	 */
    init(data)
    {
        this.score = data.score
    }

    create()
    {
        this.cameras.main.fadeIn()

        const width = this.scale.width
        const height = this.scale.height

        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background).setOrigin(0)

        this.add.nineslice(width / 2, height * 0.4, 400, 250, TextureKeys.GLASS_PANEL, 16)
            .setOrigin(0.5)

        this.add.text(width / 2, height * 0.32, 'SCORE', {fontFamily: 'CustomFont'})
            .setFontSize(50)
            .setOrigin(0.5)
        
        this.add.text(width / 2, height * 0.37, this.score.toString(), {fontFamily: 'CustomFont'})
            .setFontSize(45)
            .setOrigin(0.5)

        this.buttonImage = this.add.nineslice(width / 2, height * 0.47, 200, 70, TextureKeys.GLASS_PANEL_PROJECTION, 16)
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.buttonOffSound.play()
                this.cameras.main.fadeOut()
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.time.delayedCall(1000, () => {
                        this.scene.start(SceneKeys.Preloader)
                    })
                })
            })
            .on('pointerover', () => {
                this.buttonOnSound.play()
            })

        // this.add.image(width / 2, height * 0.47, TextureKeys.GLASS_PANEL_PROJECTION)
        //     .setOrigin(0.5)
        //     .setInteractive()
        //     .on('pointerdown', this.clickButton)
        //     .on('pointerover', () => {
        //         this.buttonOnSound.play()
        //     })
        
        this.buttonText = this.add.text(width / 2, height * 0.47, ' GO TO TITLE', {fontFamily: 'CustomFont'})
            .setFontSize(28)
            .setOrigin(0.5)

        this.buttonOnSound = this.sound.add(SoundKeys.S_ON, {volume: 0.1})
        this.buttonOffSound = this.sound.add(SoundKeys.S_OFF, {volume: 0.1})
    }

    update(time: number, delta: number): void 
    {
        this.background.tilePositionY += 0.5
    }
}