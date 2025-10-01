export const Highlight = () => (
  <div className='relative w-16 h-16'>
    <svg
      viewBox='0 0 100 100'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-label='Upload illustration'
    >
      {/* <title>Upload File Illustration</title> */}
      <rect
        x='5'
        y='15'
        width='90'
        height='70'
        rx='12'
        ry='12'
        className='stroke-gray-200 dark:stroke-gray-700'
        strokeWidth='2'
        strokeDasharray='4 4'
        fill='none'
      >
        <animateTransform
          attributeName='transform'
          type='strokeDasharray'
          from='4 4'
          to='8 8'
          dur='1s'
          strokeDasharray='4 8'
          repeatCount='indefinite'
        />
      </rect>

      {/* <path
            d="M30 35H70C75 35 75 40 75 40V65C75 70 70 70 70 70H30C25 70 25 65 25 65V40C25 35 30 35 30 35Z"
            className="fill-blue-100 dark:fill-blue-900/30 stroke-blue-500 dark:stroke-blue-400"
            strokeWidth="2"
          > */}
      {/* <animate
              attributeName="d"
              dur="2s"
              repeatCount="indefinite"
              values="
                            M30 35H70C75 35 75 40 75 40V65C75 70 70 70 70 70H30C25 70 25 65 25 65V40C25 35 30 35 30 35Z;
                            M30 38H70C75 38 75 43 75 43V68C75 73 70 73 70 73H30C25 73 25 68 25 68V43C25 38 30 38 30 38Z;
                            M30 35H70C75 35 75 40 75 40V65C75 70 70 70 70 70H30C25 70 25 65 25 65V40C25 35 30 35 30 35Z"
            /> */}
      {/* </path> */}
    </svg>
  </div>
)
