import { cardFactory, r } from '../helpers'

const a = cardFactory('physics', 'motion-forces-energy')
const b = cardFactory('physics', 'thermal')

export const physicsCards = [
  // ---- 1.1 physical quantities
  a('physical-quantities', 'SI unit of **mass**, **length**, **time**?', 'kilogram (kg), metre (m), second (s)'),
  a('physical-quantities', 'SI unit of **temperature**?', 'kelvin (K)'),
  a('physical-quantities', r`Value of the prefixes **kilo**, **milli**, **micro**?`, r`kilo $10^3$, milli $10^{-3}$, micro $10^{-6}$`),
  a('physical-quantities', r`How many $\text{cm}^3$ in $1\ \text{m}^3$?`, r`$1\,000\,000$ (square or cube the length conversion)`),
  a('physical-quantities', 'Define a **scalar**. Give two examples.', 'A quantity with size only, e.g. distance, speed, mass, time, energy.'),
  a('physical-quantities', 'Define a **vector**. Give two examples.', 'A quantity with size **and** direction, e.g. displacement, velocity, force, weight.'),
  a('physical-quantities', 'How do you find the **period** of a pendulum accurately?', 'Time many oscillations (e.g. 20) and divide by the number. Reduces reaction-time error.'),
  a('physical-quantities', 'Resultant of two forces at **right angles**?', r`$R = \sqrt{a^2 + b^2}$ (Pythagoras)`),
  a('physical-quantities', 'How do you measure the thickness of one sheet of paper?', 'Measure the thickness of a stack of n sheets and divide by n.'),
  a('physical-quantities', 'Where do you read a **measuring cylinder**?', 'At the bottom of the meniscus, with your eye level with it (avoids parallax).'),

  // ---- 1.2 motion
  a('motion', 'Define **speed**.', r`Distance travelled per unit time. $v = s/t$`),
  a('motion', 'Difference between **speed** and **velocity**?', 'Speed is a scalar (size only). Velocity is a vector (size and direction).'),
  a('motion', 'Formula for **acceleration**.', r`$a = \dfrac{v-u}{t}$, unit $\text{m/s}^2$`),
  a('motion', 'What does the **gradient** of a distance–time graph give?', 'The speed.'),
  a('motion', 'What does the **gradient** of a speed–time graph give?', 'The acceleration.'),
  a('motion', 'What does the **area under** a speed–time graph give?', 'The distance travelled.'),
  a('motion', 'What does a horizontal line on a distance–time graph mean?', 'The object is stationary.'),
  a('motion', 'What does a horizontal line on a speed–time graph mean?', 'Constant speed (zero acceleration).'),
  a('motion', 'Value of the **acceleration of free fall** near the Earth?', r`$g \approx 10\ \text{m/s}^2$`),
  a('motion', 'Convert **km/h to m/s**.', 'Divide by 3.6.'),
  a('motion', 'Describe **terminal velocity**.', 'Air resistance equals weight, so the resultant force is zero and the object falls at constant speed.'),
  a('motion', 'Area of a **trapezium** on a speed–time graph?', r`$\tfrac12(a+b)h$`),

  // ---- 1.3 mass and weight
  a('mass-weight', 'Define **mass**.', 'The amount of matter in an object (kg). Does not change with place.'),
  a('mass-weight', 'Define **weight**.', 'The gravitational force on an object (N). Depends on the field strength.'),
  a('mass-weight', 'Formula linking weight and mass.', r`$W = mg$`),
  a('mass-weight', 'What is **g** on Earth?', r`$10\ \text{N/kg}$ (about $9.8$)`),
  a('mass-weight', 'What is **g** on the Moon?', r`About $1.6\ \text{N/kg}$ (one sixth of Earth\'s).`),
  a('mass-weight', 'What instrument measures **weight**?', 'A newton-meter (spring balance).'),
  a('mass-weight', 'What is **inertia**?', 'The resistance of an object to a change in its motion. Greater mass means greater inertia.'),
  a('mass-weight', 'Define **gravitational field strength**.', r`The force per unit mass: $g = W/m$.`),

  // ---- 1.4 density
  a('density', 'Formula for **density**.', r`$\rho = \dfrac{m}{V}$`),
  a('density', 'When does an object **float** in a liquid?', 'When its density is less than the density of the liquid.'),
  a('density', r`$1\ \text{g/cm}^3$ in $\text{kg/m}^3$?`, r`$1000\ \text{kg/m}^3$`),
  a('density', 'Density of **water**?', r`$1\ \text{g/cm}^3 = 1000\ \text{kg/m}^3$`),
  a('density', 'How do you find the volume of an irregular solid?', 'Displacement: the rise in water level in a measuring cylinder (or overflow from a eureka can).'),
  a('density', 'How do you find the density of a liquid?', 'Tare a measuring cylinder on a balance, add liquid, read mass and volume, divide.'),
  a('density', r`$1\ \text{ml}$ equals how many $\text{cm}^3$?`, r`$1\ \text{cm}^3$ (and $1\ \text{litre} = 1000\ \text{cm}^3$)`),
  a('density', 'Why does oil float on water?', 'Oil is less dense than water.'),

  // ---- 1.5 forces
  a('forces', 'What is a **resultant force**?', 'The single force that has the same effect as all the forces acting.'),
  a('forces', 'Newton\'s **first law**.', 'An object stays at rest or at constant velocity unless a resultant force acts on it.'),
  a('forces', 'Newton\'s **second law** (equation).', r`$F = ma$`),
  a('forces', 'Newton\'s **third law**.', 'If A exerts a force on B, B exerts an equal and opposite force on A. (The forces act on different objects.)'),
  a('forces', 'What does **friction** do?', 'Opposes motion between surfaces, converting kinetic energy to thermal energy.'),
  a('forces', '**Hooke\'s law**.', r`Extension is proportional to force: $F = kx$ (up to the limit of proportionality).`),
  a('forces', 'Unit of the **spring constant**?', 'N/m'),
  a('forces', 'What is **extension**?', 'New length minus original length.'),
  a('forces', 'Why is an object in **circular motion** accelerating?', 'Its direction (so velocity) is constantly changing.'),
  a('forces', 'What provides **centripetal force** for a car on a bend?', 'Friction between the tyres and the road.'),
  a('forces', 'Direction of the force needed for circular motion?', 'Towards the centre of the circle.'),

  // ---- 1.5 moments
  a('moments-stability', 'Formula for a **moment**.', r`moment $= F \times d$ (perpendicular distance from the pivot), unit N m`),
  a('moments-stability', '**Principle of moments**.', 'For equilibrium, total clockwise moment = total anticlockwise moment.'),
  a('moments-stability', 'Two conditions for **equilibrium**?', 'Resultant force is zero and resultant moment is zero.'),
  a('moments-stability', 'Define **centre of mass**.', 'The point where the whole weight of the object appears to act.'),
  a('moments-stability', 'How to make an object more **stable**?', 'Lower the centre of mass and widen the base.'),
  a('moments-stability', 'When does an object **topple**?', 'When the vertical line through its centre of mass falls outside its base.'),
  a('moments-stability', 'How do you find the centre of mass of an irregular lamina?', 'Hang it from several holes with a plumb line; mark the vertical lines. They cross at the centre of mass.'),

  // ---- 1.6 momentum
  a('momentum', 'Formula for **momentum**.', r`$p = mv$, unit kg m/s`),
  a('momentum', '**Conservation of momentum**.', 'Total momentum before = total momentum after, if no external force acts.'),
  a('momentum', 'Is momentum a scalar or a vector?', 'A vector (has direction).'),
  a('momentum', 'Momentum before an **explosion** from rest?', 'Zero, so after it the momenta are equal and opposite.'),
  a('momentum', 'Force in terms of momentum.', r`$F = \dfrac{\Delta p}{\Delta t}$`),
  a('momentum', 'What is **impulse**?', r`$F\Delta t = \Delta p$ (change in momentum), unit N s`),
  a('momentum', 'How do crumple zones and air bags reduce injury?', 'They increase the time for the momentum change, so the force is smaller.'),

  // ---- 1.7 energy
  a('energy-work-power', 'Formula for **kinetic energy**.', r`$E_k = \tfrac12 mv^2$`),
  a('energy-work-power', 'Formula for **gravitational potential energy**.', r`$E_p = mgh$`),
  a('energy-work-power', 'Formula for **work done**.', r`$W = Fd$ (distance in the direction of the force)`),
  a('energy-work-power', 'Define **power**.', r`The rate of transferring energy. $P = W/t$, unit watt (W)`),
  a('energy-work-power', 'Formula for **efficiency**.', r`$\dfrac{\text{useful output}}{\text{total input}} \times 100\%$`),
  a('energy-work-power', 'State the **principle of conservation of energy**.', 'Energy cannot be created or destroyed, only transferred from one store to another.'),
  a('energy-work-power', 'What happens to wasted energy?', 'It is dissipated, usually as thermal energy in the surroundings.'),
  a('energy-work-power', 'If speed doubles, kinetic energy...', 'Increases by a factor of 4 (because of $v^2$).'),
  a('energy-work-power', 'What does a **Sankey diagram** show?', 'Energy transfers. The width of each arrow is proportional to the energy.'),
  a('energy-work-power', 'Name six **energy stores**.', 'Kinetic, gravitational potential, chemical, elastic, nuclear, thermal (also electrostatic, magnetic).'),

  // ---- 1.7 energy resources
  a('energy-resources', 'Define **renewable** resource.', 'Replaced as fast as it is used (will not run out).'),
  a('energy-resources', 'Name four **non-renewable** resources.', 'Coal, oil, natural gas, nuclear fuel (uranium).'),
  a('energy-resources', 'How do power stations generate electricity?', 'Fuel heats water to steam, which turns a turbine, which turns a generator.'),
  a('energy-resources', 'What is nuclear **fission**?', 'A heavy nucleus (e.g. uranium-235) splits into smaller nuclei, releasing energy.'),
  a('energy-resources', 'What is nuclear **fusion**?', 'Light nuclei join (hydrogen to helium), releasing energy. It powers the Sun.'),
  a('energy-resources', 'Disadvantage of **wind** power?', 'Only works when windy; visual and noise impact.'),
  a('energy-resources', 'Which renewable resource does not depend on the Sun?', 'Geothermal (also tidal, from the Moon\'s gravity).'),
  a('energy-resources', 'Disadvantage of **fossil fuels**?', 'Release CO₂ (global warming), cause acid rain, and are non-renewable.'),

  // ---- 1.8 pressure
  a('pressure', 'Formula for **pressure**.', r`$p = \dfrac{F}{A}$`),
  a('pressure', 'Unit of pressure.', r`pascal (Pa), $1\ \text{Pa} = 1\ \text{N/m}^2$`),
  a('pressure', 'How do you **reduce** pressure?', 'Increase the area (skis, wide tyres) or reduce the force.'),
  a('pressure', 'How does liquid pressure vary with **depth**?', 'It increases with depth, and acts equally in all directions.'),
  a('pressure', 'Formula for **pressure difference** in a liquid.', r`$\Delta p = \rho g h$`),
  a('pressure', 'What causes **atmospheric pressure**?', 'The weight of the air above. About $100\,000\ \text{Pa}$ at sea level.'),
  a('pressure', 'Convert $\text{cm}^2$ to $\text{m}^2$.', 'Divide by $10\,000$.'),

  // ============================ Thermal physics
  // ---- 2.1 particle model
  b('particle-model', 'Arrangement and motion of particles in a **solid**.', 'Regular pattern, tightly packed; they vibrate about fixed positions.'),
  b('particle-model', 'Arrangement and motion of particles in a **liquid**.', 'Close together but irregular; they slide past each other.'),
  b('particle-model', 'Arrangement and motion of particles in a **gas**.', 'Far apart and random; they move quickly in all directions.'),
  b('particle-model', 'What is **Brownian motion**?', 'Random jiggling of visible particles caused by collisions with fast-moving invisible molecules.'),
  b('particle-model', 'What is **sublimation**?', 'A solid changing directly to a gas.'),
  b('particle-model', 'Why can gases be **compressed**?', 'Large gaps between the particles.'),
  b('particle-model', 'What happens to particle energy when a substance is heated?', 'The particles gain kinetic energy.'),
  b('particle-model', 'Why do liquids **flow**?', 'The particles can slide past each other.'),

  // ---- 2.1 gases
  b('gases', 'How do gas particles create **pressure**?', 'They collide with the container walls, exerting a force. Pressure = force per area.'),
  b('gases', 'Convert **°C to kelvin**.', r`$T(\text{K}) = \theta(^\circ\text{C}) + 273$`),
  b('gases', 'What is **absolute zero**?', r`$0\ \text{K} = -273\,^\circ\text{C}$, the lowest possible temperature.`),
  b('gases', 'Effect of **raising the temperature** of a gas in a fixed volume?', 'Particles move faster, hit the walls more often and harder; pressure increases.'),
  b('gases', 'Pressure–volume relationship (constant temperature).', r`$pV = \text{constant}$, i.e. $p_1V_1 = p_2V_2$`),
  b('gases', 'Halving the volume at constant temperature does what to pressure?', 'Doubles it.'),

  // ---- 2.2 expansion & thermometers
  b('thermal-expansion', 'Which expands most: solids, liquids or gases?', 'Gases expand most; solids least.'),
  b('thermal-expansion', 'Why does a solid **expand** when heated?', 'Particles vibrate more and move slightly further apart (the particles themselves do not get bigger).'),
  b('thermal-expansion', 'How does a **bimetallic strip** work?', 'Two metals expand by different amounts, so the strip bends when heated.'),
  b('thermal-expansion', 'Name the two **fixed points** used to calibrate a thermometer.', r`Ice point ($0\,^\circ\text{C}$) and steam point ($100\,^\circ\text{C}$).`),
  b('thermal-expansion', 'How can a liquid-in-glass thermometer be made more **sensitive**?', 'Use a narrower tube (or a larger bulb).'),
  b('thermal-expansion', 'Advantage of a **thermocouple**?', 'Very wide range, fast response, can measure very high temperatures.'),
  b('thermal-expansion', 'Difference between **temperature** and **thermal energy**?', 'Temperature is the average kinetic energy of particles; thermal energy is the total energy stored.'),

  // ---- 2.2 specific heat capacity
  b('specific-heat-capacity', 'Define **specific heat capacity**.', r`Energy needed to raise the temperature of $1\ \text{kg}$ of a substance by $1\,^\circ\text{C}$.`),
  b('specific-heat-capacity', 'Equation for thermal energy change.', r`$Q = mc\Delta\theta$`),
  b('specific-heat-capacity', 'Unit of specific heat capacity.', r`$\text{J/(kg}\,^\circ\text{C)}$`),
  b('specific-heat-capacity', 'Specific heat capacity of **water**.', r`$4200\ \text{J/(kg}\,^\circ\text{C)}$`),
  b('specific-heat-capacity', 'What is **thermal capacity**?', r`Energy needed to raise the temperature of the whole object by $1\,^\circ\text{C}$: $mc$.`),
  b('specific-heat-capacity', 'Why is a measured value of c often too high?', 'Some energy is lost to the surroundings, so more energy was supplied than the block absorbed.'),
  b('specific-heat-capacity', r`Why must mass be in kg in $Q = mc\Delta\theta$?`, r`Because $c$ is in $\text{J/(kg}\,^\circ\text{C)}$.`),

  // ---- 2.2 changes of state
  b('changes-of-state', 'What happens to **temperature** during a change of state?', 'It stays constant. The energy changes the arrangement or bonds, not the kinetic energy.'),
  b('changes-of-state', 'Define **evaporation**.', 'Fastest particles escape from the surface of a liquid at any temperature.'),
  b('changes-of-state', 'Why does evaporation **cool** a liquid?', 'The most energetic particles escape, lowering the average kinetic energy of those left.'),
  b('changes-of-state', 'Three ways to **increase** the evaporation rate.', 'Higher temperature, larger surface area, moving or drier air.'),
  b('changes-of-state', 'Evaporation vs boiling: where does each occur?', 'Evaporation: at the surface only. Boiling: throughout the liquid, at the boiling point.'),
  b('changes-of-state', 'Define **specific latent heat**.', r`Energy needed to change the state of $1\ \text{kg}$ without a change in temperature. $Q = mL$`),
  b('changes-of-state', 'Why is $L_v$ bigger than $L_f$?', 'Boiling requires the particles to be completely separated.'),
  b('changes-of-state', 'Melting point of pure ice and boiling point of pure water?', r`$0\,^\circ\text{C}$ and $100\,^\circ\text{C}$ (normal atmospheric pressure)`),

  // ---- 2.3 conduction & convection
  b('conduction-convection', 'What is **conduction**?', 'Thermal energy transfer through a material without the material moving (mainly solids).'),
  b('conduction-convection', 'Why do **metals** conduct well?', 'Free (delocalised) electrons carry energy quickly through the metal.'),
  b('conduction-convection', 'What is **convection**?', 'Transfer of thermal energy by movement of a heated fluid (liquid or gas).'),
  b('conduction-convection', 'Why does a heated fluid **rise**?', 'It expands, becomes less dense, and is pushed up by the denser cooler fluid.'),
  b('conduction-convection', 'Name some good **insulators**.', 'Wood, plastic, wool, air (trapped), glass, vacuum.'),
  b('conduction-convection', 'Why is **trapped air** a good insulator?', 'Gases are poor conductors and trapped air cannot form convection currents.'),
  b('conduction-convection', 'Which methods need a **medium**?', 'Conduction and convection (radiation does not).'),
  b('conduction-convection', 'Why is a freezer placed at the **top** of a fridge?', 'Cooled air is denser and sinks, setting up a convection current.'),

  // ---- 2.3 radiation
  b('radiation', 'What is **thermal radiation**?', 'Infrared electromagnetic waves. Needs no medium; can travel through a vacuum.'),
  b('radiation', 'Best **absorber and emitter** of infrared?', 'Dull black surface.'),
  b('radiation', 'Best **reflector** of infrared?', 'Shiny white or silver surface.'),
  b('radiation', 'Factors affecting rate of radiation from an object.', 'Surface temperature, surface area, surface colour and texture.'),
  b('radiation', 'How does a **vacuum flask** reduce heat loss?', 'Vacuum stops conduction and convection; silvered walls reflect radiation; stopper insulates.'),
  b('radiation', 'What does the **Leslie cube** compare?', 'The rate of infrared emission from different surfaces at the same temperature.'),
  b('radiation', 'Why are solar panels painted **black**?', 'To absorb as much radiation as possible.'),
  b('radiation', 'Why does a greenhouse stay warm?', 'Short-wave radiation passes in; re-emitted longer-wave infrared is trapped by the glass.'),
]
