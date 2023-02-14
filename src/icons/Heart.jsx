export default function Heart (props) {
  return (
    <svg
      width={25}
      height={25}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M4.426 12.312 12 19.885l7.574-7.574a4.869 4.869 0 0 0-6.886-6.885L12 6.115l-.688-.689a4.869 4.869 0 0 0-6.886 6.886Z'
        stroke='#fff'
        strokeWidth={2}
        strokeLinejoin='round'
      />
    </svg>

  )
}
