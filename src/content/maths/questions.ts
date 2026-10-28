import { questionFactory, r } from '../helpers'

const N = questionFactory('maths', 'number')
const A = questionFactory('maths', 'algebra')
const C = questionFactory('maths', 'coordinate')
const G = questionFactory('maths', 'geometry')
const M = questionFactory('maths', 'mensuration')
const T = questionFactory('maths', 'trigonometry')
const X = questionFactory('maths', 'transformations')
const P = questionFactory('maths', 'probability')
const S = questionFactory('maths', 'statistics')

export const mathsQuestions = [
  // ================================================================== NUMBER
  // ---- sets and types of number
  N.mcq('sets', 1, 'Which of these is a prime number?', ['1', '9', '13', '15'], 2, '13 has exactly two factors: 1 and 13. 1 is not prime; 9 and 15 have other factors.'),
  N.mcq('sets', 2, 'What is the highest common factor (HCF) of 36 and 48?', ['6', '12', '24', '144'], 1, r`$36 = 2^2 \times 3^2$, $48 = 2^4 \times 3$. HCF uses the lowest powers: $2^2 \times 3 = 12$.`),
  N.mcq('sets', 1, r`In set notation, $A \cap B$ means:`, ['elements in A or B', 'elements in both A and B', 'elements not in A', 'the empty set'], 1, 'The intersection contains elements that are in **both** sets.'),
  N.num('sets', 2, 2, 'Find the lowest common multiple (LCM) of 12 and 18.', 36, 0.001, undefined, r`$12 = 2^2\times3$, $18 = 2\times3^2$. LCM $= 2^2\times 3^2 = 36$.`),
  N.num('sets', 2, 3, 'In a class of 30, 18 play football, 12 play tennis and 5 play both. How many play neither?', 5, 0.001, undefined, r`At least one: $18 + 12 - 5 = 25$. Neither $= 30 - 25 = 5$.`),
  N.wr('sets', 1, 'Write 60 as a product of its prime factors. [3]', [
    'Divides by prime numbers (e.g. a factor tree) (1)',
    '2 × 2 × 3 × 5 (1)',
    '2² × 3 × 5 (1)',
  ]),
  N.wr('sets', 2, 'In a group of 40 students, 25 study French, 20 study Spanish and 8 study both. How many study neither language? [3]', [
    'n(F ∪ S) = 25 + 20 − 8 (1)',
    '= 37 (1)',
    'Neither = 40 − 37 = 3 (1)',
  ]),

  // ---- fractions, ratio, proportion
  N.mcq('fractions-ratio', 1, 'Write the ratio 24 : 36 in its simplest form.', ['2 : 3', '3 : 4', '4 : 6', '12 : 18'], 0, 'Divide both by the HCF, 12: 24 ÷ 12 = 2 and 36 ÷ 12 = 3.'),
  N.mcq('fractions-ratio', 2, r`Work out $\tfrac23 \div \tfrac45$.`, [r`$\tfrac{8}{15}$`, r`$\tfrac56$`, r`$\tfrac{6}{5}$`, r`$\tfrac{10}{3}$`], 1, r`Multiply by the reciprocal: $\tfrac23 \times \tfrac54 = \tfrac{10}{12} = \tfrac56$.`),
  N.mcq('fractions-ratio', 2, r`$y$ is inversely proportional to $x$. When $x = 4$, $y = 6$. What is $y$ when $x = 12$?`, ['2', '18', '3', '8'], 0, r`$y = k/x$ with $k = 24$, so $y = 24/12 = 2$.`),
  N.num('fractions-ratio', 1, 2, 'Share 120 in the ratio 3 : 5. Find the larger share.', 75, 0.001, undefined, 'Total parts = 8, one part = 15, larger share = 5 × 15 = 75.'),
  N.num('fractions-ratio', 2, 2, r`Work out $\tfrac25 \times \tfrac34$ as a decimal.`, 0.3, 0.001, undefined, r`$\tfrac{6}{20} = \tfrac{3}{10} = 0.3$.`),
  N.num('fractions-ratio', 2, 3, 'A map has scale 1 : 50 000. Two towns are 4.2 cm apart on the map. Find the real distance in km.', 2.1, 0.005, 'km', r`$4.2 \times 50\,000 = 210\,000\ \text{cm} = 2100\ \text{m} = 2.1\ \text{km}$.`),
  N.wr('fractions-ratio', 1, 'A recipe uses flour and sugar in the ratio 5 : 2. There is 350 g of flour. How much sugar is needed? [2]', [
    '350 ÷ 5 = 70 (1)',
    '70 × 2 = 140 g (1)',
  ]),
  N.wr('fractions-ratio', 3, r`Write the recurring decimal $0.\dot{3}\dot{6}$ as a fraction in its simplest form. [3]`, [
    'Let x = 0.3636… so 100x = 36.3636… (1)',
    '99x = 36 (1)',
    'x = 36/99 = 4/11 (1)',
  ], undefined, 'extended'),

  // ---- percentages
  N.mcq('percentages', 1, 'Which multiplier increases an amount by 8%?', ['0.08', '0.92', '1.8', '1.08'], 3, 'Increase by 8% means 100% + 8% = 108% = 1.08.'),
  N.num('percentages', 1, 1, 'Find 18% of 250.', 45, 0.001, undefined, r`$0.18 \times 250 = 45$.`),
  N.num('percentages', 2, 2, 'The price of a jacket is 68 dollars after a 15% discount. Find the original price in dollars.', 80, 0.005, 'dollars', r`68 is 85% of the original: $68 \div 0.85 = 80$.`),
  N.num('percentages', 2, 2, 'A price rises from 40 to 52. Find the percentage increase.', 30, 0.005, '%', r`$\dfrac{12}{40} \times 100 = 30\%$.`),
  N.num('percentages', 3, 3, '2000 dollars is invested at 4% compound interest per year. Find the value after 3 years, to the nearest cent.', 2249.73, 0.001, 'dollars', r`$2000 \times 1.04^3 = 2249.728$, so 2249.73.`, 'extended'),
  N.num('percentages', 3, 3, 'A car worth 15 000 loses 12% of its value each year. Find its value after 2 years.', 11616, 0.002, undefined, r`$15\,000 \times 0.88^2 = 11\,616$.`, 'extended'),
  N.wr('percentages', 2, 'A television costs 480 dollars after a 20% reduction. Calculate the original price. [3]', [
    '480 represents 80% of the original price (1)',
    '480 ÷ 0.8 (1)',
    '600 dollars (1)',
  ]),

  // ---- indices & standard form
  N.mcq('indices-standard-form', 1, r`Simplify $2^3 \times 2^4$.`, [r`$2^7$`, r`$4^7$`, r`$2^{12}$`, r`$4^{12}$`], 0, 'When multiplying powers of the same base, add the indices.'),
  N.mcq('indices-standard-form', 1, 'Write 45 000 in standard form.', [r`$4.5 \times 10^3$`, r`$4.5 \times 10^4$`, r`$45 \times 10^3$`, r`$0.45 \times 10^5$`], 1, r`$a \times 10^n$ with $1 \le a < 10$: $4.5 \times 10^4$.`),
  N.mcq('indices-standard-form', 2, r`What is $5^{-2}$?`, [r`$-25$`, r`$-10$`, r`$\tfrac{1}{25}$`, r`$\tfrac{1}{10}$`], 2, r`$a^{-n} = 1/a^n$, so $5^{-2} = 1/25$.`),
  N.num('indices-standard-form', 2, 2, r`Work out $(3 \times 10^5) \times (2 \times 10^{-2})$ as an ordinary number.`, 6000, 0.001, undefined, r`$6 \times 10^3 = 6000$.`),
  N.num('indices-standard-form', 3, 2, r`Work out $27^{2/3}$.`, 9, 0.001, undefined, r`$(\sqrt[3]{27})^2 = 3^2 = 9$.`, 'extended'),
  N.num('indices-standard-form', 3, 2, r`Work out $16^{-1/2}$ as a decimal.`, 0.25, 0.001, undefined, r`$16^{-1/2} = 1/\sqrt{16} = 1/4 = 0.25$.`, 'extended'),
  N.wr('indices-standard-form', 2, r`Write $\sqrt{50}$ in the form $a\sqrt{2}$. [2]`, [
    '√50 = √(25 × 2) (1)',
    '5√2 (1)',
  ], undefined, 'extended'),
  N.wr('indices-standard-form', 3, r`Rationalise the denominator of $\dfrac{6}{\sqrt{3}}$, giving your answer in the form $a\sqrt{3}$. [2]`, [
    'Multiply numerator and denominator by √3 (1)',
    '6√3 ÷ 3 = 2√3 (1)',
  ], undefined, 'extended'),

  // ---- accuracy & estimation
  N.mcq('accuracy-estimation', 1, 'Round 0.004376 to 2 significant figures.', ['0.0043', '0.0044', '0.004', '0.44'], 1, 'The first significant figure is 4 (after the leading zeros). Round 0.004376 → 0.0044.'),
  N.mcq('accuracy-estimation', 2, 'A length is 12 cm to the nearest cm. What is its lower bound?', ['11 cm', '11.5 cm', '11.9 cm', '12 cm'], 1, 'Half a unit below: 12 − 0.5 = 11.5 cm.'),
  N.mcq('accuracy-estimation', 2, r`Which is the best estimate of $\dfrac{48.7 \times 3.2}{0.51}$?`, ['30', '300', '3000', '0.3'], 1, r`$\dfrac{50 \times 3}{0.5} = 300$.`),
  N.num('accuracy-estimation', 1, 1, 'Round 52 380 to 3 significant figures.', 52400, 0.0005, undefined, 'The third significant figure is 3; the next digit is 8 so round up: 52 400.'),
  N.num('accuracy-estimation', 3, 3, 'A rectangle has length 8.4 cm and width 5.2 cm, both given to 1 decimal place. Find the upper bound of its area in cm², to 2 decimal places.', 44.36, 0.001, 'cm²', r`$8.45 \times 5.25 = 44.3625$.`),
  N.num('accuracy-estimation', 2, 2, 'A length is measured as 4.9 cm. The true value is 5.0 cm. Find the percentage error.', 2, 0.01, '%', r`$\dfrac{0.1}{5.0} \times 100 = 2\%$.`),
  N.wr('accuracy-estimation', 3, 'A = 25 and B = 8, each rounded to the nearest whole number. Calculate the upper bound of A ÷ B. [3]', [
    'Upper bound of A = 25.5 (1)',
    'Lower bound of B = 7.5 (1)',
    '25.5 ÷ 7.5 = 3.4 (1)',
  ], undefined, 'extended'),

  // ================================================================== ALGEBRA
  // ---- algebraic manipulation
  A.mcq('algebraic-manipulation', 1, r`Expand and simplify $(x + 3)(x - 5)$.`, [r`$x^2 - 15$`, r`$x^2 - 2x - 15$`, r`$x^2 + 2x - 15$`, r`$x^2 - 8x - 15$`], 1, r`$x^2 - 5x + 3x - 15 = x^2 - 2x - 15$.`),
  A.mcq('algebraic-manipulation', 1, r`Factorise $x^2 - 49$.`, [r`$(x - 7)^2$`, r`$(x - 7)(x + 7)$`, r`$(x - 49)(x + 1)$`, r`$x(x - 49)$`], 1, 'Difference of two squares: a² − b² = (a − b)(a + b).'),
  A.mcq('algebraic-manipulation', 2, r`Make $x$ the subject of $y = 3x - 7$.`, [r`$x = 3y + 7$`, r`$x = \dfrac{y + 7}{3}$`, r`$x = \dfrac{y - 7}{3}$`, r`$x = 3(y - 7)$`], 1, r`Add 7 then divide by 3: $x = \dfrac{y + 7}{3}$.`),
  A.num('algebraic-manipulation', 1, 2, r`Find the value of $2a^2 - b$ when $a = 3$ and $b = -2$.`, 20, 0.001, undefined, r`$2(9) - (-2) = 18 + 2 = 20$.`),
  A.num('algebraic-manipulation', 1, 2, r`Find the value of $3(2x - 5)$ when $x = 4$.`, 9, 0.001, undefined, r`$3(8 - 5) = 3 \times 3 = 9$.`),
  A.wr('algebraic-manipulation', 1, r`Factorise $6x^2 + 9x$. [2]`, [
    'Common factor 3x identified (1)',
    '3x(2x + 3) (1)',
  ]),
  A.wr('algebraic-manipulation', 2, r`Factorise completely $2x^2 - 50$. [3]`, [
    'Takes out the common factor 2: 2(x² − 25) (1)',
    'Recognises difference of two squares (1)',
    '2(x − 5)(x + 5) (1)',
  ]),
  A.wr('algebraic-manipulation', 3, r`Simplify $\dfrac{x^2 - 9}{x^2 + 3x}$. [3]`, [
    'Factorises the numerator (x − 3)(x + 3) (1)',
    'Factorises the denominator x(x + 3) and cancels (x + 3) (1)',
    '(x − 3)/x (1)',
  ], undefined, 'extended'),

  // ---- equations & inequalities
  A.mcq('equations-inequalities', 1, r`Solve $5x - 7 = 18$.`, ['x = 2.2', 'x = 5', 'x = 25', 'x = 3'], 1, '5x = 25, so x = 5.'),
  A.mcq('equations-inequalities', 2, r`Solve $-2x < 10$.`, [r`$x < -5$`, r`$x > -5$`, r`$x < 5$`, r`$x > 5$`], 1, 'Dividing by −2 reverses the inequality sign: x > −5.'),
  A.mcq('equations-inequalities', 2, r`How many integers satisfy $-2 < x \le 4$?`, ['5', '6', '7', '4'], 1, 'They are −1, 0, 1, 2, 3, 4: six integers.'),
  A.num('equations-inequalities', 1, 2, r`Solve $7x + 2 = 3x + 18$.`, 4, 0.001, undefined, '4x = 16, so x = 4.'),
  A.num('equations-inequalities', 2, 2, r`Solve $\dfrac{x}{3} + \dfrac{x}{4} = 7$.`, 12, 0.001, undefined, 'Multiply by 12: 4x + 3x = 84, so x = 12.'),
  A.num('equations-inequalities', 2, 3, 'The sum of three consecutive whole numbers is 78. Find the smallest.', 25, 0.001, undefined, 'x + (x + 1) + (x + 2) = 78, so 3x = 75 and x = 25.'),
  A.wr('equations-inequalities', 2, r`Solve $\dfrac{2x + 1}{5} = x - 2$. [3]`, [
    'Multiplies both sides by 5: 2x + 1 = 5x − 10 (1)',
    '11 = 3x (1)',
    'x = 11/3 (1)',
  ]),
  A.wr('equations-inequalities', 2, r`Solve the inequality $3x - 4 \le 11$ and show the solution on a number line. [3]`, [
    '3x ≤ 15 (1)',
    'x ≤ 5 (1)',
    'Closed circle at 5 with an arrow pointing left (1)',
  ]),

  // ---- simultaneous equations
  A.mcq('simultaneous-equations', 1, r`Which pair $(x, y)$ satisfies both $x + y = 7$ and $x - y = 1$?`, ['(3, 4)', '(4, 3)', '(5, 2)', '(6, 1)'], 1, 'Adding: 2x = 8, x = 4, then y = 3.'),
  A.num('simultaneous-equations', 2, 2, r`Solve $2x + y = 11$ and $x - y = 1$. Find $x$.`, 4, 0.001, undefined, 'Add the equations: 3x = 12, x = 4.'),
  A.num('simultaneous-equations', 2, 2, r`Solve $3x + 2y = 16$ and $x - 2y = 0$. Find $y$.`, 2, 0.001, undefined, 'Add: 4x = 16, x = 4. Then 4 − 2y = 0 gives y = 2.'),
  A.num('simultaneous-equations', 2, 3, r`Solve $y = 2x - 1$ and $3x + y = 14$. Find $x$.`, 3, 0.001, undefined, 'Substitute: 3x + 2x − 1 = 14, so 5x = 15, x = 3.'),
  A.wr('simultaneous-equations', 2, r`Solve the simultaneous equations $3x + 2y = 16$ and $x - 2y = 0$. [4]`, [
    'Adds the equations to eliminate y: 4x = 16 (1)',
    'x = 4 (1)',
    'Substitutes: 4 − 2y = 0 (1)',
    'y = 2 (1)',
  ]),
  A.wr('simultaneous-equations', 3, 'Two adults and three children pay 31 for tickets. One adult and four children pay 29. Find the price of one adult ticket. [4]', [
    'Forms 2a + 3c = 31 (1)',
    'Forms a + 4c = 29 (1)',
    'Eliminates a to find c = 5.4 (1)',
    'a = 7.4 (1)',
  ]),
  A.wr('simultaneous-equations', 3, r`Solve $y = x + 2$ and $y = x^2$. [4]`, [
    'Substitutes: x² = x + 2 (1)',
    'x² − x − 2 = 0 (1)',
    '(x − 2)(x + 1) = 0 (1)',
    '(2, 4) and (−1, 1) (1)',
  ], undefined, 'extended'),

  // ---- quadratics
  A.mcq('quadratics', 1, r`Solve $x^2 + 5x + 6 = 0$.`, ['x = 2, 3', 'x = −2, −3', 'x = 1, 6', 'x = −1, −6'], 1, '(x + 2)(x + 3) = 0.'),
  A.mcq('quadratics', 3, r`How many real roots does $3x^2 - 2x + 5 = 0$ have?`, ['None', 'One', 'Two', 'Three'], 0, r`$b^2 - 4ac = 4 - 60 = -56 < 0$, so there are no real roots.`, 'extended'),
  A.mcq('quadratics', 2, r`The discriminant of $x^2 - 6x + 9$ is zero. What does this mean?`, ['No real roots', 'One repeated root', 'Two different roots', 'Three roots'], 1, r`$\Delta = 36 - 36 = 0$: one repeated root, $x = 3$.`),
  A.num('quadratics', 2, 2, r`Find the positive solution of $2x^2 + 3x - 5 = 0$.`, 1, 0.001, undefined, r`$x = \dfrac{-3 \pm 7}{4}$, so $x = 1$ or $x = -2.5$.`),
  A.num('quadratics', 2, 2, r`Solve $x^2 - 7x + 12 = 0$. Give the larger solution.`, 4, 0.001, undefined, '(x − 3)(x − 4) = 0, so x = 3 or 4.'),
  A.wr('quadratics', 2, r`Solve $x^2 - 3x - 4 = 0$ by factorising. [3]`, [
    'Factorises as (x − 4)(x + 1) (1)',
    'Sets each bracket to zero (1)',
    'x = 4 and x = −1 (1)',
  ]),
  A.wr('quadratics', 3, r`Solve $x^2 + 4x - 3 = 0$ using the quadratic formula. Give answers to 3 significant figures. [3]`, [
    'Substitutes a = 1, b = 4, c = −3 into the formula (1)',
    'x = (−4 ± √28)/2 (1)',
    'x = 0.646 or x = −4.65 (1)',
  ]),

  // ---- sequences
  A.mcq('sequences', 1, r`Find the nth term of the sequence $3, 7, 11, 15, \dots$`, [r`$3n$`, r`$4n - 1$`, r`$n + 4$`, r`$4n + 1$`], 1, 'The common difference is 4, so start with 4n; the first term would be 4 but it is 3, so subtract 1.'),
  A.mcq('sequences', 1, r`What is the next term of $2, 6, 18, 54, \dots$?`, ['108', '162', '72', '216'], 1, 'Each term is multiplied by 3: 54 × 3 = 162.'),
  A.mcq('sequences', 2, r`Is 50 a term in the sequence with nth term $4n - 1$?`, ['Yes, n = 12.75', 'No, n is not a whole number', 'Yes, n = 13', 'Yes, n = 12'], 1, r`$4n - 1 = 50$ gives $n = 12.75$, not a whole number.`),
  A.num('sequences', 2, 2, r`The sequence $5, 9, 13, 17, \dots$ has nth term $4n + 1$. Find the 20th term.`, 81, 0.001, undefined, r`$4 \times 20 + 1 = 81$.`),
  A.num('sequences', 2, 2, 'Find the 10th triangular number (1, 3, 6, 10, 15, …).', 55, 0.001, undefined, r`$\tfrac12 n(n+1) = \tfrac12 \times 10 \times 11 = 55$.`),
  A.num('sequences', 3, 2, r`The sequence $2, 6, 12, 20, 30, \dots$ has nth term $n^2 + n$. Find the 10th term.`, 110, 0.001, undefined, r`$100 + 10 = 110$.`, 'extended'),
  A.wr('sequences', 2, r`Find an expression for the nth term of $7, 11, 15, 19, \dots$ [2]`, [
    'Common difference is 4, so 4n (1)',
    '4n + 3 (1)',
  ]),
  A.wr('sequences', 3, r`Find the nth term of the quadratic sequence $2, 6, 12, 20, \dots$ [3]`, [
    'First differences 4, 6, 8, so second difference is 2 (1)',
    'Coefficient of n² is 1 (half of 2) (1)',
    'nth term = n² + n (1)',
  ], undefined, 'extended'),

  // ---- graphs & functions
  A.mcq('graphs-functions', 1, r`Where does $y = x^2 - 4x - 5$ cross the $x$-axis?`, ['x = −1 and x = 5', 'x = 1 and x = −5', 'x = 5 only', 'x = 0 and x = 4'], 0, '(x − 5)(x + 1) = 0, so x = 5 and x = −1.'),
  A.mcq('graphs-functions', 1, r`What is the shape of the graph of $y = \dfrac{k}{x}$?`, ['A straight line', 'A parabola', 'Two separate branches (reciprocal)', 'An S-shaped cubic'], 2, 'A reciprocal graph has two branches and asymptotes along the axes.'),
  A.mcq('graphs-functions', 1, r`$f(x) = 3x - 2$. What is $f(4)$?`, ['10', '14', '12', '6'], 0, '3(4) − 2 = 10.'),
  A.num('graphs-functions', 2, 2, r`Find the $y$-coordinate of the turning point of $y = x^2 - 4x - 5$.`, -9, 0.001, undefined, r`Turning point at $x = 2$: $y = 4 - 8 - 5 = -9$.`),
  A.num('graphs-functions', 3, 2, r`$f(x) = x + 1$ and $g(x) = x^2$. Find $fg(3)$.`, 10, 0.001, undefined, r`$g(3) = 9$, then $f(9) = 10$.`, 'extended'),
  A.num('graphs-functions', 3, 2, r`$f(x) = 3x - 2$. Find $f^{-1}(8)$ to 3 significant figures.`, 3.33, 0.003, undefined, r`$f^{-1}(x) = (x+2)/3$, so $f^{-1}(8) = 10/3 = 3.33$.`, 'extended'),
  A.wr('graphs-functions', 2, r`Sketch $y = x^2 - 4x - 5$, stating the main features. [4]`, [
    'Crosses the x-axis at (−1, 0) and (5, 0) (1)',
    'Crosses the y-axis at (0, −5) (1)',
    'U-shaped parabola (1)',
    'Minimum point at (2, −9) (1)',
  ]),
  A.wr('graphs-functions', 3, r`Find the inverse function $f^{-1}(x)$ when $f(x) = 3x - 2$. [3]`, [
    'Writes y = 3x − 2 and swaps x and y: x = 3y − 2 (1)',
    'Rearranges: 3y = x + 2 (1)',
    'f⁻¹(x) = (x + 2)/3 (1)',
  ], undefined, 'extended'),

  // ---- differentiation (extended)
  A.mcq('differentiation', 2, r`Differentiate $y = x^3$.`, [r`$x^2$`, r`$3x^2$`, r`$3x^3$`, r`$\tfrac{x^4}{4}$`], 1, r`Multiply by the power and reduce it by one: $3x^2$.`, 'extended'),
  A.mcq('differentiation', 2, r`Differentiate $y = 5x^2$.`, [r`$10x$`, r`$5x$`, r`$10x^2$`, r`$25x$`], 0, r`$5 \times 2 x^{1} = 10x$.`, 'extended'),
  A.mcq('differentiation', 2, 'At a stationary point of a curve:', [r`$y = 0$`, r`$\dfrac{dy}{dx} = 0$`, r`$x = 0$`, 'the curve is straight'], 1, 'The gradient is zero at maxima, minima and points of inflection.', 'extended'),
  A.num('differentiation', 2, 2, r`Find the gradient of $y = x^2 + 3x$ at $x = 2$.`, 7, 0.001, undefined, r`$\dfrac{dy}{dx} = 2x + 3 = 7$.`, 'extended'),
  A.num('differentiation', 2, 2, r`Find the $x$-coordinate of the stationary point of $y = x^2 - 6x + 5$.`, 3, 0.001, undefined, r`$2x - 6 = 0$, so $x = 3$.`, 'extended'),
  A.num('differentiation', 3, 2, r`Find the minimum value of $y = x^2 - 6x + 5$.`, -4, 0.001, undefined, r`At $x = 3$: $9 - 18 + 5 = -4$.`, 'extended'),
  A.wr('differentiation', 2, r`Differentiate $y = 2x^3 - 5x^2 + 3x - 4$. [3]`, [
    '6x² (1)',
    '−10x (1)',
    '+3 (1)',
  ], undefined, 'extended'),
  A.wr('differentiation', 3, r`Find the equation of the tangent to $y = x^2 + 3x$ at the point where $x = 2$. [4]`, [
    'dy/dx = 2x + 3 (1)',
    'Gradient at x = 2 is 7 (1)',
    'y = 10 when x = 2 (1)',
    'y − 10 = 7(x − 2), i.e. y = 7x − 4 (1)',
  ], undefined, 'extended'),

  // ================================================================== COORDINATE GEOMETRY
  C.mcq('straight-lines', 1, 'What is the gradient of the line through (1, 2) and (5, 10)?', ['2', '4', '0.5', '8'], 0, '(10 − 2) ÷ (5 − 1) = 8 ÷ 4 = 2.'),
  C.mcq('straight-lines', 1, r`The line $y = 3x - 4$ crosses the $y$-axis at:`, ['(0, 3)', '(0, −4)', '(−4, 0)', '(3, 0)'], 1, r`In $y = mx + c$, $c$ is the $y$-intercept.`),
  C.mcq('straight-lines', 2, r`A line has gradient $\tfrac23$. What is the gradient of a perpendicular line?`, [r`$\tfrac32$`, r`$-\tfrac32$`, r`$-\tfrac23$`, r`$\tfrac23$`], 1, 'Perpendicular gradients multiply to −1: flip and change the sign.'),
  C.num('straight-lines', 1, 2, 'Find the x-coordinate of the midpoint of (1, 2) and (7, 10).', 4, 0.001, undefined, '(1 + 7) ÷ 2 = 4.'),
  C.num('straight-lines', 2, 2, 'Find the length of the line from (1, 2) to (7, 10).', 10, 0.001, undefined, r`$\sqrt{6^2 + 8^2} = 10$.`),
  C.num('straight-lines', 2, 2, 'Find the gradient of the line through (−2, 7) and (4, 1).', -1, 0.001, undefined, '(1 − 7) ÷ (4 − (−2)) = −6 ÷ 6 = −1.'),
  C.wr('straight-lines', 2, 'Find the equation of the line through (2, 5) with gradient 3. [3]', [
    'Uses y − y₁ = m(x − x₁): y − 5 = 3(x − 2) (1)',
    'Expands: y − 5 = 3x − 6 (1)',
    'y = 3x − 1 (1)',
  ]),
  C.wr('straight-lines', 3, r`Find the equation of the line through $(0, 1)$ that is perpendicular to $y = 2x + 5$. [3]`, [
    'Perpendicular gradient is −1/2 (1)',
    'y-intercept is 1 (1)',
    'y = −½x + 1 (1)',
  ], undefined, 'extended'),

  // ================================================================== GEOMETRY
  // ---- angles & polygons
  G.mcq('angles-polygons', 1, 'What is the sum of the interior angles of a hexagon?', ['540°', '720°', '900°', '360°'], 1, '(6 − 2) × 180° = 720°.'),
  G.mcq('angles-polygons', 1, 'Alternate angles on parallel lines are:', ['equal', 'supplementary (add to 180°)', 'complementary', 'always 90°'], 0, 'Alternate (Z) angles between parallel lines are equal.'),
  G.mcq('angles-polygons', 2, 'Each exterior angle of a regular polygon is 24°. How many sides does it have?', ['10', '12', '15', '18'], 2, '360 ÷ 24 = 15.'),
  G.num('angles-polygons', 1, 2, 'Find the size of each interior angle of a regular octagon, in degrees.', 135, 0.001, '°', 'Exterior = 360 ÷ 8 = 45°, interior = 180° − 45° = 135°.'),
  G.num('angles-polygons', 1, 1, 'Find the sum of the interior angles of a pentagon, in degrees.', 540, 0.001, '°', '(5 − 2) × 180 = 540.'),
  G.num('angles-polygons', 2, 2, 'A regular polygon has 12 sides. Find each exterior angle in degrees.', 30, 0.001, '°', '360 ÷ 12 = 30°.'),
  G.wr('angles-polygons', 1, 'In triangle ABC, AB = AC and angle A = 40°. Find angle B, giving reasons. [3]', [
    'Angles in a triangle add to 180°, so B + C = 140° (1)',
    'The base angles of an isosceles triangle are equal (1)',
    'B = 70° (1)',
  ]),
  G.wr('angles-polygons', 2, 'Each interior angle of a regular polygon is 150°. Find the number of sides. [3]', [
    'Exterior angle = 180° − 150° = 30° (1)',
    'Number of sides = 360 ÷ 30 (1)',
    '12 (1)',
  ]),

  // ---- circle theorems
  G.mcq('circle-theorems', 1, 'The angle in a semicircle is:', ['45°', '60°', '90°', '180°'], 2, 'A triangle drawn on a diameter with its third vertex on the circle has a right angle there.'),
  G.mcq('circle-theorems', 2, 'The angle at the centre of a circle is 100°. What is the angle at the circumference standing on the same arc?', ['200°', '100°', '50°', '25°'], 2, 'The angle at the centre is twice the angle at the circumference.'),
  G.mcq('circle-theorems', 1, 'Opposite angles of a cyclic quadrilateral add up to:', ['90°', '180°', '270°', '360°'], 1, 'Opposite angles of a cyclic quadrilateral are supplementary.'),
  G.num('circle-theorems', 2, 2, 'A cyclic quadrilateral has one angle of 95°. Find the opposite angle in degrees.', 85, 0.001, '°', '180° − 95° = 85°.'),
  G.num('circle-theorems', 2, 2, 'The angle at the centre standing on an arc is 140°. Find the angle at the circumference standing on the same arc, in degrees.', 70, 0.001, '°', '140° ÷ 2 = 70°.'),
  G.num('circle-theorems', 1, 1, 'A tangent meets a radius at the point of contact. What is the angle between them, in degrees?', 90, 0.001, '°', 'A tangent is perpendicular to the radius.'),
  G.wr('circle-theorems', 2, 'A, B and C are points on a circle. AB is a diameter and angle BAC = 35°. Find angle ABC, giving reasons. [3]', [
    'Angle ACB = 90° (angle in a semicircle) (1)',
    'Angles in a triangle add to 180° (1)',
    'Angle ABC = 180 − 90 − 35 = 55° (1)',
  ]),
  G.wr('circle-theorems', 3, 'PT is a tangent to a circle, centre O, at T. Angle OPT = 30°. Find angle POT, giving reasons. [3]', [
    'Angle OTP = 90° (tangent is perpendicular to the radius) (1)',
    'Angles in a triangle add to 180° (1)',
    'Angle POT = 180 − 90 − 30 = 60° (1)',
  ]),

  // ---- similarity & congruence
  G.mcq('similarity-congruence', 1, 'Two triangles have all three angles equal. This proves they are:', ['congruent', 'similar', 'identical', 'equilateral'], 1, 'AAA shows similarity only; the sizes may differ.'),
  G.mcq('similarity-congruence', 2, 'The length scale factor of an enlargement is 3. What is the area scale factor?', ['3', '6', '9', '27'], 2, r`Area scale factor is $k^2 = 9$.`),
  G.mcq('similarity-congruence', 2, 'Two similar shapes have areas in the ratio 4 : 9. What is the ratio of their lengths?', ['2 : 3', '4 : 9', '16 : 81', '8 : 27'], 0, 'Take the square root of each: 2 : 3.'),
  G.num('similarity-congruence', 2, 3, 'Two similar cylinders have heights 6 cm and 9 cm. The smaller has surface area 80 cm². Find the surface area of the larger, in cm².', 180, 0.001, 'cm²', r`Scale factor $1.5$, so area $= 80 \times 1.5^2 = 180$.`),
  G.num('similarity-congruence', 2, 2, 'A model ship is 1/50 of the real size. The real sail area is what multiple of the model sail area of 0.4 m²? Give the real area in m².', 1000, 0.001, 'm²', r`$0.4 \times 50^2 = 1000$.`),
  G.num('similarity-congruence', 3, 3, 'Two similar solids have lengths in the ratio 2 : 5. The smaller has volume 24 cm³. Find the volume of the larger, in cm³.', 375, 0.001, 'cm³', r`Volume factor $(5/2)^3 = 15.625$, so $24 \times 15.625 = 375$.`),
  G.wr('similarity-congruence', 2, 'Explain why two triangles with equal angles are not necessarily congruent. [2]', [
    'Equal angles means the triangles have the same shape (similar) (1)',
    'They can be different sizes, so not congruent (1)',
  ]),
  G.wr('similarity-congruence', 2, 'Triangles ABC and PQR are similar. AB = 6 cm, PQ = 9 cm and BC = 8 cm. Find QR. [3]', [
    'Scale factor = 9 ÷ 6 = 1.5 (1)',
    'QR = 8 × 1.5 (1)',
    '12 cm (1)',
  ]),

  // ================================================================== MENSURATION
  M.mcq('area-volume', 1, 'What is the area of a trapezium with parallel sides a and b and height h?', [r`$ab h$`, r`$\tfrac12 (a + b) h$`, r`$(a + b) h$`, r`$\tfrac12 a b$`], 1, r`Area $= \tfrac12 (a+b)h$.`),
  M.mcq('area-volume', 1, 'What is the volume of a cone with radius r and height h?', [r`$\pi r^2 h$`, r`$\tfrac13 \pi r^2 h$`, r`$\tfrac43 \pi r^3$`, r`$\pi r l$`], 1, r`Volume of a cone $= \tfrac13 \pi r^2 h$.`),
  M.mcq('area-volume', 1, 'What is the surface area of a sphere of radius r?', [r`$\tfrac43 \pi r^3$`, r`$2\pi r$`, r`$4\pi r^2$`, r`$\pi r^2$`], 2, r`Surface area of a sphere $= 4\pi r^2$.`),
  M.num('area-volume', 2, 2, 'Find the volume of a cylinder with radius 5 cm and height 12 cm, in cm³ to 3 significant figures.', 942, 0.002, 'cm³', r`$\pi \times 25 \times 12 = 942.5$.`),
  M.num('area-volume', 2, 2, 'Find the length of an arc of a circle of radius 6 cm with a sector angle of 60°, in cm to 3 significant figures.', 6.28, 0.003, 'cm', r`$\dfrac{60}{360} \times 2\pi \times 6 = 2\pi = 6.28$.`),
  M.num('area-volume', 2, 2, 'Find the area of a sector of radius 6 cm and angle 60°, in cm² to 3 significant figures.', 18.8, 0.003, 'cm²', r`$\dfrac{60}{360} \times \pi \times 36 = 6\pi = 18.8$.`),
  M.num('area-volume', 3, 3, 'A cone has base radius 6 cm and slant height 10 cm. Find its curved surface area in cm² to 3 significant figures.', 188, 0.003, 'cm²', r`$\pi r l = \pi \times 6 \times 10 = 188.5$.`),
  M.wr('area-volume', 3, r`A sphere has volume $288\pi\ \text{cm}^3$. Find its radius. [3]`, [
    '4/3 πr³ = 288π (1)',
    'r³ = 216 (1)',
    'r = 6 cm (1)',
  ]),
  M.wr('area-volume', 3, 'A cone has base radius 6 cm and vertical height 8 cm. Find the slant height and the curved surface area. [4]', [
    'Slant height² = 6² + 8² (1)',
    'Slant height = 10 cm (1)',
    'Curved area = π × 6 × 10 (1)',
    '= 188 cm² (to 3 s.f.) (1)',
  ]),

  // ================================================================== TRIGONOMETRY
  // ---- right-angled trig
  T.mcq('right-angled-trig', 1, r`In a right-angled triangle, which ratio is $\tan\theta$?`, ['opp / hyp', 'adj / hyp', 'opp / adj', 'adj / opp'], 2, 'SOH CAH TOA: tan = opposite ÷ adjacent.'),
  T.mcq('right-angled-trig', 1, 'An angle of elevation is measured from:', ['the vertical', 'the horizontal', 'the hypotenuse', 'the ground to the sky only'], 1, 'Elevation and depression are measured from the horizontal.'),
  T.num('right-angled-trig', 2, 2, 'A right-angled triangle has hypotenuse 12 cm and an angle of 35°. Find the side opposite the angle, in cm to 3 s.f.', 6.88, 0.002, 'cm', r`$12 \sin 35^\circ = 6.883\ldots$`),
  T.num('right-angled-trig', 2, 2, 'The opposite side is 5 cm and the adjacent side is 8 cm. Find the angle θ in degrees to 1 d.p.', 32, 0.002, '°', r`$\theta = \tan^{-1}(5/8) = 32.0^\circ$.`),
  T.num('right-angled-trig', 1, 2, 'The two shorter sides of a right-angled triangle are 7 cm and 24 cm. Find the hypotenuse in cm.', 25, 0.001, 'cm', r`$\sqrt{49 + 576} = \sqrt{625} = 25$.`),
  T.num('right-angled-trig', 2, 2, 'From a point 20 m from the base of a tree, the angle of elevation of the top is such that the tree is 15 m high. Find the angle in degrees to 1 d.p.', 36.9, 0.003, '°', r`$\tan\theta = 15/20$, so $\theta = 36.9^\circ$.`),
  T.wr('right-angled-trig', 3, 'A ladder 6 m long leans against a vertical wall. The foot of the ladder is 2 m from the wall.\n\n(a) Find how high the ladder reaches up the wall. [2]\n\n(b) Find the angle the ladder makes with the ground. [1]', [
    'Pythagoras: h² = 6² − 2² = 32 (1)',
    'h = 5.66 m (1)',
    'cos θ = 2/6, so θ = 70.5° (1)',
  ]),

  // ---- sine & cosine rules
  T.mcq('sine-cosine-rules', 1, 'Which rule do you use to find the third side when you know two sides and the angle between them?', ['Sine rule', 'Cosine rule', 'Pythagoras only', 'Tangent ratio'], 1, 'Two sides and the included angle: cosine rule.'),
  T.mcq('sine-cosine-rules', 1, 'Which formula gives the area of a triangle with sides a, b and included angle C?', [r`$\tfrac12 ab \sin C$`, r`$\tfrac12 ab \cos C$`, r`$ab \sin C$`, r`$\tfrac12 a b$`], 0, r`Area $= \tfrac12 ab \sin C$.`),
  T.mcq('sine-cosine-rules', 1, 'A bearing is measured:', ['anticlockwise from north', 'clockwise from north', 'clockwise from east', 'anticlockwise from east'], 1, 'Bearings are measured clockwise from north, with three digits.'),
  T.num('sine-cosine-rules', 2, 2, 'In triangle ABC, A = 40°, B = 65° and a = 8 cm. Use the sine rule to find b, in cm to 3 s.f.', 11.3, 0.005, 'cm', r`$b = \dfrac{8 \sin 65^\circ}{\sin 40^\circ} = 11.28$.`),
  T.num('sine-cosine-rules', 3, 3, 'In triangle ABC, b = 7 cm, c = 9 cm and angle A = 50°. Use the cosine rule to find a, in cm to 3 s.f.', 7, 0.005, 'cm', r`$a^2 = 49 + 81 - 126\cos 50^\circ = 49.0$, so $a = 7.00$.`),
  T.num('sine-cosine-rules', 2, 2, 'A triangle has sides 6 cm and 8 cm with an angle of 70° between them. Find its area in cm² to 4 s.f.', 22.55, 0.002, 'cm²', r`$\tfrac12 \times 6 \times 8 \times \sin 70^\circ = 22.55$.`),
  T.wr('sine-cosine-rules', 3, 'A triangle has sides 5 cm, 6 cm and 7 cm. Find the size of the largest angle. [4]', [
    'The largest angle is opposite the longest side (7 cm) (1)',
    'cos C = (5² + 6² − 7²) ÷ (2 × 5 × 6) (1)',
    'cos C = 0.2 (1)',
    'C = 78.5° (to 1 d.p.) (1)',
  ]),
  T.wr('sine-cosine-rules', 3, 'A ship sails 10 km on a bearing of 050°, then 8 km on a bearing of 140°. Find its distance from the start. [4]', [
    'The angle between the two legs is 140° − 50° = 90° (1)',
    'So Pythagoras can be used (1)',
    'Distance² = 10² + 8² = 164 (1)',
    'Distance = 12.8 km (1)',
  ]),

  // ================================================================== TRANSFORMATIONS & VECTORS
  // ---- transformations
  X.mcq('transformations', 1, 'Which transformation is described using a column vector?', ['Reflection', 'Rotation', 'Translation', 'Enlargement'], 2, 'A translation is given by a column vector.'),
  X.mcq('transformations', 1, 'To describe an enlargement fully you must give:', ['the mirror line', 'the scale factor and the centre', 'the angle and the direction', 'the column vector'], 1, 'An enlargement needs a scale factor and a centre.'),
  X.mcq('transformations', 2, 'Reflect the point (2, 5) in the line y = x. What is the image?', ['(5, 2)', '(−2, 5)', '(2, −5)', '(−5, −2)'], 0, 'Reflection in y = x swaps the coordinates.'),
  X.num('transformations', 1, 1, 'The point (3, 1) is enlarged by scale factor 2 about the origin. Find the x-coordinate of the image.', 6, 0.001, undefined, '3 × 2 = 6.'),
  X.num('transformations', 1, 2, 'The point (4, −1) is translated by the vector (−3, 5). Find the y-coordinate of the image.', 4, 0.001, undefined, '−1 + 5 = 4.'),
  X.num('transformations', 2, 2, 'A shape of area 5 cm² is enlarged with scale factor 3. Find the area of the image, in cm².', 45, 0.001, 'cm²', r`Area scale factor $= 3^2 = 9$, so $5 \times 9 = 45$.`),
  X.wr('transformations', 2, 'Triangle A has vertices (1, 1), (3, 1) and (1, 2). Triangle B has vertices (2, 2), (6, 2) and (2, 4). Describe fully the single transformation that maps A onto B. [3]', [
    'Enlargement (1)',
    'Scale factor 2 (1)',
    'Centre (0, 0) (1)',
  ]),
  X.wr('transformations', 2, 'The point (2, 1) is mapped to (−1, 2). Describe fully the rotation about the origin that does this. [3]', [
    'Rotation (1)',
    '90° anticlockwise (1)',
    'About the origin (0, 0) (1)',
  ]),

  // ---- vectors
  X.mcq('vectors', 1, r`If $A = (1, 5)$ and $B = (6, 2)$, what is $\overrightarrow{AB}$?`, [r`$\begin{pmatrix}5\\-3\end{pmatrix}$`, r`$\begin{pmatrix}-5\\3\end{pmatrix}$`, r`$\begin{pmatrix}7\\7\end{pmatrix}$`, r`$\begin{pmatrix}3\\5\end{pmatrix}$`], 0, 'End minus start: (6 − 1, 2 − 5) = (5, −3).'),
  X.mcq('vectors', 1, r`What is the magnitude of $\begin{pmatrix}5\\12\end{pmatrix}$?`, ['7', '13', '17', '60'], 1, r`$\sqrt{25 + 144} = 13$.`),
  X.mcq('vectors', 2, r`$\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. What is $\overrightarrow{AB}$?`, [r`$\mathbf{a} - \mathbf{b}$`, r`$\mathbf{b} - \mathbf{a}$`, r`$\mathbf{a} + \mathbf{b}$`, r`$-\mathbf{a} - \mathbf{b}$`], 1, 'Go from A back to O, then on to B: −a + b = b − a.'),
  X.num('vectors', 1, 2, r`Find the magnitude of $\begin{pmatrix}8\\6\end{pmatrix}$.`, 10, 0.001, undefined, r`$\sqrt{64 + 36} = 10$.`),
  X.num('vectors', 2, 2, r`$\mathbf{p} = \begin{pmatrix}2\\3\end{pmatrix}$ and $\mathbf{q} = \begin{pmatrix}4\\-1\end{pmatrix}$. Find the $y$-component of $2\mathbf{p} - \mathbf{q}$.`, 7, 0.001, undefined, r`$2(3) - (-1) = 7$.`),
  X.num('vectors', 3, 3, r`$A = (2, 4)$ and $B = (8, 10)$, and $M$ is the midpoint of $AB$. Find $|\overrightarrow{OM}|$ to 3 s.f.`, 8.6, 0.003, undefined, r`$M = (5, 7)$, so $|\overrightarrow{OM}| = \sqrt{25 + 49} = \sqrt{74} = 8.60$.`),
  X.wr('vectors', 3, r`$\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. $M$ is the midpoint of $AB$. Find $\overrightarrow{OM}$ in terms of $\mathbf{a}$ and $\mathbf{b}$. [3]`, [
    'AB = b − a (1)',
    'OM = a + ½(b − a) (1)',
    '= ½(a + b) (1)',
  ], undefined, 'extended'),

  // ================================================================== PROBABILITY
  P.mcq('probability', 1, r`If $P(A) = 0.3$, what is $P(\text{not } A)$?`, ['0.3', '0.7', '1.3', '0.03'], 1, '1 − 0.3 = 0.7.'),
  P.mcq('probability', 1, 'A fair die is rolled once. What is the probability of a six?', [r`$\tfrac16$`, r`$\tfrac15$`, r`$\tfrac12$`, r`$\tfrac{1}{36}$`], 0, 'One favourable outcome out of six equally likely outcomes.'),
  P.mcq('probability', 2, 'For independent events A and B, P(A and B) equals:', ['P(A) + P(B)', 'P(A) × P(B)', 'P(A) − P(B)', 'P(A) ÷ P(B)'], 1, 'For "and" with independent events, multiply.'),
  P.num('probability', 1, 2, 'A fair die is rolled 120 times. How many sixes would you expect?', 20, 0.001, undefined, r`$\tfrac16 \times 120 = 20$.`),
  P.num('probability', 2, 3, 'A bag has 3 red and 2 blue counters. Two counters are taken without replacement. Find the probability that both are red, as a decimal.', 0.3, 0.003, undefined, r`$\tfrac35 \times \tfrac24 = \tfrac{6}{20} = 0.3$.`),
  P.num('probability', 2, 3, 'A bag has 4 red and 6 green balls. Two are drawn with replacement. Find the probability of one of each colour, as a decimal.', 0.48, 0.003, undefined, r`$2 \times (0.4 \times 0.6) = 0.48$.`),
  P.wr('probability', 2, 'A coin is tossed 200 times and lands on heads 112 times. Find the relative frequency of heads and say whether the coin could be fair. [3]', [
    'Relative frequency = 112 ÷ 200 = 0.56 (1)',
    'For a fair coin the expected probability is 0.5 (1)',
    'The result is close to 0.5, so it could be fair, but more trials would give a more reliable estimate (1)',
  ]),
  P.wr('probability', 3, 'Of 40 students, 25 study French and 10 of those also study Spanish. Find the probability that a student chosen at random from the French students also studies Spanish. [4]', [
    'Only the 25 French students are considered (1)',
    'Of these, 10 study Spanish (1)',
    'P = 10/25 (1)',
    '= 2/5 (1)',
  ], undefined, 'extended'),

  // ================================================================== STATISTICS
  // ---- averages and charts
  S.mcq('averages-charts', 1, 'Find the median of 3, 5, 5, 8, 9, 12.', ['5', '6.5', '7', '8'], 1, 'Six values: the median is the mean of the 3rd and 4th, (5 + 8) ÷ 2 = 6.5.'),
  S.mcq('averages-charts', 1, 'Which average is least affected by extreme values (outliers)?', ['Mean', 'Median', 'Range', 'Total'], 1, 'The median depends only on the middle value.'),
  S.mcq('averages-charts', 2, 'In a pie chart of 120 items, 20 are in one category. What angle represents it?', ['20°', '45°', '60°', '90°'], 2, '20/120 × 360° = 60°.'),
  S.num('averages-charts', 1, 2, 'Find the mean of 3, 5, 5, 8, 9, 12.', 7, 0.001, undefined, '42 ÷ 6 = 7.'),
  S.num('averages-charts', 2, 3, 'Values 1, 2 and 3 have frequencies 4, 6 and 10. Find the mean.', 2.3, 0.003, undefined, r`$\sum fx = 4 + 12 + 30 = 46$ and $\sum f = 20$, so $46/20 = 2.3$.`),
  S.num('averages-charts', 3, 3, 'The mean of five numbers is 8. A sixth number is added and the mean becomes 9. Find the sixth number.', 14, 0.001, undefined, 'First total = 40; new total = 54; sixth = 14.'),
  S.wr('averages-charts', 2, 'Explain why the median is often a better average than the mean for incomes. [2]', [
    'A few very high incomes (outliers) can distort the mean (1)',
    'The median is not affected by extreme values so represents a typical income better (1)',
  ]),
  S.wr('averages-charts', 3, 'Classes 0 < x ≤ 10, 10 < x ≤ 20 and 20 < x ≤ 30 have frequencies 4, 6 and 10. Estimate the mean. [4]', [
    'Uses midpoints 5, 15 and 25 (1)',
    'fx = 20, 90 and 250 (1)',
    'Σfx = 360 (1)',
    '360 ÷ 20 = 18 (1)',
  ]),

  // ---- cumulative frequency
  S.mcq('cumulative-frequency', 1, 'A cumulative frequency graph is plotted against the:', ['lower class boundary', 'upper class boundary', 'class midpoint', 'class width'], 1, 'The upper boundary is the point by which that many values have been counted.'),
  S.mcq('cumulative-frequency', 1, 'The interquartile range is:', [r`$Q_3 - Q_1$`, r`$Q_2 - Q_1$`, r`$Q_3 + Q_1$`, 'maximum − minimum'], 0, 'IQR = upper quartile − lower quartile.'),
  S.mcq('cumulative-frequency', 2, 'For 80 data values, the lower quartile is read at cumulative frequency:', ['10', '20', '40', '60'], 1, '80 ÷ 4 = 20.'),
  S.num('cumulative-frequency', 1, 2, 'From a cumulative frequency curve Q₁ = 16 and Q₃ = 32. Find the interquartile range.', 16, 0.001, undefined, '32 − 16 = 16.'),
  S.num('cumulative-frequency', 2, 2, 'A cumulative frequency graph has 50 data values. At what cumulative frequency is the upper quartile read?', 37.5, 0.001, undefined, r`$\tfrac34 \times 50 = 37.5$.`),
  S.num('cumulative-frequency', 2, 2, 'The cumulative frequency at 35 kg is 42 out of 50 items. How many items are heavier than 35 kg?', 8, 0.001, undefined, '50 − 42 = 8.'),
  S.wr('cumulative-frequency', 2, 'Group A has median 62 and IQR 10. Group B has median 55 and IQR 18. Compare the two groups. [2]', [
    'A has the higher median, so scores are higher on average (1)',
    'A has the smaller IQR, so its scores are more consistent (1)',
  ]),
  S.wr('cumulative-frequency', 2, 'Explain why cumulative frequency is plotted against the upper class boundary. [2]', [
    'The cumulative frequency counts all values up to the end of the class (1)',
    'So that many values are less than or equal to the upper boundary (1)',
  ]),
]
