import { questionFactory, r } from '../helpers'

const { mcq, num, wr } = questionFactory('physics', 'thermal')

export const physicsT2Questions = [
  // ---------------------------------------------------------------- 2.1 particle model
  mcq('particle-model', 1, 'In which state of matter are the particles far apart and moving randomly at high speed?', ['Solid', 'Liquid', 'Gas', 'All three'], 2, 'In a gas the particles are widely spaced and move freely.'),
  mcq('particle-model', 1, 'How do the particles in a solid move?', ['They vibrate about fixed positions', 'They slide past each other', 'They move rapidly in all directions', 'They do not move at all'], 0, 'Strong forces hold solid particles in place; they can only vibrate.'),
  mcq('particle-model', 1, 'What is the name of the change from solid directly to gas?', ['Melting', 'Condensation', 'Sublimation', 'Freezing'], 2, 'Sublimation skips the liquid state, e.g. dry ice.'),
  mcq('particle-model', 2, 'Smoke particles viewed under a microscope move in a random zigzag. This is caused by:', ['the smoke particles being alive', 'collisions with fast-moving, invisible air molecules', 'convection currents in the glass', 'gravity'], 1, 'Brownian motion is due to uneven collisions with air molecules.'),
  mcq('particle-model', 2, 'Why can a gas be compressed easily?', ['Its particles are very large', 'There is a lot of empty space between its particles', 'Its particles do not move', 'Its particles are very heavy'], 1, 'Large gaps between particles mean the volume can be reduced.'),
  wr('particle-model', 1, 'Describe the arrangement and movement of the particles in a liquid. [3]', [
    'The particles are close together / touching but in an irregular arrangement (1)',
    'The particles move around and slide past each other (1)',
    'The forces between them are weaker than in a solid (1)',
  ]),
  wr('particle-model', 2, 'Smoke particles in air, viewed through a microscope, move in random zigzag paths. Explain this observation. [4]', [
    'Air molecules are very small and move randomly at high speed (1)',
    'They collide with the (much larger) smoke particles (1)',
    'The collisions are not balanced: more hits on one side than another at any moment (1)',
    'So the smoke particles are pushed in random directions (Brownian motion) (1)',
  ]),
  wr('particle-model', 2, 'Explain, using the particle model, why a gas can be compressed but a liquid cannot. [3]', [
    'In a gas the particles are far apart with large gaps between them (1)',
    'The volume can be reduced by pushing particles closer together (1)',
    'In a liquid the particles are already touching, so there is almost no space to reduce (1)',
  ]),
  wr('particle-model', 3, 'Explain, in terms of particles, what happens when a solid is heated until it melts. [3]', [
    'The particles gain kinetic energy and vibrate more strongly (1)',
    'At the melting point they have enough energy to overcome the forces holding them in fixed positions (1)',
    'They can then move around and slide past each other: the substance becomes liquid (1)',
  ]),

  // ---------------------------------------------------------------- 2.1 gases
  mcq('gases', 1, 'Absolute zero, the lowest possible temperature, is:', [r`$0\,^\circ\text{C}$`, r`$-273\,^\circ\text{C}$`, r`$-100\,^\circ\text{C}$`, r`$273\,^\circ\text{C}$`], 1, r`Absolute zero is $0\ \text{K}$, which is $-273\,^\circ\text{C}$.`),
  mcq('gases', 1, r`What is $27\,^\circ\text{C}$ in kelvin?`, ['300 K', '246 K', '27 K', '273 K'], 0, r`$27 + 273 = 300\ \text{K}$.`),
  mcq('gases', 2, 'A fixed mass of gas in a rigid container is heated. Its pressure rises because the particles:', ['get bigger', 'move faster, hitting the walls harder and more often', 'become heavier', 'stop moving'], 1, 'Faster particles hit the walls with greater force and more frequently.'),
  mcq('gases', 2, 'The volume of a fixed mass of gas is halved at constant temperature. The pressure:', ['halves', 'stays the same', 'doubles', 'quadruples'], 2, r`$pV = \text{constant}$, so halving $V$ doubles $p$.`),
  num('gases', 1, 2, r`Convert $27\,^\circ\text{C}$ into kelvin.`, 300, 0.01, 'K', r`$T = 27 + 273 = 300\ \text{K}$.`),
  num('gases', 2, 2, 'A gas at 100 kPa occupies 6.0 litres. It is compressed at constant temperature to 2.0 litres. Find the new pressure in kPa.', 300, 0.01, 'kPa', r`$p_2 = p_1 V_1 / V_2 = 100 \times 6.0 / 2.0 = 300\ \text{kPa}$.`, 'extended'),
  num('gases', 2, 3, r`A gas at 50 kPa has a volume of $2.4\ \text{m}^3$. It is compressed at constant temperature to $0.80\ \text{m}^3$. Find the new pressure in kPa.`, 150, 0.01, 'kPa', r`$50 \times 2.4 = p_2 \times 0.80$, so $p_2 = 150\ \text{kPa}$.`, 'extended'),
  num('gases', 3, 3, r`A gas at 200 kPa occupies $0.30\ \text{m}^3$. Its pressure falls to 50 kPa at constant temperature. Find the new volume in $\text{m}^3$.`, 1.2, 0.01, 'm³', r`$200 \times 0.30 = 50 \times V_2$, so $V_2 = 1.2\ \text{m}^3$.`, 'extended'),
  wr('gases', 2, 'Explain how gas particles produce pressure on the walls of a container. [3]', [
    'The particles collide with the walls and bounce back (1)',
    'Each collision changes the particle\'s momentum, so there is a force on the wall (1)',
    'Pressure is the total force of the many collisions per unit area (1)',
  ]),
  wr('gases', 2, 'A sealed container of gas is heated. Explain why the gas pressure increases. [3]', [
    'The particles gain kinetic energy and move faster (1)',
    'They hit the walls more often (1)',
    'And with greater force each time, so the pressure increases (1)',
  ]),
  wr('gases', 3, 'The plunger of a sealed syringe is pushed in slowly. The temperature stays constant. Explain why the pressure of the air increases. [3]', [
    'The volume decreases, so the same number of particles is in a smaller space (1)',
    'The particles hit the walls more frequently (1)',
    'So the force per unit area increases (1)',
  ]),

  // ---------------------------------------------------------------- 2.2 expansion & thermometers
  mcq('thermal-expansion', 1, 'Which expands the most for the same temperature rise (equal volumes)?', ['Solid', 'Liquid', 'Gas', 'They all expand equally'], 2, 'Gases expand most because there are almost no forces between the particles.'),
  mcq('thermal-expansion', 1, 'A bimetallic strip bends when heated because:', ['the two metals expand by different amounts', 'it gets heavier', 'it contracts', 'the metals melt'], 0, 'One metal expands more, so the strip curves towards the metal that expands less.'),
  mcq('thermal-expansion', 2, 'Why are small gaps left between sections of railway track?', ['To save metal', 'To allow expansion in hot weather', 'To reduce friction', 'To allow contraction in summer'], 1, 'Without gaps the rails would buckle as they expand.'),
  mcq('thermal-expansion', 2, 'How can the sensitivity of a liquid-in-glass thermometer be increased?', ['Use a wider tube', 'Use a narrower tube', 'Use a shorter bulb', 'Use less liquid'], 1, 'A narrower tube makes the liquid move further for the same temperature change.'),
  mcq('thermal-expansion', 2, 'Which thermometer can measure very high temperatures and respond quickly?', ['Liquid-in-glass', 'Thermocouple', 'Clinical thermometer', 'None of them'], 1, 'A thermocouple has a small junction (fast response) and a very large range.'),
  num('thermal-expansion', 2, 2, r`A liquid-in-glass thermometer has the liquid at 2.0 cm at $0\,^\circ\text{C}$ and 22.0 cm at $100\,^\circ\text{C}$. What temperature does it read when the liquid is at 8.0 cm, in °C?`, 30, 0.01, '°C', r`$\dfrac{8.0 - 2.0}{22.0 - 2.0} \times 100 = 30\,^\circ\text{C}$.`),
  num('thermal-expansion', 3, 3, r`A thermometer has a column length of 3.0 cm at the ice point and 23.0 cm at the steam point. Find the temperature when the length is 11.0 cm, in °C.`, 40, 0.01, '°C', r`$\dfrac{11.0 - 3.0}{23.0 - 3.0} \times 100 = 40\,^\circ\text{C}$.`),
  wr('thermal-expansion', 1, 'Explain, in terms of particles, why a solid expands when heated. [3]', [
    'The particles vibrate more strongly (1)',
    'They move slightly further apart on average (1)',
    'So the solid occupies a larger volume (the particles do not get bigger) (1)',
  ]),
  wr('thermal-expansion', 2, 'Describe how to mark a scale on an unmarked liquid-in-glass thermometer. [4]', [
    'Put the bulb in melting pure ice and mark the liquid level as 0 °C (1)',
    'Put the bulb in steam above boiling water and mark the level as 100 °C (1)',
    'Measure the distance between the two marks (1)',
    'Divide it into 100 equal intervals (1)',
  ]),
  wr('thermal-expansion', 2, 'Describe how a bimetallic strip is used in a thermostat. [3]', [
    'The strip is made of two metals that expand by different amounts (1)',
    'When heated it bends, towards the metal that expands less (1)',
    'The bending breaks the circuit and switches the heater off (1)',
  ]),
  wr('thermal-expansion', 2, 'Give two advantages of a thermocouple thermometer compared with a liquid-in-glass thermometer. [2]', [
    'It has a much wider range / can measure very high temperatures (1)',
    'It responds quickly (small junction) / gives an electrical reading (1)',
  ]),

  // ---------------------------------------------------------------- 2.2 specific heat capacity
  mcq('specific-heat-capacity', 1, 'What is the unit of specific heat capacity?', [r`$\text{J/(kg}\,^\circ\text{C)}$`, r`$\text{J/kg}$`, r`$\text{W/m}$`, r`$\text{N/m}$`], 0, 'It is energy per kilogram per degree.'),
  mcq('specific-heat-capacity', 1, r`In $Q = mc\Delta\theta$, $Q$ is the:`, ['mass', 'thermal energy transferred', 'temperature', 'specific heat capacity'], 1, '$Q$ is the thermal energy transferred in joules.'),
  mcq('specific-heat-capacity', 2, 'Water is used in central heating systems mainly because it has:', ['a low density', 'a high specific heat capacity', 'a low boiling point', 'a high melting point'], 1, 'It can carry a lot of thermal energy per kilogram per degree.'),
  mcq('specific-heat-capacity', 2, r`The same energy is supplied to equal masses of copper ($c = 390$) and aluminium ($c = 900$). Which has the larger temperature rise?`, ['Aluminium', 'Copper', 'Both rise the same', 'Neither rises'], 1, r`$\Delta\theta = Q/mc$: a smaller $c$ gives a larger rise.`),
  num('specific-heat-capacity', 1, 2, r`Calculate the energy needed to warm 2.0 kg of water from $20\,^\circ\text{C}$ to $70\,^\circ\text{C}$ ($c = 4200\ \text{J/(kg}\,^\circ\text{C)}$), in J.`, 420000, 0.01, 'J', r`$Q = 2.0 \times 4200 \times 50 = 420\,000\ \text{J}$.`),
  num('specific-heat-capacity', 2, 2, r`A 0.50 kg metal block is given 9000 J and its temperature rises by $20\,^\circ\text{C}$. Find its specific heat capacity in J/(kg °C).`, 900, 0.01, 'J/(kg °C)', r`$c = Q/(m\Delta\theta) = 9000/(0.50 \times 20) = 900$.`),
  num('specific-heat-capacity', 2, 2, r`A 0.20 kg copper block ($c = 390\ \text{J/(kg}\,^\circ\text{C)}$) is heated from $25\,^\circ\text{C}$ to $75\,^\circ\text{C}$. Find the energy transferred in J.`, 3900, 0.01, 'J', r`$Q = 0.20 \times 390 \times 50 = 3900\ \text{J}$.`),
  num('specific-heat-capacity', 2, 3, r`A 1.5 kW kettle heats 1.0 kg of water by $60\,^\circ\text{C}$ ($c = 4200$). Assuming no energy losses, how long does it take, in s?`, 168, 0.01, 's', r`$Q = 1.0 \times 4200 \times 60 = 252\,000\ \text{J}$; $t = Q/P = 252\,000/1500 = 168\ \text{s}$.`),
  num('specific-heat-capacity', 3, 3, r`252 000 J of energy is supplied to 3.0 kg of water at $20\,^\circ\text{C}$ ($c = 4200$). Find the final temperature in °C.`, 40, 0.01, '°C', r`$\Delta\theta = Q/(mc) = 252\,000/(3.0 \times 4200) = 20\,^\circ\text{C}$, so the final temperature is $40\,^\circ\text{C}$.`),
  wr('specific-heat-capacity', 2, 'Define specific heat capacity. [2]', [
    'The energy needed to raise the temperature of 1 kg of the substance (1)',
    'by 1 °C (or 1 K) (1)',
  ]),
  wr('specific-heat-capacity', 3, 'Describe an experiment to find the specific heat capacity of a metal block using an electric heater. [5]', [
    'Measure the mass of the block with a balance (1)',
    'Put the heater and a thermometer (with a drop of oil) in the holes of the block (1)',
    'Insulate the block to reduce energy losses (1)',
    'Record the starting temperature, then switch on for a measured time, recording the electrical energy supplied (1)',
    'Record the final temperature and calculate c = E ÷ (mΔθ) (1)',
  ]),
  wr('specific-heat-capacity', 3, 'In the experiment the measured specific heat capacity is higher than the true value. Explain why. [2]', [
    'Some of the energy supplied was lost to the surroundings (1)',
    'So the energy that warmed the block was less than the energy supplied; using the larger value in c = E ÷ (mΔθ) gives a value that is too high (1)',
  ]),

  // ---------------------------------------------------------------- 2.2 changes of state
  mcq('changes-of-state', 1, 'While a pure solid is melting at its melting point, its temperature:', ['rises steadily', 'falls', 'stays constant', 'is zero'], 2, 'The energy supplied breaks bonds between particles rather than raising the temperature.'),
  mcq('changes-of-state', 1, 'Evaporation of a liquid can occur:', ['only at the boiling point', 'only below 0 °C', 'at any temperature, from the surface', 'only in the dark'], 2, 'Fast particles escape from the surface at any temperature.'),
  mcq('changes-of-state', 2, 'Why does evaporation cool the remaining liquid?', ['The slowest particles escape', 'The fastest particles escape, lowering the average kinetic energy', 'The liquid gains energy', 'The surface area decreases'], 1, 'The most energetic particles leave, so the average energy of those left falls.'),
  mcq('changes-of-state', 2, 'Which change increases the rate of evaporation of water from a wet surface?', ['A larger surface area', 'Lower temperature', 'Still, humid air', 'A smaller surface area'], 0, 'More surface area, higher temperature and moving, dry air all speed up evaporation.'),
  mcq('changes-of-state', 3, 'The specific latent heat of vaporisation is much larger than that of fusion because:', ['particles must be completely separated when boiling', 'boiling happens at a lower temperature', 'particles get heavier', 'less energy is needed'], 0, 'Boiling requires the particles to break away completely.', 'extended'),
  num('changes-of-state', 2, 3, r`The specific latent heat of fusion of ice is $3.3 \times 10^5\ \text{J/kg}$. Calculate the energy needed to melt 0.40 kg of ice at $0\,^\circ\text{C}$, in J.`, 132000, 0.01, 'J', r`$Q = mL = 0.40 \times 3.3\times10^5 = 1.32\times10^5\ \text{J}$.`, 'extended'),
  num('changes-of-state', 3, 3, r`A 2.0 kW heater boils off 0.10 kg of water already at $100\,^\circ\text{C}$. ($L_v = 2.3\times10^6\ \text{J/kg}$.) How long does this take, in s, assuming no losses?`, 115, 0.01, 's', r`$Q = 0.10 \times 2.3\times10^6 = 2.3\times10^5\ \text{J}$; $t = Q/P = 230\,000/2000 = 115\ \text{s}$.`, 'extended'),
  num('changes-of-state', 3, 4, r`Find the energy needed to change 0.50 kg of ice at $0\,^\circ\text{C}$ into water at $20\,^\circ\text{C}$, in J. ($L_f = 3.3\times10^5\ \text{J/kg}$, $c_\text{water} = 4200\ \text{J/(kg}\,^\circ\text{C)}$)`, 207000, 0.01, 'J', r`Melting: $0.50 \times 3.3\times10^5 = 165\,000\ \text{J}$. Warming: $0.50 \times 4200 \times 20 = 42\,000\ \text{J}$. Total $= 207\,000\ \text{J}$.`, 'extended'),
  wr('changes-of-state', 2, 'Water is heated steadily and reaches its boiling point. Explain why its temperature stays constant while it boils. [3]', [
    'The energy supplied is used to overcome the forces between the particles (1)',
    'So the particles can separate completely and the liquid becomes a gas (1)',
    'The energy does not increase the kinetic energy of the particles, so the temperature does not rise (1)',
  ]),
  wr('changes-of-state', 2, 'Explain, in terms of particles, how evaporation causes cooling. [3]', [
    'Particles near the surface with the most kinetic energy escape from the liquid (1)',
    'So the average kinetic energy of the remaining particles falls (1)',
    'And the temperature of the liquid decreases (1)',
  ]),
  wr('changes-of-state', 2, 'State three differences between evaporation and boiling. [3]', [
    'Evaporation occurs only at the surface; boiling occurs throughout the liquid (1)',
    'Evaporation occurs at any temperature; boiling only at the boiling point (1)',
    'Evaporation is slow, boiling is rapid, producing bubbles (1)',
  ]),
  wr('changes-of-state', 3, 'Describe the shape of the temperature–time graph as a pure liquid is cooled until it freezes completely, and explain the shape. [4]', [
    'The temperature falls steadily as the liquid cools (1)',
    'There is a horizontal section at the freezing point while it solidifies (1)',
    'Energy is released as particles form bonds, so the temperature stays constant (1)',
    'Once all frozen, the temperature falls again as the solid cools (1)',
  ]),

  // ---------------------------------------------------------------- 2.3 conduction & convection
  mcq('conduction-convection', 1, 'Which material is the best thermal conductor?', ['Wood', 'Copper', 'Plastic', 'Air'], 1, 'Metals conduct best because of their free electrons.'),
  mcq('conduction-convection', 1, 'Convection cannot take place in:', ['a solid', 'a liquid', 'a gas', 'water'], 0, 'Convection needs a fluid that can flow. Solids cannot flow.'),
  mcq('conduction-convection', 2, 'A woollen jumper keeps you warm mainly because:', ['wool is a good conductor', 'it traps air, which is a poor conductor', 'it reflects convection', 'it produces energy'], 1, 'Trapped air is an excellent insulator.'),
  mcq('conduction-convection', 2, 'Why are metals better conductors than non-metals?', ['They have free electrons that carry energy', 'Their particles are lighter', 'They are heavier', 'They contain more air'], 0, 'Free electrons move through the metal and transfer energy quickly.'),
  mcq('conduction-convection', 2, 'Why does warm air rise above a radiator?', ['It is more dense than cold air', 'It is less dense than the cooler air around it', 'Gravity does not affect it', 'It is pushed by cold air from above'], 1, 'Heated air expands, becomes less dense and rises.'),
  wr('conduction-convection', 2, 'Explain how thermal energy is conducted through a solid non-metal. [3]', [
    'Particles at the hot end gain kinetic energy and vibrate more (1)',
    'They collide with neighbouring particles (1)',
    'Which pass on the energy along the solid, from particle to particle (1)',
  ]),
  wr('conduction-convection', 2, 'Explain why metals are good conductors of thermal energy. [3]', [
    'Metals contain free (delocalised) electrons (1)',
    'The electrons gain kinetic energy when heated and move quickly through the metal (1)',
    'They collide with other particles, transferring energy much faster than by vibrations alone (1)',
  ]),
  wr('conduction-convection', 2, 'Explain how a convection current forms in a beaker of water heated from below. [4]', [
    'Water at the bottom is heated and expands (1)',
    'It becomes less dense (1)',
    'So it rises, while cooler, denser water sinks to take its place (1)',
    'A circulating flow (convection current) is set up (1)',
  ]),
  wr('conduction-convection', 3, 'The freezer compartment in a fridge is at the top. Explain why this is the best place. [3]', [
    'Air near the freezer is cooled and becomes more dense (1)',
    'So it sinks, and warmer, less dense air rises to replace it (1)',
    'A convection current cools the whole fridge (1)',
  ]),
  wr('conduction-convection', 2, 'Describe an experiment to compare the thermal conductivity of different metals. [4]', [
    'Use rods of the same size and different metals attached to one heated tank (1)',
    'Stick a drawing pin to each rod with wax at equal distances (1)',
    'Heat the tank and start timing (1)',
    'The metal whose pin drops first is the best conductor (1)',
  ]),

  // ---------------------------------------------------------------- 2.3 radiation
  mcq('radiation', 1, 'Which surface is the best absorber of infrared radiation?', ['Shiny white', 'Dull black', 'Shiny silver', 'Dull white'], 1, 'Dull black surfaces absorb and emit best.'),
  mcq('radiation', 1, 'Thermal radiation can travel through:', ['solids only', 'liquids only', 'a vacuum', 'gases only'], 2, 'Infrared is an electromagnetic wave, so it needs no medium.'),
  mcq('radiation', 2, 'The walls of a vacuum flask are silvered to reduce energy transfer by:', ['conduction', 'convection', 'radiation', 'evaporation'], 2, 'Shiny surfaces reflect infrared and are poor emitters.'),
  mcq('radiation', 2, 'Which car colour will stay coolest when parked in bright sun?', ['Dull black', 'Matt blue', 'Shiny white', 'Dark grey'], 2, 'Shiny white reflects the most radiation and absorbs least.'),
  mcq('radiation', 3, 'In a Leslie cube experiment, which face gives the largest infrared reading?', ['Shiny silver', 'Dull black', 'White', 'Shiny gold'], 1, 'A dull black surface is the best emitter.'),
  wr('radiation', 2, 'Explain how a vacuum flask keeps a hot drink hot. [4]', [
    'The vacuum between the double walls prevents conduction and convection (1)',
    'The shiny (silvered) walls reflect radiation back into the drink / are poor emitters (1)',
    'The stopper is a poor conductor and stops convection through the top (1)',
    'Glass is a poor conductor of thermal energy (1)',
  ]),
  wr('radiation', 2, 'Describe an experiment to show that a dull black surface emits infrared radiation better than a shiny surface. [3]', [
    'Fill a Leslie cube (or two identical containers with different surfaces) with hot water at the same temperature (1)',
    'Measure the radiation from each surface with a detector placed the same distance away (1)',
    'The dull black surface gives the larger reading (1)',
  ]),
  wr('radiation', 2, 'Solar water-heating panels are painted dull black. Explain why. [2]', [
    'A dull black surface is a good absorber of infrared radiation from the Sun (1)',
    'So it absorbs more energy and the water heats up faster (1)',
  ]),
  wr('radiation', 2, 'Explain why people in hot countries often wear white clothes and paint their houses white. [2]', [
    'White (shiny, light) surfaces reflect more of the infrared radiation (1)',
    'And absorb less, so they stay cooler (1)',
  ]),
  wr('radiation', 3, 'Explain how a greenhouse stays warmer than the air outside. [4]', [
    'Radiation from the Sun passes through the glass (1)',
    'It is absorbed by the plants and soil, warming them (1)',
    'They emit infrared radiation of longer wavelength, which the glass reflects or absorbs (1)',
    'The glass also stops warm air escaping by convection, so the energy is trapped (1)',
  ]),
]
