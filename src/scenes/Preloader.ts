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

        this.load.image(TextureKeys.METEOR1, 'obstacles/meteorBrown_big1.png')
        this.load.image(TextureKeys.METEOR2, 'obstacles/meteorBrown_big2.png')

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

        this.load.image(TextureKeys.SHIELD_EFFECT, 'effect/shield.png')

        this.load.image(TextureKeys.GLASS_PANEL, 'ui/glassPanel.png')
        this.load.image(TextureKeys.GLASS_PANEL_PROJECTION, 'ui/glassPanel_projection.png')

        this.load.json('object0', 'map/objects0.json')
        this.load.json('object1', 'map/objects1.json')
        this.load.json('object2', 'map/objects2.json')
        this.load.json('object3', 'map/objects3.json')
        this.load.json('object4', 'map/objects4.json')
        this.load.json('object5', 'map/objects5.json')
        this.load.json('object6', 'map/objects6.json')
        this.load.json('object7', 'map/objects7.json')
        this.load.json('object8', 'map/objects8.json')
        this.load.json('object9', 'map/objects9.json')

        this.load.audio(SoundKeys.S_ON, 'sound/on.mp3')
        this.load.audio(SoundKeys.S_OFF, 'sound/off.mp3')

        this.load.audio(SoundKeys.S_CRASH, 'sound/crash.mp3')
        this.load.audio(SoundKeys.S_ZAP, 'sound/sfx_zap.mp3')

        this.load.audio(SoundKeys.S_LASER1, 'sound/sfx_laser1.mp3')
        this.load.audio(SoundKeys.S_LASER2, 'sound/sfx_laser2.mp3')

        this.load.audio(SoundKeys.S_PILL, 'sound/pill.mp3')
        this.load.audio(SoundKeys.S_POWERUP_SHIELD, 'sound/sfx_powerup-shield.mp3')
        this.load.audio(SoundKeys.S_SHIELD_DOWN, 'sound/sfx_shieldDown.mp3')
        this.load.audio(SoundKeys.S_STAR, 'sound/star.mp3')

        this.load.audio(SoundKeys.S_GAME_OVER, 'sound/gameover.mp3')
    }

    create()
    {
        this.scene.start(SceneKeys.Title)
    }
}