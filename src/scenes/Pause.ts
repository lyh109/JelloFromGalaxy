import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"
import EventKeys from "~/consts/EventKeys"
import SoundKeys from "~/consts/SoundKeys"

export default class Pause extends Phaser.Scene
{
    private resumeSound!: Phaser.Sound.BaseSound

    constructor()
    {
        super(SceneKeys.Pause)
    }

    create()
    {
        const halfwidth = this.scale.width / 2
        const halfheight = this.scale.height / 2

        const GameScene = this.scene.get(SceneKeys.Game)

        const PauseBG = this.add.image(halfwidth, halfheight, TextureKeys.BLACK)
            .setOrigin(0.5)
            .setAlpha(0.5)
            .setVisible(false)

        const PauseText = this.add.text(halfwidth, halfheight - 75, 'PAUSE', {fontFamily: 'CustomFont'})
            .setFontSize(50)
            .setOrigin(0.5)
            .setVisible(false)
        
        const pressRText = this.add.text(halfwidth, halfheight, 'PRESS "R" TO RESUME', {fontFamily: 'CustomFont'})
            .setFontSize(30)
            .setOrigin(0.5)
            .setVisible(false)

        this.tweens.add({
            targets: pressRText,
            alpha: 0.3,
            duration: 1500,
            yoyo: true,
            repeat: -1
        })

        this.resumeSound = this.sound.add(SoundKeys.S_ON, {volume: 0.1})

        GameScene.events.on(EventKeys.PAUSE, () => {
            PauseBG.setVisible(true)
            PauseText.setVisible(true)
            pressRText.setVisible(true)
            this.scene.pause(SceneKeys.Game)
        })

        this.input.keyboard.on('keydown-R', () =>{
            if(GameScene.scene.isPaused())
            {
                this.resumeSound.play()

                PauseBG.setVisible(false)
                PauseText.setVisible(false)
                pressRText.setVisible(false)

                this.scene.resume(GameScene)
            }
        })
    }
}