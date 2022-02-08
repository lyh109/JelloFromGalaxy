import SceneKeys from "~/consts/SceneKeys";
import SoundKeys from "~/consts/SoundKeys";
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
        this.load.image(TextureKeys.BLACK, 'bg/black.png')

        this.load.image(TextureKeys.SHIP_BLUE1, 'enemies/Ship_blue.png')
        this.load.image(TextureKeys.SHIP_BLUE2, 'enemies/Ship_blue_Damaged1.png')
        this.load.image(TextureKeys.SHIP_BLUE3, 'enemies/Ship_blue_Damaged2.png')
        this.load.image(TextureKeys.SHIP_BLUE4, 'enemies/Ship_blue_Damaged3.png')

        this.load.image(TextureKeys.SHIP_GREEN1, 'enemies/Ship_green.png')
        this.load.image(TextureKeys.SHIP_GREEN2, 'enemies/Ship_green_Damaged1.png')
        this.load.image(TextureKeys.SHIP_GREEN3, 'enemies/Ship_green_Damaged2.png')
        this.load.image(TextureKeys.SHIP_GREEN4, 'enemies/Ship_green_Damaged3.png')

        this.load.image(TextureKeys.SHIP_ORANGE1, 'enemies/Ship_orange.png')
        this.load.image(TextureKeys.SHIP_ORANGE2, 'enemies/Ship_orange_Damaged1.png')
        this.load.image(TextureKeys.SHIP_ORANGE3, 'enemies/Ship_orange_Damaged2.png')
        this.load.image(TextureKeys.SHIP_ORANGE4, 'enemies/Ship_orange_Damaged3.png')

        this.load.image(TextureKeys.SHIP_RED1, 'enemies/Ship_red.png')
        this.load.image(TextureKeys.SHIP_RED2, 'enemies/Ship_red_Damaged1.png')
        this.load.image(TextureKeys.SHIP_RED3, 'enemies/Ship_red_Damaged2.png')
        this.load.image(TextureKeys.SHIP_RED4, 'enemies/Ship_red_Damaged3.png')

        this.load.image(TextureKeys.LASER1, 'laser/laserBlue1.png')
        this.load.image(TextureKeys.LASER2, 'laser/laserBlue2.png')

        this.load.image(TextureKeys.ENERGY, 'ui/squareBlue.png')
        this.load.image(TextureKeys.ENERGY_BLANK, 'ui/square_shadow.png')

        this.load.image(TextureKeys.PILL, 'items/pill_blue.png')
        this.load.image(TextureKeys.POWERUP, 'items/powerupBlue_bolt.png')
        this.load.image(TextureKeys.SHIELD, 'items/powerupBlue_shield.png')
        
        this.load.image(TextureKeys.STAR_BRONZE, 'items/star_bronze.png')
        this.load.image(TextureKeys.STAR_SILVER, 'items/star_silver.png')
        this.load.image(TextureKeys.STAR_GOLD, 'items/star_gold.png')

        this.load.json('object', 'map/objects0.json')

        this.load.audio(SoundKeys.S_ON, 'sound/on.mp3')
        this.load.audio(SoundKeys.S_OFF, 'sound/off.mp3')

        this.load.audio(SoundKeys.S_LASER1, 'sound/sfx_laser1.mp3')
        this.load.audio(SoundKeys.S_LASER2, '/sound/sfx_laser2.mp3')
    }

    create()
    {
        this.scene.start(SceneKeys.Title)
    }
}