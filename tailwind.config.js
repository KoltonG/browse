module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      darkPink: '#66273D',
      pink: '#EF4B85',
      orange: '#FEBE19',
      white: '#FEFDFD',
      grey: '#484848'
    },
    screens: {
      desktop: '1280px'
    },
    spacing: generateSpacing()
  },
  variants: {
    extend: {}
  },
  plugins: []
}

/**
 * Utility to generate incremental spacing.
 *
 * Example: Using increment of 8 will output:
 * {
 *  0.5: 4px
 *  1:   8px,
 *  2:  16px,
 *  3:  24px,
 *  ...
 * }
 * */
function generateSpacing(increment = 8) {
  return {
    ...[0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15].reduce(
      (acc, i) => ({
        ...acc,
        // Handles removal of floats. Ref: https://stackoverflow.com/a/8388483
        [i]: `${(increment * i) | 0}px`
      }),
      {}
    )
  }
}
