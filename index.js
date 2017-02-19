define([
	'misc/events'
], function(
	events
) {
	return {
		name: 'Necormancer Class',

		init: function() {
			events.on('onBeforeGetClasses', this.beforeGetClasses.bind(this));
			events.on('onBeforeGetSkins', this.beforeGetSkins.bind(this));
			events.on('onBeforeGetItemTypes', this.beforeGetItemTypes.bind(this));
			events.on('onBeforeGetSpellsInfo', this.beforeGetSpellsInfo.bind(this));
			events.on('onBeforeGetSpellsConfig', this.beforeGetSpellsConfig.bind(this));
			events.on('onBeforeGetSpellTemplate', this.beforeGetSpellTemplate.bind(this));
			events.on('onBeforeGetResourceList', this.beforeGetResourceList.bind(this));
		},

		beforeGetResourceList: function(list) {
			list.push('server/mods/example/images/inGameSprite.png');
			list.push('server/mods/example/images/projectileSprite.png');
		},

		beforeGetClasses: function(classes) {
			classes.spells.necromancer = ['ice spear'];
			classes.stats.necromancer = {
				values: {
					hpMax: 50
				},
				vitScale: 10,
				spritesheet: 'server/mods/example/images/inGameSprite.png'
			};
			classes.weapons.necromancer = 'Wand';
		},

		beforeGetSpellTemplate: function(spell) {
			if (spell.type == 'DrainLife')
				spell.template = require('mods/example/spellDrainLife');
		},

		beforeGetSkins: function(skins) {
			skins['necromancer 1'] = {
				name: 'Necromancer 1',
				sprite: [2, 0],
				class: 'necromancer',
				spritesheet: 'server/mods/example/images/classSprite.png',
				default: true
			};
		},

		beforeGetItemTypes: function(types) {
			types.twoHanded.Wand = {
				sprite: [0, 0],
				spellName: 'drain life',
				spritesheet: 'server/mods/example/images/weaponSprite.png'
			};
		},

		beforeGetSpellsConfig: function(spells) {
			spells['drain life'] = {
				statType: 'int',
				statMult: 0.1,
				element: 'arcane',
				auto: true,
				cdMax: 7,
				manaCost: 0,
				range: 9,
				random: {
					damage: [2, 4]
				}
			};
		},

		beforeGetSpellsInfo: function(spells) {
			spells.push({
				name: 'Drain Life',
				description: 'Absorbs the life-force of your enemies.',
				type: 'drainLife',
				icon: [0, 0],
				spritesheet: 'server/mods/example/images/abilitySprite.png',
				particles: {
					color: {
						start: ['ff4252', 'b34b3a'],
						end: ['b34b3a', 'ff4252']
					},
					scale: {
						start: {
							min: 2,
							max: 14
						},
						end: {
							min: 0,
							max: 8
						}
					},
					lifetime: {
						min: 1,
						max: 3
					},
					alpha: {
						start: 0.7,
						end: 0
					},
					randomScale: true,
					randomColor: true,
					chance: 0.6
				}
			});
		}
	};
});