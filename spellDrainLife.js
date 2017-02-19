define([
	
], function(
	
) {
	return {
		type: 'drainLife',

		cdMax: 7,
		manaCost: 0,

		range: 9,

		speed: 150,
		damage: 1,

		row: 3,
		col: 0,

		needLos: true,

		cast: function(action) {
			var obj = this.obj;
			var target = action.target;

			var ttl = (Math.sqrt(Math.pow(target.x - obj.x, 2) + Math.pow(target.y - obj.y, 2)) * this.speed) - 50;

			this.sendAnimation({
				caster: target.id,
				components: [{
					idSource: target.id,
					idTarget: this.obj.id,
					type: 'projectile',
					ttl: ttl,
					projectileOffset: this.projectileOffset,
					particles: this.particles
				}, {
					type: 'attackAnimation',
					layer: 'projectiles',
					spriteSheet: 'server/mods/example/images/projectileSprite.png',
					loop: -1,
					row: 0,
					col: 0
				}]
			});

			this.sendBump(target);

			this.queueCallback(this.explode.bind(this, target), ttl, null, target);

			return true;
		},
		explode: function(target) {
			if ((this.obj.destroyed) || (target.destroyed))
				return;

			var damage = this.getDamage(target);
			target.stats.takeDamage(damage, this.threatMult, this.obj);
			this.obj.stats.getHp(damage, this.obj);
		}
	};
});