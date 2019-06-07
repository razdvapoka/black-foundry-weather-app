const Bottom = ({ id, rectWidth = 1880, rectHeight = 50, ...rest }) => (
  <svg viewBox={`0 0 ${rectWidth} ${rectHeight}`} {...rest}>
    <defs>
      <pattern
        id={`${id}-pattern1`}
        x='0' y='0' width='40' height='60'
        patternUnits='userSpaceOnUse'
      >
        <circle cx='10' cy='5' r='5' stroke='none' fill='currentColor' />
        <circle cx='30' cy='15' r='5' stroke='none' fill='currentColor' />
        <circle cx='10' cy='25' r='5' stroke='none' fill='currentColor' />
        <circle cx='30' cy='35' r='5' stroke='none' fill='currentColor' />
        <circle cx='10' cy='45' r='5' stroke='none' fill='currentColor' />
        <circle cx='30' cy='55' r='5' stroke='none' fill='currentColor' />
      </pattern>
    </defs>
    <rect x='0' y='0' width={rectWidth} height={rectHeight}
      fill={`url(#${id}-pattern1)`} />
  </svg>
)

export default Bottom
