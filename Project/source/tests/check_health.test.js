const f = require('../scripts/classes')


const sprite = new f.Fighter({position: {x: 800, y: 100},
  velocity: {x: 0, y: 10},
  color: 'yellow',
  offset: {
      x: -50,
      y: 0
  },
  imageSrc: 'source/graphics/kenji/Idle.png',
  scale: 2.5,
  framesMax: 4,
  offset: {
      x: 215,
      y: 167
  },
  sprites: {
      idle: {
          imageSrc: 'source/graphics/kenji/Idle.png',
          framesMax: 4
      },
      run: {
          imageSrc: 'source/graphics/kenji/Run.png',
          framesMax: 8
      },
      jump: {
          imageSrc: 'source/graphics/kenji/Jump.png',
          framesMax: 2
      },
      fall: {
          imageSrc: 'source/graphics/kenji/Fall.png',
          framesMax: 2
      },
      attack1: {
          imageSrc: 'source/graphics/kenji/Attack1.png',
          framesMax: 4
      },
      takeHit: {
          imageSrc: 'source/graphics/kenji/Take hit.png',
          framesMax: 3
      },
      death: {
          imageSrc: 'source/graphics/kenji/Death.png',
          framesMax: 7
      }
  },
  attackBox:{
      offset: {
          x: -170,
          y: 50,
      },
      width: 170,
      height: 50
  }

})


test('check health', () => {
  expect(sprite.health).toBe(100)
})