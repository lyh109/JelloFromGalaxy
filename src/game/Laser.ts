import TextureKeys from "~/consts/TextureKeys"

class Laser extends Phaser.Physics.Matter.Image
{
    private damage: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene.matter.world, x, y, texture)

        scene.add.existing(this)
        this.scene = scene

        if(texture == TextureKeys.LASER1)
        {
            this.damage = 1
        }
        else
        {
            this.damage = 2
        }
    }

    getDamage()
    {
        return this.damage
    }
}

export default class LaserPool extends Phaser.GameObjects.Group
{
    constructor(scene: Phaser.Scene, config: Phaser.Types.GameObjects.Group.GroupConfig = {})
    {
        const defaults: Phaser.Types.GameObjects.Group.GroupConfig = {
            classType: Laser,
            maxSize: -1
        }

        super(scene, Object.assign(defaults, config))
    }

    spawn(x, y, key: string = TextureKeys.LASER1)
    {
        const spawnExisting = this.countActive(false) > 0
        
        const laser = super.get(x, y, key)
        if(!laser)
        {
            return
        }

        if(spawnExisting)
        {
            laser.setActive(true)
            laser.setVisible(true)
            laser.world.add(laser.body)
        }

        return laser
    }

    despawn(laser: Laser)
    {
        laser.setActive(false)
        laser.setVisible(false)
        laser.world.remove(laser.body)
    }

    initializeWithSize(size: number)
    {
        if(this.getLength() > 0 || size <= 0)
        {
            return
        } 

        this.createMultiple({
            key: TextureKeys.LASER1,
            quantity: size,
            visible: false,
            active: false
        })
    }
}