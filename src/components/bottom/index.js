const Bottom = (props) => (
  <svg viewBox='0 0 1880 50' {...props}>
    <defs>
      <pattern
        id='pattern1'
        x='0' y='0' width='40' height='50'
        patternUnits='userSpaceOnUse'
      >
        <circle cx='10' cy='5' r='5' stroke='none' fill='currentColor' />
        <circle cx='30' cy='15' r='5' stroke='none' fill='currentColor' />
        <circle cx='10' cy='25' r='5' stroke='none' fill='currentColor' />
        <circle cx='30' cy='35' r='5' stroke='none' fill='currentColor' />
        <circle cx='10' cy='45' r='5' stroke='none' fill='currentColor' />
      </pattern>
    </defs>
    <rect x='0' y='0' width='1880' height='50'
      fill='url(#pattern1)' />
  </svg>
)

export default Bottom
