import Phaser from 'phaser'
import 'phaser/plugins/spine/dist/SpinePlugin'

import Preloader from './scenes/Preloader'
import Title from './scenes/Title'
import CharacterSelect from './scenes/CharacterSelect'
import Game from './scenes/Game'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    physics: {
        default: 'matter',
        matter: {
            debug: true
        }
    },
    scene: [Preloader, Title, CharacterSelect, Game],
    plugins: {
        scene: [
            { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine'}
        ]
    }
}

export default new Phaser.Game(config)