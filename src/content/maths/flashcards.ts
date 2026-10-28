import { cardFactory, r } from '../helpers'

const N = cardFactory('maths', 'number')
const A = cardFactory('maths', 'algebra')
const C = cardFactory('maths', 'coordinate')
const G = cardFactory('maths', 'geometry')
const M = cardFactory('maths', 'mensuration')
const T = cardFactory('maths', 'trigonometry')
const X = cardFactory('maths', 'transformations')
const P = cardFactory('maths', 'probability')
const S = cardFactory('maths', 'statistics')

export const mathsCards = [
  // ---- number: sets
  N('sets', 'What is a **prime number**?', 'A number with exactly two factors: 1 and itself. (1 is not prime; 2 is the only even prime.)'),
  N('sets', 'How do you find the **HCF** and **LCM** from prime factors?', 'HCF: lowest powers of common primes. LCM: highest powers of all primes.'),
  N('sets', r`What do $A \cup B$ and $A \cap B$ mean?`, 'Union: in A or B (or both). Intersection: in both A and B.'),
  N('sets', r`What does $A'$ mean?`, r`The complement: all elements of $\xi$ that are **not** in $A$.`),
  N('sets', r`Formula for $n(A \cup B)$.`, r`$n(A) + n(B) - n(A \cap B)$`),
  N('sets', 'What is an **irrational** number?', r`One that cannot be written as a fraction, e.g. $\pi$, $\sqrt2$. Its decimal never ends or repeats.`),
  N('sets', 'In a Venn diagram, which region do you fill in **first**?', 'The overlap (intersection).'),

  // ---- number: fractions, ratio
  N('fractions-ratio', 'How do you **divide** by a fraction?', 'Multiply by its reciprocal (flip it).'),
  N('fractions-ratio', 'How do you **share** an amount in a ratio?', 'Add the parts, find one part, multiply by each ratio number.'),
  N('fractions-ratio', 'Direct proportion equation?', r`$y = kx$ (double one, double the other)`),
  N('fractions-ratio', 'Inverse proportion equation?', r`$y = \dfrac{k}{x}$ (double one, halve the other)`),
  N('fractions-ratio', 'How do you find the **best buy**?', 'Compare the cost per unit (e.g. price per gram).'),
  N('fractions-ratio', r`Convert $0.\dot{3}\dot{6}$ to a fraction.`, r`$100x - x = 36$, so $x = \tfrac{36}{99} = \tfrac{4}{11}$`),
  N('fractions-ratio', 'What does a map scale of **1 : 50 000** mean?', '1 cm on the map is 50 000 cm (500 m) in real life.'),

  // ---- number: percentages
  N('percentages', 'Multiplier for a **12% increase**?', '1.12'),
  N('percentages', 'Multiplier for a **12% decrease**?', '0.88'),
  N('percentages', 'Formula for **percentage change**.', r`$\dfrac{\text{change}}{\text{original}} \times 100\%$`),
  N('percentages', 'How do you do a **reverse percentage**?', 'Divide the final amount by the multiplier.'),
  N('percentages', 'Compound interest formula.', r`$A = P\left(1 + \dfrac{r}{100}\right)^n$`),
  N('percentages', 'What is **exponential growth/decay**?', r`Repeated multiplication by the same factor: $\text{start} \times \text{multiplier}^n$.`),

  // ---- number: indices, standard form
  N('indices-standard-form', 'Index laws for **multiplying** and **dividing** powers.', r`$a^m \times a^n = a^{m+n}$ and $a^m \div a^n = a^{m-n}$`),
  N('indices-standard-form', r`$(a^m)^n =$`, r`$a^{mn}$`),
  N('indices-standard-form', r`$a^0 =$ and $a^{-n} =$`, r`$1$ and $\dfrac{1}{a^n}$`),
  N('indices-standard-form', r`$a^{1/2}$ and $a^{m/n}$?`, r`$\sqrt{a}$ and $\left(\sqrt[n]{a}\right)^m$`),
  N('indices-standard-form', 'What makes a number **standard form**?', r`$a \times 10^n$ with $1 \le a < 10$ and $n$ an integer.`),
  N('indices-standard-form', 'How do you simplify a **surd**?', r`Use square factors: $\sqrt{50} = \sqrt{25}\sqrt{2} = 5\sqrt2$`),
  N('indices-standard-form', 'How do you **rationalise** $\\frac{a}{\\sqrt{b}}$?', r`Multiply top and bottom by $\sqrt b$.`),

  // ---- number: accuracy
  N('accuracy-estimation', 'How do you **estimate** a calculation?', 'Round each number to 1 significant figure, then calculate.'),
  N('accuracy-estimation', 'Bounds of a value rounded to the **nearest 10**?', 'Half a unit (5) below and above, e.g. 70 gives 65 ≤ x < 75.'),
  N('accuracy-estimation', 'Upper bound of $a \\div b$?', r`upper $a$ ÷ lower $b$`),
  N('accuracy-estimation', 'Formula for **percentage error**.', r`$\dfrac{\text{error}}{\text{true value}} \times 100\%$`),
  N('accuracy-estimation', 'Rule for **rounding**?', 'Look at the next digit: 5 or more rounds up; 4 or less stays the same.'),
  N('accuracy-estimation', 'Accuracy normally required in final answers?', '3 significant figures (angles: 1 decimal place).'),

  // ---- algebra: manipulation
  A('algebraic-manipulation', r`Expand $(x+a)(x+b)$.`, r`$x^2 + (a+b)x + ab$`),
  A('algebraic-manipulation', 'Difference of two squares.', r`$a^2 - b^2 = (a-b)(a+b)$`),
  A('algebraic-manipulation', r`Factorise $x^2 + bx + c$.`, r`Find two numbers that multiply to $c$ and add to $b$.`),
  A('algebraic-manipulation', 'How do you simplify an **algebraic fraction**?', 'Factorise numerator and denominator, then cancel common factors (not terms).'),
  A('algebraic-manipulation', 'How do you **change the subject**?', 'Do the same to both sides, undoing operations in reverse order.'),
  A('algebraic-manipulation', r`Expand $(x + 4)^2$.`, r`$x^2 + 8x + 16$ (not $x^2 + 16$)`),

  // ---- algebra: equations & inequalities
  A('equations-inequalities', 'What changes the direction of an inequality sign?', 'Multiplying or dividing both sides by a negative number.'),
  A('equations-inequalities', 'Open vs closed circle on a number line?', 'Open: < or > (not included). Closed: ≤ or ≥ (included).'),
  A('equations-inequalities', 'How do you solve equations with **fractions**?', 'Multiply every term by the common denominator.'),
  A('equations-inequalities', 'Steps to **form an equation**?', 'Let x be the unknown, write expressions, set equal, solve, check in the wording.'),
  A('equations-inequalities', r`What does $-2 < x \le 4$ mean?`, r`$x$ is greater than $-2$ and at most $4$.`),

  // ---- algebra: simultaneous
  A('simultaneous-equations', 'Graphical meaning of the solution of two simultaneous equations?', 'The coordinates of the point where the two lines intersect.'),
  A('simultaneous-equations', 'When to **add** vs **subtract** in elimination?', 'Add if the signs of the matched terms are different; subtract if the same.'),
  A('simultaneous-equations', 'When is **substitution** easiest?', 'When one equation already has a letter on its own, e.g. y = 2x − 1.'),
  A('simultaneous-equations', 'How do you check your answers?', 'Substitute into the equation you did not use.'),

  // ---- algebra: quadratics
  A('quadratics', 'The **quadratic formula**.', r`$x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`),
  A('quadratics', 'What is the **discriminant**?', r`$b^2 - 4ac$`),
  A('quadratics', r`Discriminant $< 0$ means…`, 'No real roots.'),
  A('quadratics', r`Discriminant $= 0$ means…`, 'One repeated root.'),
  A('quadratics', r`First step to solve $x^2 = 3x + 4$?`, r`Rearrange to zero: $x^2 - 3x - 4 = 0$.`),

  // ---- algebra: sequences
  A('sequences', 'nth term of a **linear sequence**?', r`$dn + (a - d)$, where $d$ is the common difference and $a$ the first term.`),
  A('sequences', 'What is a **geometric sequence**?', r`Each term is multiplied by a common ratio $r$: $T_n = a r^{n-1}$.`),
  A('sequences', 'nth term of **triangular numbers**.', r`$\tfrac12 n(n+1)$`),
  A('sequences', 'How do you find a **quadratic** nth term?', r`Second difference is constant; the $n^2$ coefficient is half of it. Subtract $an^2$ and fit the rest.`),
  A('sequences', 'Is a number in a sequence?', 'Set the nth term equal to it and solve; n must be a positive whole number.'),

  // ---- algebra: graphs & functions
  A('graphs-functions', 'Shape of $y = ax^2 + bx + c$ with $a > 0$?', 'U-shaped parabola with a minimum point.'),
  A('graphs-functions', 'What is an **asymptote**?', 'A line a curve approaches but never reaches (e.g. the axes for $y = 1/x$).'),
  A('graphs-functions', 'Solutions of $f(x) = g(x)$ on a graph?', 'The x-coordinates where the two graphs intersect.'),
  A('graphs-functions', r`What does $fg(x)$ mean?`, r`Do $g$ first, then $f$.`),
  A('graphs-functions', 'How do you find an **inverse function**?', 'Write y = f(x), swap x and y, rearrange for y.'),
  A('graphs-functions', 'A graph looks wrong on the GDC. What should you check?', 'The window (x and y ranges).'),

  // ---- algebra: differentiation
  A('differentiation', r`Derivative of $ax^n$.`, r`$a n x^{n-1}$`),
  A('differentiation', 'What does $dy/dx$ give?', 'The gradient of the curve at that point (rate of change).'),
  A('differentiation', 'How do you find **stationary points**?', r`Solve $\dfrac{dy}{dx} = 0$.`),
  A('differentiation', 'How do you tell a maximum from a minimum?', r`$\dfrac{d^2y}{dx^2}$: positive is a minimum, negative is a maximum.`),
  A('differentiation', 'Gradient of the **normal**?', r`$-\dfrac{1}{m}$, where $m$ is the tangent gradient.`),

  // ---- coordinate geometry
  C('straight-lines', 'Gradient formula.', r`$m = \dfrac{y_2 - y_1}{x_2 - x_1}$`),
  C('straight-lines', 'Equation of a straight line.', r`$y = mx + c$ ($m$ gradient, $c$ $y$-intercept)`),
  C('straight-lines', 'Midpoint formula.', r`$\left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}\right)$`),
  C('straight-lines', 'Length of a line segment.', r`$\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$`),
  C('straight-lines', 'Parallel lines: gradients?', 'Equal.'),
  C('straight-lines', 'Perpendicular lines: gradients?', r`$m_1 \times m_2 = -1$`),

  // ---- geometry
  G('angles-polygons', 'Sum of **interior angles** of an n-sided polygon?', r`$(n-2) \times 180^\circ$`),
  G('angles-polygons', 'Exterior angle of a **regular** polygon?', r`$\dfrac{360^\circ}{n}$`),
  G('angles-polygons', 'Corresponding, alternate and co-interior angles?', 'Corresponding: equal (F). Alternate: equal (Z). Co-interior: add to 180° (C).'),
  G('angles-polygons', 'Angles in a triangle / quadrilateral add to…', '180° / 360°'),
  G('angles-polygons', 'Angles on a straight line / around a point?', '180° / 360°'),
  G('circle-theorems', 'Angle in a **semicircle**.', '90°'),
  G('circle-theorems', 'Angle at the **centre** vs circumference.', 'The angle at the centre is twice the angle at the circumference (same arc).'),
  G('circle-theorems', 'Angles in the **same segment**.', 'Equal.'),
  G('circle-theorems', 'Opposite angles of a **cyclic quadrilateral**.', 'Add to 180°.'),
  G('circle-theorems', 'Tangent and radius?', 'A tangent is perpendicular to the radius at the point of contact.'),
  G('circle-theorems', '**Alternate segment** theorem.', 'The angle between a tangent and a chord equals the angle in the alternate segment.'),
  G('similarity-congruence', 'Four conditions for **congruent triangles**.', 'SSS, SAS, ASA (or AAS), RHS.'),
  G('similarity-congruence', 'Length scale factor $k$: area and volume factors?', r`Area $k^2$, volume $k^3$.`),
  G('similarity-congruence', 'Does AAA prove congruence?', 'No: it proves similarity only.'),
  G('similarity-congruence', 'Area ratio 4 : 9. Length ratio?', '2 : 3 (square root).'),

  // ---- mensuration
  M('area-volume', 'Area of a **circle** and **circumference**.', r`$\pi r^2$ and $2\pi r$`),
  M('area-volume', '**Arc length** and **sector area**.', r`$\dfrac{\theta}{360} \times 2\pi r$ and $\dfrac{\theta}{360} \times \pi r^2$`),
  M('area-volume', 'Volume of a **cylinder**; curved surface area.', r`$\pi r^2 h$; $2\pi r h$`),
  M('area-volume', 'Volume of a **cone**; curved surface area.', r`$\tfrac13 \pi r^2 h$; $\pi r l$`),
  M('area-volume', 'Volume and surface area of a **sphere**.', r`$\tfrac43 \pi r^3$; $4\pi r^2$`),
  M('area-volume', 'Volume of a **pyramid**.', r`$\tfrac13 \times \text{base area} \times h$`),
  M('area-volume', 'Slant height of a cone.', r`$l = \sqrt{r^2 + h^2}$`),
  M('area-volume', 'Area of a **trapezium**.', r`$\tfrac12 (a + b) h$`),

  // ---- trigonometry
  T('right-angled-trig', 'SOH CAH TOA: what is **SOH**?', r`$\sin\theta = \dfrac{\text{opp}}{\text{hyp}}$`),
  T('right-angled-trig', 'SOH CAH TOA: what is **CAH**?', r`$\cos\theta = \dfrac{\text{adj}}{\text{hyp}}$`),
  T('right-angled-trig', 'SOH CAH TOA: what is **TOA**?', r`$\tan\theta = \dfrac{\text{opp}}{\text{adj}}$`),
  T('right-angled-trig', "Pythagoras' theorem.", r`$a^2 + b^2 = c^2$, with $c$ the hypotenuse.`),
  T('right-angled-trig', 'What calculator mode must you check for trig?', 'Degrees (DEG), not radians.'),
  T('right-angled-trig', 'Angles of elevation and depression are measured from…', 'The horizontal.'),
  T('sine-cosine-rules', 'The **sine rule**.', r`$\dfrac{a}{\sin A} = \dfrac{b}{\sin B} = \dfrac{c}{\sin C}$`),
  T('sine-cosine-rules', 'The **cosine rule** (side).', r`$a^2 = b^2 + c^2 - 2bc\cos A$`),
  T('sine-cosine-rules', 'The **cosine rule** (angle).', r`$\cos A = \dfrac{b^2 + c^2 - a^2}{2bc}$`),
  T('sine-cosine-rules', 'Area of a triangle using an angle.', r`$\tfrac12 ab \sin C$`),
  T('sine-cosine-rules', 'When do you use the **sine rule**?', 'When you have a side and its opposite angle (a matching pair).'),
  T('sine-cosine-rules', 'What is a **bearing**?', 'An angle measured clockwise from north, written with 3 digits (e.g. 045°).'),

  // ---- transformations & vectors
  X('transformations', 'What must you give to describe a **reflection**?', 'The mirror line.'),
  X('transformations', 'What must you give to describe a **rotation**?', 'Angle, direction (clockwise/anticlockwise) and centre.'),
  X('transformations', 'What must you give to describe a **translation**?', 'A column vector.'),
  X('transformations', 'What must you give to describe an **enlargement**?', 'Scale factor and centre.'),
  X('transformations', 'Which transformations keep a shape **congruent**?', 'Reflection, rotation, translation (not enlargement).'),
  X('transformations', 'Effect of a **negative scale factor**?', 'The image is on the opposite side of the centre and inverted.'),
  X('vectors', 'How do you find $\\overrightarrow{AB}$ from coordinates?', 'End minus start: (x₂ − x₁, y₂ − y₁).'),
  X('vectors', 'Magnitude of a vector.', r`$\sqrt{x^2 + y^2}$`),
  X('vectors', 'Midpoint of $AB$ using position vectors.', r`$\tfrac12(\mathbf{a} + \mathbf{b})$`),
  X('vectors', 'How do you show two vectors are **parallel**?', 'One is a scalar multiple of the other.'),
  X('vectors', r`$\overrightarrow{AB}$ in terms of $\mathbf a$ and $\mathbf b$?`, r`$\mathbf{b} - \mathbf{a}$`),

  // ---- probability
  P('probability', 'Basic probability formula.', r`$\dfrac{\text{favourable outcomes}}{\text{total outcomes}}$`),
  P('probability', 'Range of probabilities.', '0 (impossible) to 1 (certain).'),
  P('probability', 'Probability of **not** A.', r`$1 - P(A)$`),
  P('probability', 'Independent events: P(A and B).', r`$P(A) \times P(B)$`),
  P('probability', 'Mutually exclusive events: P(A or B).', r`$P(A) + P(B)$`),
  P('probability', 'What is **relative frequency**?', 'Number of successes ÷ number of trials; an experimental estimate of probability.'),
  P('probability', 'Without replacement: what changes?', 'The total and the number of the chosen colour both go down by 1.'),

  // ---- statistics
  S('averages-charts', 'Define **mean**, **median**, **mode**, **range**.', 'Mean: sum ÷ count. Median: middle value. Mode: most common. Range: largest − smallest.'),
  S('averages-charts', 'Mean from a **frequency table**.', r`$\dfrac{\sum fx}{\sum f}$`),
  S('averages-charts', 'For **grouped data**, which value of x do you use?', 'The class midpoint (the mean is an estimate).'),
  S('averages-charts', 'Pie chart angle.', r`$\dfrac{\text{frequency}}{\text{total}} \times 360^\circ$`),
  S('averages-charts', 'Types of **correlation**.', 'Positive, negative, none. A line of best fit estimates values within the range.'),
  S('averages-charts', 'Frequency density (histogram).', r`$\dfrac{\text{frequency}}{\text{class width}}$`),
  S('cumulative-frequency', 'Plot cumulative frequency against…', 'The upper class boundary.'),
  S('cumulative-frequency', 'Where are $Q_1$, median and $Q_3$ read?', r`At $\tfrac14 N$, $\tfrac12 N$, $\tfrac34 N$ on the cumulative frequency axis.`),
  S('cumulative-frequency', 'Interquartile range.', r`$Q_3 - Q_1$ (spread of the middle 50%)`),
  S('cumulative-frequency', 'Five values on a **box plot**.', 'Minimum, lower quartile, median, upper quartile, maximum.'),
  S('cumulative-frequency', 'How to **compare** two distributions?', 'Comment on an average (median) and on the spread (IQR/range), in context.'),
]
