import SceneKeys from "~/consts/SceneKeys"

export default class Pause extends Phaser.Scene
{
    constructor()
    {
        super(SceneKeys.Pause)
    }

    create()
    {
        let GameScene = this.scene.get(SceneKeys.Game)

        let PauseText = this.add.text(320, 480, 'PAUSE', {fontFamily: 'CustomFont'})
            .setFontSize(50)
            .setOrigin(0.5)
            .setVisible(false)

        GameScene.events.on('pause', () => {
            PauseText.setVisible(true)
            this.scene.pause(SceneKeys.Game)
        })
    }
}