import SceneKeys from "~/consts/SceneKeys";
import TextureKeys from "~/consts/TextureKeys";

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super(SceneKeys.Preloader)
    }

    preload()
    {
        this.load.atlasXML(TextureKeys.SPACESHIP, 'characters/atlas/spritesheet_spaceships.png', 'characters/atlas/spritesheet_spaceships.xml')

        this.load.image(TextureKeys.Background, 'bg/blue.png')
        this.load.image(TextureKeys.LOGO, 'bg/logo.png')

        this.load.image(TextureKeys.SHIP_BLUE, 'enemies/Ship_blue.png')

        this.load.json('object', 'map/objects0.json')
    }

    create()
    {
        this.scene.start(SceneKeys.Title)
    }
}