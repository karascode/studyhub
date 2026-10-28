import { questionFactory, r } from '../helpers'

const { mcq, num, wr } = questionFactory('physics', 'motion-forces-energy')

export const physicsT1Questions = [
  // ---------------------------------------------------------------- 1.1 physical quantities
  mcq('physical-quantities', 1, 'What is the SI unit of mass?', ['gram', 'kilogram', 'newton', 'tonne'], 1, 'The SI base unit of mass is the kilogram.'),
  mcq('physical-quantities', 1, 'Which of these is a **vector** quantity?', ['Mass', 'Temperature', 'Displacement', 'Time'], 2, 'Displacement has size and direction. The others are scalars.'),
  mcq('physical-quantities', 1, r`Convert $2.5\ \text{km}$ into metres.`, ['25 m', '250 m', '2500 m', '25 000 m'], 2, r`$2.5 \times 1000 = 2500\ \text{m}$.`),
  mcq('physical-quantities', 2, r`The prefix micro ($\mu$) means:`, [r`$10^{-3}$`, r`$10^{-6}$`, r`$10^{6}$`, r`$10^{-9}$`], 1, r`Micro is $10^{-6}$; milli is $10^{-3}$; nano is $10^{-9}$.`),
  num('physical-quantities', 1, 2, 'A pendulum makes 20 complete oscillations in 32 s. Find the period in seconds.', 1.6, 0.01, 's', r`$T = 32/20 = 1.6\ \text{s}$.`),
  num('physical-quantities', 2, 2, r`Convert an area of $0.45\ \text{m}^2$ into $\text{cm}^2$.`, 4500, 0.01, 'cm²', r`$1\ \text{m}^2 = 10\,000\ \text{cm}^2$, so $0.45 \times 10\,000 = 4500$.`),
  num('physical-quantities', 2, 2, 'Two forces of 6 N and 8 N act at right angles on an object. Find the size of the resultant force in N.', 10, 0.01, 'N', r`$R = \sqrt{6^2 + 8^2} = \sqrt{100} = 10\ \text{N}$.`),
  num('physical-quantities', 2, 2, '200 sheets of paper make a stack 2.4 cm thick. Find the thickness of one sheet in mm.', 0.12, 0.02, 'mm', r`$2.4\ \text{cm} = 24\ \text{mm}$, and $24/200 = 0.12\ \text{mm}$.`),
  wr('physical-quantities', 1, 'Describe how to find the period of a pendulum as accurately as possible using a stopwatch. [3]', [
    'Time a number of complete oscillations, e.g. 20 (1)',
    'Divide the total time by the number of oscillations (1)',
    'This reduces the percentage error caused by reaction time (1)',
  ]),
  wr('physical-quantities', 2, 'Explain the difference between a scalar and a vector quantity, and give one example of each. [3]', [
    'A scalar has size (magnitude) only (1)',
    'A vector has size and direction (1)',
    'Correct example of each, e.g. speed and velocity (1)',
  ]),
  wr('physical-quantities', 2, 'Describe how to find the thickness of a single sheet of paper using a ruler. [3]', [
    'Measure the thickness of a stack of many sheets (1)',
    'Divide the thickness by the number of sheets (1)',
    'A larger stack (or a micrometer) reduces the percentage error (1)',
  ]),

  // ---------------------------------------------------------------- 1.2 motion
  mcq('motion', 1, 'On a distance–time graph, which feature shows an object moving at constant speed?', ['A horizontal line', 'A straight sloping line', 'A curve getting steeper', 'A vertical line'], 1, 'A straight sloping line has constant gradient, which is constant speed. A horizontal line means stationary.'),
  mcq('motion', 1, 'What is the unit of acceleration?', ['m/s', r`$\text{m/s}^2$`, 'N', 'm'], 1, r`Acceleration is change in velocity per second, so $\text{m/s}^2$.`),
  mcq('motion', 2, 'A horizontal line on a speed–time graph shows that the object is:', ['stationary', 'moving at constant speed', 'accelerating uniformly', 'decelerating'], 1, 'Speed is not changing, so it moves at constant speed (and has zero acceleration).'),
  mcq('motion', 2, 'The gradient of a speed–time graph represents:', ['distance', 'speed', 'acceleration', 'time'], 2, 'Change in speed divided by change in time is acceleration.'),
  mcq('motion', 2, 'A skydiver is falling at terminal velocity. Which statement is correct?', ['Her weight is zero', 'Air resistance equals her weight', 'Air resistance is zero', 'She is accelerating downwards at 10 m/s²'], 1, 'The resultant force is zero, so air resistance balances weight and the speed is constant.', 'extended'),
  num('motion', 1, 2, 'A cyclist travels 450 m in 30 s at constant speed. Calculate the speed in m/s.', 15, 0.01, 'm/s', r`$v = s/t = 450/30 = 15\ \text{m/s}$.`),
  num('motion', 1, 2, 'Convert 72 km/h into m/s.', 20, 0.01, 'm/s', r`$72 \div 3.6 = 20\ \text{m/s}$.`),
  num('motion', 2, 2, 'A train slows from 30 m/s to 12 m/s in 6 s. Calculate its acceleration in m/s². (Give a negative value for deceleration.)', -3, 0.01, 'm/s²', r`$a = (12 - 30)/6 = -3\ \text{m/s}^2$.`),
  num('motion', 2, 2, 'A car accelerates uniformly from rest at 2.5 m/s² for 8.0 s. Find its final speed in m/s.', 20, 0.01, 'm/s', r`$v = u + at = 0 + 2.5 \times 8 = 20\ \text{m/s}$.`),
  num('motion', 3, 3, 'A car travels at a constant 15 m/s for 20 s, then decelerates uniformly to rest in the next 10 s. Find the total distance travelled in m.', 375, 0.01, 'm', r`Distance $= 15 \times 20 + \tfrac12 \times 10 \times 15 = 300 + 75 = 375\ \text{m}$ (areas under the graph).`),
  wr('motion', 2, 'A speed–time graph shows a car increasing speed steadily from 0 to 20 m/s in 10 s, then travelling at 20 m/s for 20 s.\n\n(a) State what the gradient of the first section represents. [1]\n\n(b) Calculate the total distance travelled. [2]', [
    'Gradient represents acceleration (1)',
    'Distance in first 10 s = ½ × 10 × 20 = 100 m (area under graph) (1)',
    'Total = 100 + (20 × 20) = 500 m (1)',
  ], 'The area under a speed–time graph is the distance. Triangle: 100 m. Rectangle: 400 m. Total 500 m.'),
  wr('motion', 2, 'A distance–time graph has three sections: a straight line sloping upwards for 10 s reaching 40 m; a horizontal line for 5 s; then a steeper straight line upwards for 5 s reaching 100 m. Describe the motion in each section and calculate the speed in the last section. [4]', [
    'Section 1: constant speed (4 m/s) (1)',
    'Section 2: stationary / at rest (1)',
    'Section 3: moving at a higher constant speed (1)',
    'Speed = 60 ÷ 5 = 12 m/s (1)',
  ]),
  wr('motion', 3, 'Describe, in terms of the forces acting, how a skydiver reaches terminal velocity. [5]', [
    'At the start weight is greater than air resistance so there is a resultant downward force and she accelerates (1)',
    'As speed increases air resistance increases (1)',
    'So the resultant force (and acceleration) decreases (1)',
    'Eventually air resistance equals weight and the resultant force is zero (1)',
    'She then falls at a constant speed, the terminal velocity (1)',
  ], undefined, 'extended'),

  // ---------------------------------------------------------------- 1.3 mass and weight
  mcq('mass-weight', 1, 'What is the unit of weight?', ['kilogram', 'newton', 'joule', 'pascal'], 1, 'Weight is a force, measured in newtons.'),
  mcq('mass-weight', 1, 'An astronaut travels from Earth to the Moon. Which quantity stays the same?', ['Weight', 'Mass', 'Gravitational field strength', 'Force of gravity on them'], 1, 'Mass is the amount of matter and does not change. Weight depends on the local field strength.'),
  mcq('mass-weight', 1, 'Which instrument is used to measure weight?', ['Balance', 'Newton-meter (spring balance)', 'Measuring cylinder', 'Stopwatch'], 1, 'A newton-meter measures force; weight is a force.'),
  mcq('mass-weight', 2, 'The gravitational field strength near the Earth\'s surface is about:', ['10 N/kg', '10 kg/N', '1.6 N/kg', '100 N/kg'], 0, r`$g \approx 10\ \text{N/kg}$ on Earth.`),
  num('mass-weight', 1, 2, 'Find the weight of a 4.5 kg bag on Earth, using g = 10 N/kg.', 45, 0.01, 'N', r`$W = mg = 4.5 \times 10 = 45\ \text{N}$.`),
  num('mass-weight', 1, 2, 'An object weighs 600 N on Earth (g = 10 N/kg). Find its mass in kg.', 60, 0.01, 'kg', r`$m = W/g = 600/10 = 60\ \text{kg}$.`),
  num('mass-weight', 2, 2, 'An object weighs 48 N on the Moon where g = 1.6 N/kg. Find its mass in kg.', 30, 0.01, 'kg', r`$m = 48/1.6 = 30\ \text{kg}$.`),
  num('mass-weight', 2, 2, 'Find the weight on the Moon (g = 1.6 N/kg) of an astronaut of mass 80 kg, in N.', 128, 0.01, 'N', r`$W = mg = 80 \times 1.6 = 128\ \text{N}$.`),
  wr('mass-weight', 1, 'State three differences between mass and weight. [3]', [
    'Mass is the amount of matter; weight is the gravitational force on the mass (1)',
    'Mass is measured in kg; weight in N (1)',
    'Mass is the same everywhere; weight depends on the gravitational field strength (1)',
  ]),
  wr('mass-weight', 2, 'An astronaut has a mass of 70 kg on Earth. On the Moon g = 1.6 N/kg. State and explain her mass and weight on the Moon. [3]', [
    'Mass is still 70 kg (1)',
    'Weight = 70 × 1.6 = 112 N (1)',
    'Mass does not depend on location, but the Moon has a weaker gravitational field strength (1)',
  ]),

  // ---------------------------------------------------------------- 1.4 density
  mcq('density', 1, 'A block floats in water. What can be said about its density?', ['Greater than water', 'Equal to zero', 'Less than water', 'It cannot be known'], 2, 'Objects float when their density is less than that of the liquid.'),
  mcq('density', 1, 'Which equation correctly defines density?', [r`$\rho = V/m$`, r`$\rho = m/V$`, r`$\rho = mV$`, r`$\rho = m + V$`], 1, r`Density is mass per unit volume: $\rho = m/V$.`),
  mcq('density', 2, r`$1\ \text{g/cm}^3$ is equal to:`, [r`$10\ \text{kg/m}^3$`, r`$100\ \text{kg/m}^3$`, r`$1000\ \text{kg/m}^3$`, r`$10\,000\ \text{kg/m}^3$`], 2, r`$1\ \text{g/cm}^3 = 1000\ \text{kg/m}^3$ (the density of water).`),
  mcq('density', 2, 'Which method finds the volume of an irregular stone?', ['Weigh it on a balance', 'Measure how much water level rises in a measuring cylinder', 'Measure its length with a ruler only', 'Use a thermometer'], 1, 'The displacement method: volume of stone = rise in water level.'),
  num('density', 1, 2, r`A metal block has mass 540 g and volume $200\ \text{cm}^3$. Calculate its density in $\text{g/cm}^3$.`, 2.7, 0.01, 'g/cm³', r`$\rho = 540/200 = 2.7\ \text{g/cm}^3$.`),
  num('density', 2, 2, r`Find the mass in kg of $0.50\ \text{m}^3$ of concrete of density $2400\ \text{kg/m}^3$.`, 1200, 0.01, 'kg', r`$m = \rho V = 2400 \times 0.5 = 1200\ \text{kg}$.`),
  num('density', 2, 2, r`A stone of mass 30 g raises the water level in a measuring cylinder from $40\ \text{cm}^3$ to $52\ \text{cm}^3$. Find its density in $\text{g/cm}^3$.`, 2.5, 0.01, 'g/cm³', r`$V = 12\ \text{cm}^3$, $\rho = 30/12 = 2.5\ \text{g/cm}^3$.`),
  num('density', 3, 3, r`A liquid has density $0.80\ \text{g/cm}^3$. Calculate the mass of $2.5\ \text{litres}$ of it in grams. ($1\ \text{litre} = 1000\ \text{cm}^3$)`, 2000, 0.01, 'g', r`$V = 2500\ \text{cm}^3$, so $m = 0.80 \times 2500 = 2000\ \text{g}$.`),
  num('density', 3, 3, 'A cube of side 4.0 cm has a mass of 128 g. Find its density in g/cm³.', 2, 0.01, 'g/cm³', r`$V = 4^3 = 64\ \text{cm}^3$, $\rho = 128/64 = 2.0\ \text{g/cm}^3$.`),
  wr('density', 2, 'Describe how to find the density of a small irregular stone using a balance, a measuring cylinder and some water. [4]', [
    'Measure the mass of the stone using the balance (1)',
    'Part-fill the measuring cylinder with water and record the volume (1)',
    'Lower the stone in and record the new volume; the difference is the stone\'s volume (1)',
    'Density = mass ÷ volume (1)',
  ]),
  wr('density', 2, 'Oil poured onto water floats on top. Explain why. [2]', [
    'The density of the oil is less than the density of water (1)',
    'An object or liquid floats on a liquid that is denser than it (1)',
  ]),
  wr('density', 3, 'Describe how to find the density of a liquid using a measuring cylinder and a balance. [4]', [
    'Place the empty measuring cylinder on the balance and zero it (1)',
    'Pour in some liquid and read the volume at the bottom of the meniscus (1)',
    'Read the mass of the liquid from the balance (1)',
    'Calculate density = mass ÷ volume (1)',
  ]),

  // ---------------------------------------------------------------- 1.5 forces
  mcq('forces', 1, 'An object moves at constant velocity. The resultant force on it is:', ['zero', 'equal to its weight', 'equal to its velocity', 'impossible to know'], 0, 'Constant velocity means zero acceleration, so the forces are balanced (Newton\'s first law).'),
  mcq('forces', 1, 'What is the unit of the spring constant?', ['N', 'N/m', 'm/N', 'kg'], 1, r`$k = F/x$ is force per unit extension, in N/m.`),
  mcq('forces', 2, 'A book rests on a table. The Earth pulls the book down (its weight). What is the Newton\'s third law partner of this force?', ['The table pushes up on the book', 'The book pulls up on the Earth', 'The book pushes down on the table', 'Friction on the book'], 1, 'A third-law pair acts on **different** objects, are the same type of force, and are equal and opposite.'),
  mcq('forces', 2, 'A car moves round a circular track at constant speed. Its acceleration is:', ['zero', 'directed towards the centre of the circle', 'directed away from the centre', 'along the direction of travel'], 1, 'The velocity is changing direction, so the car accelerates towards the centre.'),
  num('forces', 1, 2, 'A 1200 kg car has a resultant force of 1800 N. Calculate its acceleration in m/s².', 1.5, 0.01, 'm/s²', r`$a = F/m = 1800/1200 = 1.5\ \text{m/s}^2$.`),
  num('forces', 2, 2, 'A spring has a spring constant of 40 N/m. Find its extension in metres when a force of 6 N is applied.', 0.15, 0.01, 'm', r`$x = F/k = 6/40 = 0.15\ \text{m}$.`),
  num('forces', 2, 2, 'A 0.50 kg trolley accelerates at 3.0 m/s². Calculate the resultant force in N.', 1.5, 0.01, 'N', r`$F = ma = 0.5 \times 3 = 1.5\ \text{N}$.`),
  num('forces', 2, 3, 'A 900 kg car has a driving force of 2700 N and friction of 900 N. Calculate its acceleration in m/s².', 2, 0.01, 'm/s²', r`Resultant $= 2700 - 900 = 1800\ \text{N}$, $a = 1800/900 = 2\ \text{m/s}^2$.`),
  num('forces', 3, 2, 'A spring extends by 4.0 cm when a force of 10 N is applied. Find the spring constant in N/m.', 250, 0.01, 'N/m', r`$x = 0.040\ \text{m}$, $k = 10/0.040 = 250\ \text{N/m}$.`),
  wr('forces', 2, 'State Hooke\'s law and describe what happens beyond the limit of proportionality. [3]', [
    'The extension of a spring is directly proportional to the force applied (1)',
    '(provided the limit of proportionality is not exceeded) (1)',
    'Beyond the limit the spring stretches more for each extra newton / the graph curves (1)',
  ]),
  wr('forces', 2, 'A car travels round a bend at constant speed. Explain why it is accelerating and state what provides the centripetal force. [3]', [
    'The direction of the velocity is changing, so it accelerates (1)',
    'The resultant force/acceleration is towards the centre of the circle (1)',
    'Friction between the tyres and the road provides the force (1)',
  ]),
  wr('forces', 3, 'Describe an experiment to find the spring constant of a spring. [4]', [
    'Hang the spring from a stand and measure its original length (1)',
    'Add known masses in steps; calculate force from weight and measure the new length each time (1)',
    'Extension = new length − original length (1)',
    'Plot force against extension; the gradient of the straight part is the spring constant (1)',
  ]),

  // ---------------------------------------------------------------- 1.5 moments & stability
  mcq('moments-stability', 1, 'What is the unit of a moment?', ['N', 'N m', 'N/m', 'J/s'], 1, 'Moment = force × perpendicular distance, in newton-metres.'),
  mcq('moments-stability', 1, 'For an object in equilibrium, the principle of moments states that:', ['clockwise moments equal anticlockwise moments', 'the forces are all equal', 'the weight is zero', 'the sum of distances is zero'], 0, 'Total clockwise moment = total anticlockwise moment about any pivot.'),
  mcq('moments-stability', 2, 'Which change makes an object **more** stable?', ['Raising the centre of mass', 'Making the base narrower', 'Lowering the centre of mass', 'Adding weight to the top'], 2, 'A low centre of mass and a wide base increase stability.'),
  mcq('moments-stability', 2, 'Which change makes a spanner give a larger turning effect?', ['Using a shorter spanner', 'Using a longer spanner', 'Pushing nearer the nut', 'Applying a smaller force'], 1, 'Moment = F × d, so a longer spanner (greater d) increases the moment.'),
  num('moments-stability', 1, 2, 'A force of 40 N acts at a perpendicular distance of 0.30 m from a pivot. Find the moment in N m.', 12, 0.01, 'N m', r`$40 \times 0.30 = 12\ \text{N m}$.`),
  num('moments-stability', 2, 2, 'A 300 N child sits 1.5 m from the pivot of a see-saw. How far from the pivot must a 450 N child sit on the other side to balance it, in m?', 1, 0.01, 'm', r`$300 \times 1.5 = 450 \times d$, so $d = 1.0\ \text{m}$.`),
  num('moments-stability', 2, 2, 'A door handle is 0.80 m from the hinge. A force of 15 N acts at right angles to the door. Find the moment in N m.', 12, 0.01, 'N m', r`$15 \times 0.80 = 12\ \text{N m}$.`),
  num('moments-stability', 3, 2, 'A uniform beam is balanced at its centre. A 40 N load hangs 0.80 m to the left of the pivot. What force acts 0.50 m to the right to balance it, in N?', 64, 0.01, 'N', r`$40 \times 0.80 = F \times 0.50$, so $F = 64\ \text{N}$.`),
  wr('moments-stability', 2, 'Describe how to find the centre of mass of an irregular piece of card. [4]', [
    'Make three small holes near the edge of the card (1)',
    'Hang the card from a pin through one hole with a plumb line hanging from the pin (1)',
    'Draw a vertical line along the plumb line (1)',
    'Repeat for the other holes; the lines cross at the centre of mass (1)',
  ]),
  wr('moments-stability', 2, 'Explain why a double-decker bus with passengers on the top deck is less stable than one with passengers on the lower deck. [3]', [
    'The centre of mass is higher (1)',
    'It will topple when the line of action of the weight falls outside the base (1)',
    'This happens at a smaller angle of tilt (1)',
  ]),
  wr('moments-stability', 3, 'A child of weight 200 N sits 2.0 m from the pivot of a see-saw. Another child sits 1.25 m from the pivot on the other side and balances it. Calculate the weight of the second child. [3]', [
    'Clockwise moment = anticlockwise moment (1)',
    '200 × 2.0 = 400 N m (1)',
    'Weight = 400 ÷ 1.25 = 320 N (1)',
  ]),

  // ---------------------------------------------------------------- 1.6 momentum
  mcq('momentum', 1, 'What is the unit of momentum?', ['kg m/s', 'N', 'J', 'kg/m'], 0, r`$p = mv$, so kg m/s.`),
  mcq('momentum', 1, 'Momentum is:', ['a scalar', 'a vector', 'a force', 'a form of energy'], 1, 'Momentum has direction, the same as the velocity.'),
  mcq('momentum', 2, 'In a collision with no external forces, the total momentum of the objects:', ['increases', 'decreases', 'stays the same', 'becomes zero'], 2, 'Momentum is conserved in a closed system.'),
  mcq('momentum', 2, 'A crumple zone reduces injury because it:', ['increases the change in momentum', 'increases the time over which momentum changes, so the force is smaller', 'decreases the mass of the car', 'makes the car stop instantly'], 1, r`$F = \Delta p/\Delta t$: the same $\Delta p$ over a longer time gives a smaller force.`, 'extended'),
  num('momentum', 1, 2, 'Calculate the momentum of a 1500 kg car travelling at 20 m/s, in kg m/s.', 30000, 0.01, 'kg m/s', r`$p = mv = 1500 \times 20 = 30\,000$.`),
  num('momentum', 2, 3, 'A 2.0 kg trolley moving at 3.0 m/s collides with a stationary 1.0 kg trolley and they stick together. Find their common speed in m/s.', 2, 0.01, 'm/s', r`$2 \times 3 = 3v$, so $v = 2.0\ \text{m/s}$.`),
  num('momentum', 2, 2, 'A 0.16 kg football is kicked from rest to 25 m/s. The contact time is 0.020 s. Find the average force in N.', 200, 0.01, 'N', r`$F = \Delta p/\Delta t = (0.16 \times 25)/0.02 = 200\ \text{N}$.`, 'extended'),
  num('momentum', 3, 3, 'A 0.50 kg ball moving at 4.0 m/s hits a stationary 1.5 kg ball. The first ball rebounds at 2.0 m/s in the opposite direction. Find the speed of the second ball in m/s.', 2, 0.01, 'm/s', r`$0.5 \times 4 = 0.5 \times (-2) + 1.5v$, so $2 = -1 + 1.5v$ and $v = 2.0\ \text{m/s}$.`),
  num('momentum', 2, 3, 'A rifle of mass 4.0 kg fires a 0.020 kg bullet at 400 m/s. Find the recoil speed of the rifle in m/s.', 2, 0.01, 'm/s', r`Momentum before = 0. $4.0v = 0.020 \times 400 = 8$, so $v = 2.0\ \text{m/s}$.`),
  wr('momentum', 2, 'State the principle of conservation of momentum. [2]', [
    'The total momentum before a collision/explosion equals the total momentum after (1)',
    'provided no external (resultant) force acts on the system (1)',
  ]),
  wr('momentum', 2, 'Two trolleys at rest are pushed apart by a spring. The 2.0 kg trolley moves left at 3.0 m/s. The other trolley has mass 3.0 kg. Find its speed and direction. [3]', [
    'Total momentum before = 0, so the momenta after are equal and opposite (1)',
    '2.0 × 3.0 = 3.0 × v (1)',
    'v = 2.0 m/s to the right (1)',
  ]),
  wr('momentum', 3, 'Explain how an air bag reduces the injury to a driver in a collision. [3]', [
    'The air bag increases the time taken for the driver\'s momentum to change to zero (1)',
    'Force = change in momentum ÷ time (1)',
    'So the average force on the driver is smaller (1)',
  ], undefined, 'extended'),

  // ---------------------------------------------------------------- 1.7 energy, work and power
  mcq('energy-work-power', 1, 'What is the unit of power?', ['Joule', 'Newton', 'Watt', 'Pascal'], 2, 'Power is measured in watts. 1 W = 1 J/s.'),
  mcq('energy-work-power', 1, 'In which store is energy held by a stretched spring?', ['Kinetic', 'Elastic (strain)', 'Chemical', 'Nuclear'], 1, 'A stretched or compressed spring stores elastic (strain) energy.'),
  mcq('energy-work-power', 2, 'The speed of an object doubles. Its kinetic energy:', ['doubles', 'quadruples', 'halves', 'stays the same'], 1, r`$E_k = \tfrac12 mv^2$, so doubling $v$ multiplies $E_k$ by 4.`),
  mcq('energy-work-power', 2, 'Which expression gives the gravitational potential energy gained by lifting a mass?', [r`$\tfrac12 mv^2$`, r`$mgh$`, r`$Fd/t$`, r`$m/V$`], 1, r`$E_p = mgh$.`),
  num('energy-work-power', 1, 2, 'Calculate the gravitational potential energy gained by a 2.0 kg mass lifted through 3.0 m (g = 10 N/kg), in J.', 60, 0.01, 'J', r`$E_p = mgh = 2 \times 10 \times 3 = 60\ \text{J}$.`),
  num('energy-work-power', 2, 2, 'Calculate the kinetic energy of a 1500 kg car travelling at 20 m/s, in J.', 300000, 0.01, 'J', r`$E_k = \tfrac12 mv^2 = 0.5 \times 1500 \times 400 = 300\,000\ \text{J}$.`),
  num('energy-work-power', 2, 2, 'A motor lifts a 50 kg load through 4.0 m in 10 s. Calculate the power output in W. (g = 10 N/kg)', 200, 0.01, 'W', r`$E = mgh = 50 \times 10 \times 4 = 2000\ \text{J}$, so $P = 2000/10 = 200\ \text{W}$.`),
  num('energy-work-power', 1, 2, 'A force of 120 N moves an object 5.0 m in the direction of the force. Calculate the work done in J.', 600, 0.01, 'J', r`$W = Fd = 120 \times 5 = 600\ \text{J}$.`),
  num('energy-work-power', 3, 3, 'A ball is dropped from a height of 20 m. Ignoring air resistance, find its speed just before it hits the ground in m/s. (g = 10 N/kg)', 20, 0.01, 'm/s', r`$mgh = \tfrac12 mv^2$, so $v = \sqrt{2gh} = \sqrt{400} = 20\ \text{m/s}$.`),
  num('energy-work-power', 2, 2, 'A machine takes in 800 J of energy and does 600 J of useful work. Calculate its efficiency as a percentage.', 75, 0.01, '%', r`$600/800 \times 100 = 75\%$.`),
  wr('energy-work-power', 2, 'A ball is dropped and bounces back to a lower height. Describe the energy transfers and explain why it does not return to its original height. [4]', [
    'Gravitational potential energy is transferred to kinetic energy as it falls (1)',
    'Kinetic energy is transferred to elastic energy as the ball is squashed, then back to kinetic energy (1)',
    'Kinetic energy is transferred back to gravitational potential energy as it rises (1)',
    'Some energy is dissipated as thermal energy and sound at the bounce, so it reaches a lower height (1)',
  ]),
  wr('energy-work-power', 3, 'A machine takes in 800 J of energy and does 600 J of useful work.\n\n(a) Calculate its efficiency. [2]\n\n(b) State what happens to the remaining energy. [1]', [
    'Efficiency = useful output ÷ total input × 100 (1)',
    '600 ÷ 800 × 100 = 75% (1)',
    'The remaining energy is wasted as thermal energy to the surroundings (1)',
  ]),
  wr('energy-work-power', 2, 'Describe what a Sankey diagram shows. [2]', [
    'The energy transfers in a system / how energy is shared between useful and wasted outputs (1)',
    'The width of each arrow is proportional to the amount of energy (1)',
  ]),

  // ---------------------------------------------------------------- 1.7 energy resources
  mcq('energy-resources', 1, 'Which of these is a non-renewable energy resource?', ['Wind', 'Solar', 'Natural gas', 'Tidal'], 2, 'Natural gas is a fossil fuel; it is used faster than it forms.'),
  mcq('energy-resources', 1, 'In nuclear fission:', ['light nuclei join together', 'a heavy nucleus splits into smaller nuclei', 'electrons move in a wire', 'water turns to steam only'], 1, 'Fission is the splitting of a large nucleus such as uranium-235.'),
  mcq('energy-resources', 2, 'What process produces the energy radiated by the Sun?', ['Chemical burning', 'Nuclear fission', 'Nuclear fusion', 'Friction'], 2, 'Hydrogen nuclei fuse into helium in the Sun\'s core.'),
  mcq('energy-resources', 2, 'Which disadvantage applies to wind power?', ['It produces carbon dioxide', 'It only works when it is windy', 'It needs fuel', 'It produces radioactive waste'], 1, 'Wind turbines depend on the wind blowing.'),
  mcq('energy-resources', 2, 'Which energy resource does **not** ultimately depend on the Sun?', ['Wind', 'Biofuel', 'Geothermal', 'Hydroelectric'], 2, 'Geothermal energy comes from heat inside the Earth. Wind, biofuels and rain-fed hydroelectric power all rely on the Sun.'),
  num('energy-resources', 2, 2, 'A power station takes in 2000 MJ of energy from fuel and gives 700 MJ of electrical energy. Calculate its efficiency as a percentage.', 35, 0.01, '%', r`$700/2000 \times 100 = 35\%$.`),
  num('energy-resources', 3, 3, 'Water of mass 5.0 × 10⁶ kg falls through a height of 40 m in a hydroelectric scheme. Calculate the gravitational potential energy released in J. (g = 10 N/kg)', 2000000000, 0.01, 'J', r`$E_p = mgh = 5.0\times10^6 \times 10 \times 40 = 2.0\times10^9\ \text{J}$.`),
  wr('energy-resources', 1, 'Explain the difference between a renewable and a non-renewable energy resource. Give one example of each. [3]', [
    'A renewable resource is replaced as quickly as it is used (will not run out) (1)',
    'A non-renewable resource is used faster than it forms and will run out (1)',
    'One correct example of each, e.g. wind and coal (1)',
  ]),
  wr('energy-resources', 2, 'Describe how electricity is generated in a coal-fired power station. [4]', [
    'Coal is burned (chemical energy transferred to thermal energy) (1)',
    'This heats water to produce steam (1)',
    'The steam turns a turbine (1)',
    'The turbine drives a generator which produces electricity (1)',
  ]),
  wr('energy-resources', 2, 'Give two advantages and two disadvantages of using nuclear fission to generate electricity. [4]', [
    'Advantage: no carbon dioxide produced / large energy from small mass of fuel (1)',
    'Advantage: reliable supply independent of weather (1)',
    'Disadvantage: radioactive waste that must be stored for a long time (1)',
    'Disadvantage: risk of accidents / high cost of building and decommissioning (1)',
  ]),

  // ---------------------------------------------------------------- 1.8 pressure
  mcq('pressure', 1, 'What is the SI unit of pressure?', ['Newton', 'Pascal', 'Joule', 'Watt'], 1, r`Pressure is force per area: $\text{N/m}^2$, called the pascal (Pa).`),
  mcq('pressure', 1, 'Which equation correctly gives pressure?', [r`$p = F \times A$`, r`$p = F/A$`, r`$p = A/F$`, r`$p = m/V$`], 1, r`$p = F/A$.`),
  mcq('pressure', 2, 'Why do skis help a skier stay on top of snow?', ['They increase the skier\'s weight', 'They spread the weight over a larger area, reducing the pressure', 'They reduce the skier\'s mass', 'They increase friction'], 1, 'The same force over a larger area gives less pressure, so the skier sinks less.'),
  mcq('pressure', 2, 'The pressure in a liquid at a certain depth:', ['acts only downwards', 'acts equally in all directions', 'is zero at all depths', 'decreases with depth'], 1, 'Liquid pressure increases with depth and acts equally in all directions at a given depth.'),
  num('pressure', 1, 2, r`A box weighing 240 N rests on an area of $0.12\ \text{m}^2$. Calculate the pressure in Pa.`, 2000, 0.01, 'Pa', r`$p = F/A = 240/0.12 = 2000\ \text{Pa}$.`),
  num('pressure', 2, 3, r`A girl of mass 50 kg stands on two shoes, each with area $0.020\ \text{m}^2$. Calculate the pressure on the ground in Pa. (g = 10 N/kg)`, 12500, 0.01, 'Pa', r`$F = 500\ \text{N}$, $A = 0.040\ \text{m}^2$, so $p = 500/0.040 = 12\,500\ \text{Pa}$.`),
  num('pressure', 2, 2, r`A pressure of 8000 Pa acts on an area of $0.50\ \text{m}^2$. Calculate the force in N.`, 4000, 0.01, 'N', r`$F = pA = 8000 \times 0.5 = 4000\ \text{N}$.`),
  num('pressure', 3, 3, r`A force of 600 N acts on an area of $30\ \text{cm}^2$. Calculate the pressure in Pa.`, 200000, 0.01, 'Pa', r`$30\ \text{cm}^2 = 0.0030\ \text{m}^2$, so $p = 600/0.0030 = 200\,000\ \text{Pa}$.`),
  num('pressure', 3, 3, r`Find the increase in pressure between the surface and a depth of 12 m in water of density $1000\ \text{kg/m}^3$, in Pa. (g = 10 N/kg)`, 120000, 0.01, 'Pa', r`$\Delta p = \rho g h = 1000 \times 10 \times 12 = 120\,000\ \text{Pa}$.`, 'extended'),
  wr('pressure', 1, 'Explain why a sharp knife cuts better than a blunt one. [2]', [
    'The sharp edge has a much smaller area (1)',
    'So the same force produces a greater pressure (1)',
  ]),
  wr('pressure', 2, 'Explain why the wall of a dam is thicker at the bottom than at the top. [3]', [
    'Pressure in a liquid increases with depth (1)',
    'So the force on the wall is greater at the bottom (1)',
    'A thicker wall is needed at the bottom to withstand the greater pressure (1)',
  ]),
  wr('pressure', 3, r`In a hydraulic system a force of 100 N acts on a small piston of area $0.0020\ \text{m}^2$. The large piston has area $0.050\ \text{m}^2$. Calculate the force on the large piston. [3]`, [
    'Pressure = 100 ÷ 0.0020 = 50 000 Pa (1)',
    'The pressure is transmitted equally through the liquid (1)',
    'Force = 50 000 × 0.050 = 2500 N (1)',
  ], undefined, 'extended'),
]
